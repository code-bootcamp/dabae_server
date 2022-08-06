import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../course/entities/course.entity';
import { User } from '../user/entities/user.entity';
import { Pick } from './entities/pick.entity';

@Injectable()
export class PickService {
  constructor(
    @InjectRepository(Pick)
    private readonly pickRepository: Repository<Pick>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async fetchPicks() {
    return await this.pickRepository.find({
      relations: ['user', 'course'],
    });
  }

  async deletePicksInNullUser() {
    const picks = await this.pickRepository.find({
      where: { user: null },
    });
    let result;

    for (let i = 0; i < picks.length; i++) {
      result = await this.pickRepository.softDelete({
        id: picks[i].id,
      });
    }
    return result.affected ? true : false;
  }

  async picksByUser(userID) {
    const allPicks = await this.pickRepository.find({
      relations: ['user', 'course'],
    });

    const result = [];
    for (let i = 0; i < allPicks.length; i++) {
      if (allPicks[i].user.id === userID) {
        result.push(
          await this.courseRepository.findOne({
            where: { id: allPicks[i].course.id },
          }),
        );
      }
    }

    return result;
  }

  async toggle(courseId, currentUser) {
    const pickedCourse = await this.courseRepository.findOne({
      where: { id: courseId },
    });

    if (!pickedCourse) {
      throw new ConflictException('존재하지않는 코스입니다.');
    }

    const pickingUser = await this.userRepository.findOne({
      where: { id: currentUser.id },
    });

    const allPicks = await this.pickRepository.find({
      relations: ['user', 'course'],
    });

    for (let i = 0; i < allPicks.length; i++) {
      if (allPicks[i]) {
        if (
          allPicks[i].user.id === pickingUser.id &&
          allPicks[i].course.id === pickedCourse.id
        ) {
          pickedCourse.pick = pickedCourse.pick - 1;
          await this.courseRepository.save(pickedCourse);
          await this.pickRepository.softDelete({ id: allPicks[i].id });
          return false;
        }
      }
    }

    pickedCourse.pick = pickedCourse.pick + 1;
    await this.courseRepository.save(pickedCourse);
    await this.pickRepository.save({
      course: pickedCourse,
      user: pickingUser,
    });
    return true;
  }
}
