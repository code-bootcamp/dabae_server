import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => Boolean, { nullable: true })
  isHost: boolean;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  nickname: string;

  @Field(() => String)
  phone: string;

  @Field(() => Boolean)
  marketingAgreement: boolean;

  @Field(() => String, { nullable: true })
  account: string;

  @Field(() => String, { nullable: true })
  bank: string;

  @Field(() => String, { nullable: true })
  businessName: string;

  @Field(() => String, { nullable: true })
  businessNumber: string;
}
