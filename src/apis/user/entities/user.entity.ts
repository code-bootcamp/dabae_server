import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Payment } from 'src/apis/payment/entities/payment.entity';
import { Pick } from 'src/apis/pick/entities/pick.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field(() => String)
  email: string;

  @Column({ nullable: true })
  @Field(() => String)
  password: string;

  @Column({ nullable: true })
  @Field(() => String)
  nickname: string;

  @Column({ default: null })
  @Field(() => String, { nullable: true })
  phone: string;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;

  @Column({ default: null })
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

  @Column({ default: null })
  @Field(() => Boolean)
  marketingAgreement: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Pick, (pick) => pick.user)
  @Field(() => [Pick])
  pick: Pick[];

  @OneToMany(() => Payment, (payment) => payment.user)
  @Field(() => [Payment])
  payment: Payment[];
}
