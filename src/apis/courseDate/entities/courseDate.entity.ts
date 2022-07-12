import { Field, ObjectType } from '@nestjs/graphql';
import { Course } from 'src/apis/course/entities/course.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class CourseDate {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: null })
  @Field(() => Date)
  courseDate: Date;

  @Column({ default: null })
  @Field(() => Date)
  RecruitmentStartDate: Date;

  @Column({ default: null })
  @Field(() => Date)
  RecruitmentEdnDate: Date;

  @ManyToOne(() => Course)
  @Field(() => Course)
  course: Course;
}
