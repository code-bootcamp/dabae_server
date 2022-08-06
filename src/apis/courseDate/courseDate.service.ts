import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseDate } from './entities/courseDate.entity';

@Injectable()
export class CourseDateService {
  constructor(
    @InjectRepository(CourseDate)
    private readonly courseDateRepository: Repository<CourseDate>,
  ) {}
  async create(date, courseId) {
    const result = await this.courseDateRepository.save({
      date: date,
      course: { id: courseId },
    });
    return result;
  }

  async findOne({ courseDateId }) {
    return await this.courseDateRepository.findOne({
      where: { id: courseDateId },
    });
  }

  async deleteCourseDate(courseDateId) {
    const result = await this.courseDateRepository.softDelete({
      id: courseDateId,
    });
    return result.affected ? true : false;
  }
}
