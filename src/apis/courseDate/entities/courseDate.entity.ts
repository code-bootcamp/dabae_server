import { Field, ObjectType } from '@nestjs/graphql';
import { Course } from 'src/apis/course/entities/course.entity';
import { SpecificSchedule } from 'src/apis/specificSchedule/entities/specificSchedule.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class CourseDate {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: null })
  @Field(() => Date)
  courseDay: Date;

  @ManyToOne(() => Course)
  @Field(() => Course)
  course: Course;

}
