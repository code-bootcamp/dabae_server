import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseDate } from '../courseDate/entities/courseDate.entity';
import { CourseTime } from './entities/courseTime.entity';

@Injectable()
export class CourseTimeService {
  constructor(
    @InjectRepository(CourseTime)
    private readonly courseTimeRepository: Repository<CourseTime>,
    @InjectRepository(CourseDate)
    private readonly courseDateRepository: Repository<CourseDate>,
  ) {}
  async create({ createCourseTimeInput }) {
    const result = await this.courseTimeRepository.save({
      ...createCourseTimeInput,
      course: { id: createCourseTimeInput.courseId },
      courseDate: { id: createCourseTimeInput.courseDateId },
    });
    return result;
  }

  async update({ courseTimeId, updateCourseTimeInput }) {
    const myCourseTime = await this.courseTimeRepository.findOne({
      where: { id: courseTimeId },
    });
    const newCourse = {
      ...myCourseTime,
      id: courseTimeId,
      ...updateCourseTimeInput,
    };
    return await this.courseTimeRepository.save(newCourse);
  }

  async findOne({ courseTimeId }) {
    return await this.courseTimeRepository.findOne({
      where: { id: courseTimeId },
      relations: ['courseDate', 'course'],
    });
  }

  async findAll() {
    return await this.courseTimeRepository.find({
      relations: ['course', 'courseDate'],
    });
  }

  async fetchCourseTimes(courseDateId) {
    return await this.courseTimeRepository.find({
      where: { courseDate: { id: courseDateId } },
    });
  }

  async delete({ courseTimeId }) {
    const result = await this.courseTimeRepository.softDelete({
      id: courseTimeId,
    });
    return result.affected ? true : false;
  }
}
