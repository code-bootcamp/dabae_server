import {
  ConflictException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql.auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql.user.param';
import { CourseService } from './course.service';
import { CreateCourseInput } from './dto/create.course.input';
import { UpdateCourseInput } from './dto/update.course.input';
import { Course } from './entities/course.entity';

@Resolver()
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Query(() => Course)
  async fetchCourse(@Args('courseId') courseId: string) {
    return await this.courseService.findOne({ courseId });
  }

  @Query(() => [Course])
  async fetchCoursesByHostId(
    @Args('hostID') hostID: string,
    @Args('page', { defaultValue: 1 }) page: number,
  ) {
    return await this.courseService.fetchCoursesByHost(hostID, page);
  }

  @Query(() => [Course], { nullable: true })
  async fetchCoursesSortByOption(
    @Args('search', { defaultValue: '' }) search: string,
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('option', { defaultValue: 'createdAt' }) option: string,
  ) {
    if (option === 'pick') {
      return await this.courseService.searchSortByPick(search, page);
    } else if (option === 'discount') {
      return await this.courseService.searchSortByDiscount(search, page);
    } else if (option === 'createdAt') {
      return await this.courseService.searchSortByCreated(search, page);
    } else {
      throw new ConflictException('옵션을 올바르게 입력해주세요.');
    }
  }

  @Query(() => [Course], { nullable: true })
  async fetchCoursesSortByPick(
    @Args('search', { defaultValue: '' }) search: string,
    @Args('page', { defaultValue: 1 }) page: number,
  ) {
    return await this.courseService.searchSortByPick(search, page);
  }

  @Query(() => [Course], { nullable: true })
  async fetchCoursesSortByDiscount(
    @Args('search', { defaultValue: '' }) search: string,
    @Args('page', { defaultValue: 1 }) page: number,
  ) {
    return await this.courseService.searchSortByDiscount(search, page);
  }

  @Query(() => [Course], { nullable: true })
  async fetchCoursesByCategory(
    @Args('search', { defaultValue: '' }) search: string,
    @Args('page', { defaultValue: 1 }) page: number,
  ) {
    return await this.courseService.fetchCoursesByCategory(search, page);
  }

  @Query(() => [Course])
  async fetchCoursesByAddress(
    @Args('search', { defaultValue: '' }) search: string,
    @Args('page', { defaultValue: 1 }) page: number,
  ) {
    return await this.courseService.searchAddress(search, page);
  }

  @Query(() => [Course])
  async fetchCoursesByHostNickname(
    @Args('search', { defaultValue: '' }) search: string,
    @Args('page', { defaultValue: 1 }) page: number,
  ) {
    return await this.courseService.searchHostNickname(search, page);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Course], { nullable: true })
  async fetchCoursesByUser(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('page', { defaultValue: 1 }) page: number,
  ) {
    const id = currentUser.id;
    return await this.courseService.fetchCoursesByUser(id, page);
  }

  @Query(() => [Course])
  async hotCourses() {
    return await this.courseService.hotCourses();
  }

  @Query(() => [Course])
  async newCourses() {
    return await this.courseService.newCourses();
  }

  @Query(() => [Course])
  async cheapCourses() {
    return await this.courseService.cheapCourses();
  }

  @Query(() => Int)
  async howManyCourses() {
    return await this.courseService.howManyCourses();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Int)
  async howManyCoursesByHost(@CurrentUser() currentUser: ICurrentUser) {
    return await this.courseService.howManyCoursesByHost(currentUser);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [String])
  async myCourseRate(@CurrentUser() currentUser: ICurrentUser) {
    return await this.courseService.myCourseRate(currentUser);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Course)
  async createCourse(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('createCourseInput') createCourseInput: CreateCourseInput,
  ) {
    return await this.courseService.create({ createCourseInput, currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Course)
  async updateCourse(
    @Args('courseId') courseId: string,
    @CurrentUser() currentUser: ICurrentUser,
    @Args('updateCourseInput') updateCourseInput: UpdateCourseInput,
  ) {
    const myCourse = await this.courseService.findOne({ courseId });
    if (myCourse.host.id !== currentUser.id) {
      throw new UnauthorizedException('호스트가 등록한 코스가 아닙니다.');
    }
    return await this.courseService.update(courseId, updateCourseInput);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteCourse(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('courseId') courseId: string,
  ) {
    const myCourse = await this.courseService.findOne({ courseId });
    if (myCourse.host.id !== currentUser.id) {
      throw new UnauthorizedException('호스트가 등록한 코스가 아닙니다.');
    }
    return this.courseService.delete({ courseId });
  }
}
