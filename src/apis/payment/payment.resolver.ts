import { UnauthorizedException } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import * as jwt from 'jsonwebtoken';
import { CreatePaymentInput } from './dto/createPayment.input';
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

  @Mutation(() => Payment)
  async createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput, //
    @Context() context: any,
  ) {
    try {
      const accessToken = context.req.headers.authorization.split(' ')[1];
      console.log(accessToken);
      const a = jwt.verify(accessToken, 'myAccessKey');
      console.log(a);
      return await this.paymentService.create({ createPaymentInput });
    } catch {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }

  // @Mutation(() => Boolean)
  // cancelPayment(
  //   @Args('impUid') impUid: string, //
  // ) {
  //   return this.paymentService.cancelPayment({ impUid });
  // }
}
