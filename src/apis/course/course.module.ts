import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseResolver } from './course.resolver';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { Pick } from '../pick/entities/pick.entity';
import { User } from '../user/entities/user.entity';
import { Image } from '../image/entities/image.entity';
import { Category } from '../category/entities/category.entity';
import { Material } from '../material/entities/material.entity';
import { Payment } from '../payment/entities/payment.entity';
import { CourseTime } from '../courseTime/entities/courseTime.entity';
import { Review } from '../reivews/entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      User,
      Image,
      Pick,
      Category,
      Material,
      Payment,
      CourseTime,
      Review,
    ]),
  ],
  exports: [CourseService],
  providers: [CourseResolver, CourseService],
})
export class CourseModule {}
