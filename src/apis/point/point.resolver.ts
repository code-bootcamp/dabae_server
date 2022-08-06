import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql.auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql.user.param';
import { Point } from './entities/point.entity';
import { PointService } from './point.service';

@Resolver()
export class PointResolver {
  constructor(private readonly pointService: PointService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Point)
  async chargePoint(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('amount') amount: number,
    @Args('impUid') impUid: string,
  ) {
    return await this.pointService.charge(currentUser, amount, impUid);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Point)
  async usePoint(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('amount') amount: number,
  ) {
    return await this.pointService.usePoint(currentUser, amount);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Point])
  async fetchPointHistory(@CurrentUser() currentUser: ICurrentUser) {
    return await this.pointService.fetchPoints(currentUser);
  }
}
