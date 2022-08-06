import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql.auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql.user.param';
import { Course } from '../course/entities/course.entity';
import { Pick } from './entities/pick.entity';
import { PickService } from './pick.service';

@Resolver()
export class PickResolver {
  constructor(private readonly pickService: PickService) {}

  @Query(() => [Pick])
  async fetchPicks() {
    return await this.pickService.fetchPicks();
  }

  @Mutation(() => Boolean)
  async deletePicksInNullUser() {
    return await this.pickService.deletePicksInNullUser();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Course])
  async fetchPicksByUser(@CurrentUser() currentUser: ICurrentUser) {
    const userID = currentUser.id;
    return await this.pickService.picksByUser(userID);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async togglePick(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('courseId') courseId: string,
  ) {
    return await this.pickService.toggle(courseId, currentUser);
  }
}
