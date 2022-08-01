import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CourseTimeService } from './courseTime.service';
import { CreateCourseTimeInput } from './dto/createCourseTime.input';
import { UpdateCourseTimeInput } from './dto/updateCourseTime.input';
import { CourseTime } from './entities/courseTime.entity';

@Resolver()
export class CourseTimeResolver {
  constructor(private readonly courseTimeService: CourseTimeService) {}

  @Mutation(() => CourseTime)
  async createCourseTime(
    @Args('createCourseTimeInput')
    createCourseTimeInput: CreateCourseTimeInput,
  ) {
    return await this.courseTimeService.create({ createCourseTimeInput });
  }

  @Mutation(() => CourseTime)
  async updateCourseTimeInput(
    @Args('courseTimeId') courseTimeId: string,
    @Args('updateCourseTimeInput')
    updateCourseTimeInput: UpdateCourseTimeInput,
  ) {
    return await this.courseTimeService.update({
      courseTimeId,
      updateCourseTimeInput,
    });
  }

  @Query(() => CourseTime)
  async fetchCourseTime(@Args('courseTimeId') courseTimeId: string) {
    return await this.courseTimeService.findOne({ courseTimeId });
  }

  @Query(() => [CourseTime])
  async fetchCourseTimes(@Args('courseDateId') courseDateId: string) {
    return await this.courseTimeService.fetchCourseTimes(courseDateId);
  }

  @Mutation(() => Boolean)
  async deleteCourseTime(@Args('courseTimeId') courseTimeId: string) {
    return await this.courseTimeService.delete({ courseTimeId });
  }
}
