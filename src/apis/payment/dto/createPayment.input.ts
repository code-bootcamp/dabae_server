import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field(() => String)
  userId: string;

  @Field(() => String, { nullable: true })
  impUid: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Int)
  amount: number;

  @Field(() => String)
  courseId: string;

  @Field(() => String)
  scheduleId: string;
}
