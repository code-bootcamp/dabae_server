import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { SpecificSchedule } from 'src/apis/specificSchedule/entities/specificSchedule.entity';
import { Category } from 'src/apis/category/entities/categry.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from 'src/apis/image/entities/image.entity';
import { User } from 'src/apis/user/entities/user.entity';

@Entity()
@ObjectType()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: null })
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

  @Column()
  @Field(() => String)
  contents: string;

  @CreateDateColumn()
  @Field(() => Date)
  openingDate: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  closingDate: Date;

  @Column({ default: null })
  @Field(() => Date)
  courseDate: Date;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  addressDetail: string;

  @Column()
  @Field(() => String)
  zipCode: string;

  @ManyToOne(() => User)
  @Field(() => User)
  host: User;

  @JoinTable()
  @OneToMany(() => Image, (imageURLs) => imageURLs.course)
  @Field(() => [Image])
  imageURLs: Image[];

  // @Column({ type: 'decimal', precision: 16, scale: 13 })
  // @Field(() => Float, { nullable: true })
  // lat: number;

  // @Column({ type: 'decimal', precision: 16, scale: 13 })
  // @Field(() => Float, { nullable: true })
  // lng: number;

  @OneToMany(() => SpecificSchedule, (specificSchedule) => specificSchedule.id)
  @Field(() => SpecificSchedule)
  specificSchedule: SpecificSchedule;

  @ManyToOne(() => Category)
  @Field(() => Category, { nullable: true })
  category: Category;

  @Column({ default: 0 })
  @Field(() => Int)
  pick: number;

  @JoinTable()
  @ManyToMany(() => User, (user) => user.course)
  user: User[];
}
