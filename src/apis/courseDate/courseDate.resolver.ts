import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CourseDateService } from './courseDate.service';
import { CourseDate } from './entities/courseDate.entity';

@Resolver()
export class CourseDateResolver {
  constructor(private readonly courseDateService: CourseDateService) {}

  @Mutation(() => CourseDate)
  createCourseDate(
    @Args('date') date: Date,
    @Args('courseId') courseId: string,
  ) {
    return this.courseDateService.create(date, courseId);
  }

  @Query(() => CourseDate)
  async fetchCourseDate(@Args('courseDateId') courseDateId: string) {
    return await this.courseDateService.findOne({ courseDateId });
  }

  @Mutation(() => Boolean)
  async deleteCourseDate(@Args('courseDateId') courseDateId: string) {
    return await this.courseDateService.deleteCourseDate(courseDateId);
  }
}
