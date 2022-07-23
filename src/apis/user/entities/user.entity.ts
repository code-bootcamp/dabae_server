import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Course } from 'src/apis/course/entities/course.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  nickname: string;

  @Column({ default: null })
  @Field(() => String, { nullable: true })
  phone: string;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;

  @Column()
  @Field(() => Boolean)
  isHost: boolean;

  @Column({ default: null })
  @Field(() => String, { nullable: true })
  account: string;

  @Column({ default: null })
  @Field(() => String, { nullable: true })
  bank: string;

  @Column({ default: null })
  @Field(() => String, { nullable: true })
  businessName: string;

  @Column({ default: null })
  @Field(() => String, { nullable: true })
  businessNumber: string;

  @Column({ default: null })
  @Field(() => Date, { nullable: true })
  birth: Date;

  @Column({ default: null })
  @Field(() => Boolean, { nullable: true })
  gender: boolean;

  @Column({ default: null })
  @Field(() => String, { nullable: true })
  profileImageURL: string;

  @Column()
  @Field(() => Boolean)
  marketingAgreement: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinTable()
  @ManyToMany(() => Course, (course) => course.user)
  course: Course[];
}
