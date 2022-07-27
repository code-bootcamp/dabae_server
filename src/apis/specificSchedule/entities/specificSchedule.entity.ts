import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Course } from 'src/apis/course/entities/course.entity';
import { CourseDate } from 'src/apis/courseDate/entities/courseDate.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class SpecificSchedule {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  maxUsers: number;

  @Column({ default: 0 })
  @Field(() => Int)
  reservedPerson: number;

  @Column()
  @Field(() => Date)
  recruitmentEndDate: Date;

  @Column()
  @Field(() => Date)
  recruitmentStartDate: Date;

  @Column()
  @Field(() => Date)
  courseStartTime: Date;

  @Column()
  @Field(() => Date)
  courseEndTime: Date;

  @ManyToOne(() => CourseDate)
  @Field(() => CourseDate)
  courseDate: CourseDate;

  @ManyToOne(() => Course)
  @Field(() => Course)
  course: Course;
}
