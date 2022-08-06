import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { Course } from 'src/apis/course/entities/course.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  rate: number;

  @Column()
  @Field(() => String)
  contents: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  @Field(() => String)
  imageURLs: string;

  @ManyToOne(() => Course)
  @Field(() => Course)
  course: Course;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
