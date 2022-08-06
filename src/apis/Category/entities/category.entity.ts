import { Field, ObjectType } from '@nestjs/graphql';
import { Course } from 'src/apis/course/entities/course.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @OneToMany(() => Course, (course) => course.category)
  @Field(() => [Course], { nullable: true })
  course: Course[];
}
