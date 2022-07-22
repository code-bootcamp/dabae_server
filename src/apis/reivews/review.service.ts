import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../course/entities/course.entity';
import { User } from '../user/entities/user.entity';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createReviewInput, currentUser) {
    const courseFound = await this.courseRepository.findOne({
      where: { id: createReviewInput.courseId },
    });
    const userFound = await this.userRepository.findOne({
      where: { id: currentUser.id },
    });

    const result = await this.reviewRepository.save({
      user: userFound,
      course: courseFound,
      ...createReviewInput,
    });
    return result;
  }
  async findAll({ courseId, page }) {
    const reviews = await this.reviewRepository.find({
      relations: ['course'],
    });

    const results = reviews.filter((element) => {
      return element.course.id === courseId;
    });

    const pagination = [];

    for (let i = (page - 1) * 10; i < page * 10; i++) {
      if (results[i]) pagination.push(results[i]);
    }
    return pagination;
  }
  async findCount() {
    return await this.reviewRepository.count();
  }

  async delete(courseReviewId) {
    const result = await this.reviewRepository.softDelete({
      id: courseReviewId,
    });
    return result.affected ? true : false;
  }
}
