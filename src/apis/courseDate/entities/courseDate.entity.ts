import { Field, ObjectType } from '@nestjs/graphql';
import { Course } from 'src/apis/course/entities/course.entity';
import { CourseTime } from 'src/apis/courseTime/entities/courseTime.entity';
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

  @Column()
  @Field(() => Date)
  date: Date;

  @ManyToOne(() => Course)
  @Field(() => Course)
  course: Course;

  // @OneToMany(
  //   () => SpecificSchedule,
  //   (specificSchedule) => specificSchedule.courseDate,
  // )
  // @Field(() => [SpecificSchedule])
  // specificSchedule: SpecificSchedule[];
  @OneToMany(() => CourseTime, (courseTime) => courseTime.courseDate)
  @Field(() => [CourseTime])
  courseTime: CourseTime[];
}
