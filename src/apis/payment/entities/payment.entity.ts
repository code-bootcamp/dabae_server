import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Course } from 'src/apis/course/entities/course.entity';
import { CourseTime } from 'src/apis/courseTime/entities/courseTime.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PAYMENT_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}
registerEnumType(PAYMENT_STATUS_ENUM, {
  name: 'PAYMENT_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'enum', enum: PAYMENT_STATUS_ENUM })
  @Field(() => PAYMENT_STATUS_ENUM)
  status: PAYMENT_STATUS_ENUM;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => Int)
  quantity: number;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column()
  @Field(() => String)
  impUid: string;

  @ManyToOne(() => Course)
  @Field(() => Course)
  course: Course;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @ManyToOne(() => CourseTime)
  @Field(() => CourseTime)
  courseTime: CourseTime;
}
