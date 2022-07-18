import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/categry.entity';
import { Image } from '../image/entities/image.entity';
import { User } from '../user/entities/user.entity';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne({ courseId }) {
    return await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['specificSchedule', 'category', 'user', 'imageURLs', 'host'],
    });
  }
  async findAll() {
    return await this.courseRepository.find();
  }

  async search(input: string) {
    const allCourses = await this.courseRepository.find();
    const result = [];
    for (let i = 0; i < allCourses.length; i++) {
      if (allCourses[i].name.includes(input)) {
        result.push(allCourses[i]);
      }
    }
    return result;
  }

  async hotCourses() {
    const allCourses = await this.courseRepository.find();
    const result = [];
    for (let j = 0; j < 5; j++) {
      let max = allCourses[0];
      let num = 0;
      for (let i = 0; i < allCourses.length; i++) {
        if (max.pick < allCourses[i].pick) {
          max = allCourses[i];
          num = i;
        }
      }
      allCourses.splice(num, 1);
      result.push(max);
    }
    return result;
  }

  async create({ createCourseInput, currentUser }) {
    const { imageURLs, category, ...items } = createCourseInput;
    let categoryResult = await this.categoryRepository.findOne({
      where: { name: category },
    });

    const hostUser = await this.userRepository.findOne({
      where: { email: currentUser.email },
    });

    if (!categoryResult) {
      categoryResult = await this.categoryRepository.save({
        name: category,
      });
    }

    const imgs = await Promise.all(
      imageURLs.map((url) => {
        return this.imageRepository.save({
          imageurls: url,
        });
      }),
    );

    const result = await this.courseRepository.save({
      ...items,
      category: categoryResult,
      imageURLs: imgs,
      host: hostUser,
    });
    return result;
  }

  async update({ courseId, updateCourseInput }) {
    const { imageurls, ...updateCourse } = updateCourseInput;
    const myCourse = await this.courseRepository.findOne({
      where: { id: courseId },
    });
    const prevImage = await this.imageRepository.find({
      where: { course: { id: courseId } },
    });
    const prevUrl = prevImage.map((imageurls) => imageurls.imageurls);

    await Promise.all(
      imageurls.map((image) => {
        if (!prevUrl.includes(image)) {
          return this.imageRepository.save({
            imageurls: image,
            course: { id: courseId },
          });
        }
      }),
    );
    const newCourse = {
      ...myCourse,
      id: courseId,
      ...updateCourse,
    };
    return await this.courseRepository.save(newCourse);
  }

  async delete({ courseId }) {
    const result = await this.courseRepository.softDelete({ id: courseId });
    return result.affected ? true : false;
  }
}
