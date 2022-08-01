import { ConflictException, flatten, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationId, Repository } from 'typeorm';
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

  async findAll() {
    return await this.pickRepository.find();
  }

  async picksByUser(userID) {
    const allPicks = await this.pickRepository.find({
      relations: ['user', 'course'],
    });

    const result = [];
    for (let i = 0; i < allPicks.length; i++) {
      if (allPicks[i].user.id === userID) {
        result.push(allPicks[i].course.id);
      }
    }

    return result;
  }

  async toggle(course, user) {
    const pickedCourse = await this.courseRepository.findOne({
      where: { id: course },
    });

    if (pickedCourse === null) {
      throw new ConflictException('존재하지않는 코스입니다.');
    }

    const pickingUser = await this.userRepository.findOne({
      where: { id: user.id },
    });

    const allPicks = await this.pickRepository.find({
      relations: ['user', 'course'],
    });

    for (let i = 0; i < allPicks.length; i++) {
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

    pickedCourse.pick = pickedCourse.pick + 1;
    await this.courseRepository.save(pickedCourse);
    await this.pickRepository.save({ course: pickedCourse, user: pickingUser });
    return true;
  }
}
