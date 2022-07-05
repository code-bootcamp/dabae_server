import { Query, Resolver } from '@nestjs/graphql';
import { CourseService } from './course.service';

@Resolver()
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}
  @Query(() => String)
  async getHello() {
    return await this.courseService.getHello();
  }
}
