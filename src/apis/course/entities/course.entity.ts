import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { Category } from 'src/apis/category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from 'src/apis/image/entities/image.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Material } from 'src/apis/material/entities/material.entity';
import { Review } from 'src/apis/reivews/entities/review.entity';
import { CourseDate } from 'src/apis/courseDate/entities/courseDate.entity';
import { CourseTime } from 'src/apis/courseTime/entities/courseTime.entity';
import { Payment } from 'src/apis/payment/entities/payment.entity';
import { Pick } from 'src/apis/pick/entities/pick.entity';

@Entity()
@ObjectType()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  maxPrice: number;

  @Column()
  @Field(() => Int)
  minPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  @Field(() => String)
  difficulty: string;

  @Column({ type: 'longtext' })
  @Field(() => String)
  contents: string;

  @CreateDateColumn()
  @Field(() => Date)
  openingDate: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  closingDate: Date;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  addressDetail: string;

  @Column()
  @Field(() => String)
  zipCode: string;

  @Column({ type: 'decimal', precision: 16, scale: 13 })
  @Field(() => Float, { nullable: true })
  lat: number;

  @Column({ type: 'decimal', precision: 16, scale: 13 })
  @Field(() => Float, { nullable: true })
  lng: number;

  @Column({ default: 0 })
  @Field(() => Int)
  pick: number;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  host: User;

  @ManyToOne(() => Category)
  @Field(() => Category)
  category: Category;

  @OneToMany(() => Image, (imageURLs) => imageURLs.course)
  @Field(() => [Image], { nullable: true })
  imageURLs: Image[];

  @OneToMany(() => Material, (materials) => materials.course)
  @Field(() => [Material], { nullable: true })
  materials: Material[];

  @OneToMany(() => Review, (review) => review.course)
  @Field(() => [Review])
  review: Review[];

  @OneToMany(() => CourseDate, (courseDate) => courseDate.course)
  @Field(() => [CourseDate])
  courseDate: CourseDate[];

  @OneToMany(() => CourseTime, (courseTime) => courseTime.course)
  @Field(() => [CourseTime])
  courseTime: CourseTime[];

  @OneToMany(() => Payment, (payment) => payment.course)
  @Field(() => [Payment])
  payment: Payment[];
}
