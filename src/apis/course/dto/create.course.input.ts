import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateCourseInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  maxPrice: number;

  @Field(() => Int)
  minPrice: number;

  @Field(() => String)
  address: string;

  @Field(() => String)
  addressDetail: string;

  @Field(() => String)
  zipCode: string;

  @Field(() => String)
  difficulty: string;

  @Field(() => [String])
  materials: string[];

  @Field(() => String)
  contents: string;

  @Field(() => Date)
  openingDate: Date;

  @Field(() => Date)
  closingDate: Date;

  @Field(() => [String], { nullable: true })
  imageURLs: string[];

  @Field(() => String)
  category: string;

  @Field(() => Float, { nullable: true })
  lat: number;

  @Field(() => Float, { nullable: true })
  lng: number;
}
