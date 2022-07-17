import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import * as jwt from 'jsonwebtoken';
import { CreatePaymentInput } from './dto/createPayment.input';
import { GqlAuthAccessGuard } from 'src/common/auth/gql.auth.guard';
import { CurrentUser } from 'src/common/auth/gql.user.param';
@Resolver()
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService, //
  ) {}
  @Query(() => [Payment])
  async fetchPayments() {
    return await this.paymentService.findAll();
  }

  @Query(() => Payment)
  async fetchPayment(
    @Args('email') email: string, //
  ) {
    return await this.paymentService.findOne({ email });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
    @CurrentUser() loginUser: any,
  ) {
    return await this.paymentService.create({ loginUser, createPaymentInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async cancelPayment(
    @Args('impUid') impUid: string, //
  ) {
    return await this.paymentService.cancelPayment({ impUid });
  }
}
