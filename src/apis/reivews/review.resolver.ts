import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql.auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql.user.param';
import { CreateReviewInput } from './dto/createReview.input';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Review)
  async createCourseReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.reviewService.create(createReviewInput, currentUser);
  }
  @Query(() => [Review])
  async fetchCourseReviews(
    @Args('courseId') courseId: string,
    @Args('page', { defaultValue: 1 }) page: number,
  ) {
    return await this.reviewService.findAll({ courseId, page }); //page);
  }
  @Mutation(() => Boolean)
  deleteCourseReview(@Args('courseReviewId') courseReviewId: string) {
    return this.reviewService.delete(courseReviewId);
  }
}
