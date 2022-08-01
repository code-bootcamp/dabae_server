import { InputType, OmitType } from '@nestjs/graphql';
import { CreateCourseInput } from './create.course.input';

@InputType()
export class UpdateCourseInput extends OmitType(CreateCourseInput, [
  'category',
]) {}
