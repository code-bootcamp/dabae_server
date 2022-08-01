import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { CourseTime } from '../courseTime/entities/courseTime.entity';
import { Image } from '../image/entities/image.entity';
import { Material } from '../material/entities/material.entity';
import { Payment } from '../payment/entities/payment.entity';
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
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(CourseTime)
    private readonly courseTimeRepository: Repository<CourseTime>,
  ) {}

  async findOne({ courseId }) {
    const result = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: [
        'host',
        'imageURLs',
        'materials',
        'courseDate',
        'courseDate.courseTime',
        'category',
        'review',
      ],
    });
    return result;
  }
  async findAll(page) {
    return await this.courseRepository.find({
      relations: [
        'host',
        'imageURLs',
        'materials',
        'courseDate',
        'courseDate.courseTime',
        'category',
        'review',
      ],
      skip: (page - 1) * 16,
      take: 10,
    });
  }

  async fetchCoursesByHost(hostID, page) {
    const host = await this.userRepository.findOne({
      where: { id: hostID },
    });

    const courses = await this.courseRepository.find({
      relations: [
        'host',
        'imageURLs',
        'materials',
        'courseDate',
        'courseDate.courseTime',
        'category',
        'review',
      ],
    });
    const result = [];
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].host.id === hostID) {
        result.push(courses[i]);
      }
    }
    const pagination = [];
    for (let i = (page - 1) * 16; i < page * 16; i++) {
      if (result[i] !== undefined) pagination.push(result[i]);
    }
    return pagination;
  }

  async searchSortByCreated(search: string, page: number) {
    const allCourses = await this.courseRepository.find({
      relations: [
        'host',
        'imageURLs',
        'materials',
        'courseDate',
        'category',
        'review',
        'courseDate.courseTime',
      ],
    });
    const result = [];
    for (let i = 0; i < allCourses.length; i++) {
      if (allCourses[i].name.includes(search)) {
        result.push(allCourses[i]);
      }
    }

    let tem = 0;
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (result[i].createdAt < result[j].createdAt) {
          tem = result[i];
          result[i] = result[j];
          result[j] = tem;
        }
      }
    }
    const pagination = [];
    for (let i = (page - 1) * 16; i < page * 16; i++) {
      if (result[i] !== undefined) pagination.push(result[i]);
    }
    return pagination;
  }

  async searchSortByPick(search: string, page: number) {
    const allCourses = await this.courseRepository.find({
      relations: [
        'host',
        'imageURLs',
        'category',
        'materials',
        'courseDate',
        'courseDate.courseTime',
        'review',
      ],
    });
    const result = [];
    for (let i = 0; i < allCourses.length; i++) {
      if (allCourses[i].name.includes(search)) {
        result.push(allCourses[i]);
      }
    }
    let tem = 0;
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (result[i].pick < result[j].pick) {
          tem = result[i];
          result[i] = result[j];
          result[j] = tem;
        }
      }
    }
    const pagination = [];
    for (let i = (page - 1) * 16; i < page * 16; i++) {
      if (result[i] !== undefined) pagination.push(result[i]);
    }
    return pagination;
  }

  async searchSortByDiscount(search: string, page: number) {
    const allCourses = await this.courseRepository.find({
      relations: [
        'host',
        'category',
        'imageURLs',
        'materials',
        'courseDate',
        'courseDate.courseTime',
        'review',
      ],
    });
    const result = [];
    for (let i = 0; i < allCourses.length; i++) {
      if (allCourses[i].name.includes(search)) {
        result.push(allCourses[i]);
      }
    }
    let tem = 0;
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (
          (result[i].maxPrice - result[i].minPrice) / result[i].maxPrice <
          (result[j].maxPrice - result[j].minPrice) / result[j].minPrice
        ) {
          tem = result[i];
          result[i] = result[j];
          result[j] = tem;
        }
      }
    }

    const pagination = [];
    for (let i = (page - 1) * 16; i < page * 16; i++) {
      if (result[i] !== undefined) pagination.push(result[i]);
    }
    return pagination;
  }

  async searchAddress(search, page) {
    const allCourses = await this.courseRepository.find({
      relations: [
        'host',
        'category',
        'imageURLs',
        'materials',
        'courseDate',
        'courseDate.courseTime',
        'review',
      ],
    });
    const result = [];
    for (let i = 0; i < allCourses.length; i++) {
      if (allCourses[i].address.includes(search)) {
        result.push(allCourses[i]);
      }
    }
    const pagination = [];
    for (let i = (page - 1) * 16; i < page * 16; i++) {
      if (result[i] !== undefined) pagination.push(result[i]);
    }
    return pagination;
  }

  async searchHostNickname(search, page) {
    const allCourses = await this.courseRepository.find({
      relations: [
        'host',
        'category',
        'imageURLs',
        'materials',
        'courseDate',
        'courseDate.courseTime',
        'review',
      ],
    });
    const result = [];
    for (let i = 0; i < allCourses.length; i++) {
      if (allCourses[i].host.nickname.includes(search)) {
        result.push(allCourses[i]);
      }
    }
    const pagination = [];
    for (let i = (page - 1) * 16; i < page * 16; i++) {
      if (result[i] !== undefined) pagination.push(result[i]);
    }
    return pagination;
  }

  // 인기코스, pick이 높은 순서대로 뽑는다. j의 크기만큼의 갯수를 리턴함
  async hotCourses() {
    const allCourses = await this.courseRepository.find({
      relations: [
        'host',
        'category',
        'imageURLs',
        'materials',
        'courseDate',
        'courseDate.courseTime',
        'review',
      ],
    });
    const result = [];
    for (let j = 0; j < 4; j++) {
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

  async newCourses() {
    const allCourses = await this.courseRepository.find({
      relations: [
        'host',
        'imageURLs',
        'category',
        'materials',
        'courseDate',
        'courseDate.courseTime',
        'review',
      ],
    });
    const result = [];
    for (let j = 0; j < 4; j++) {
      let latest = allCourses[0];
      let num = 0;
      for (let i = 0; i < allCourses.length; i++) {
        if (latest.createdAt < allCourses[i].createdAt) {
          latest = allCourses[i];
          num = i;
        }
      }
      allCourses.splice(num, 1);
      result.push(latest);
    }
    return result;
  }

  async cheapCourses() {
    const allCourses = await this.courseRepository.find({
      relations: [
        'host',
        'imageURLs',
        'category',
        'materials',
        'courseDate',
        'courseDate.courseTime',
        'review',
      ],
    });
    const result = [];
    for (let j = 0; j < 4; j++) {
      let cheapest = allCourses[0];
      let num = 0;
      for (let i = 0; i < allCourses.length; i++) {
        if (
          (cheapest.maxPrice - cheapest.minPrice) / cheapest.maxPrice <
          (allCourses[i].maxPrice - allCourses[i].minPrice) /
            allCourses[i].maxPrice
        ) {
          cheapest = allCourses[i];
          num = i;
        }
      }
      allCourses.splice(num, 1);
      result.push(cheapest);
    }
    return result;
  }

  async fetchCoursesByCategory(search, page) {
    const allCourses = await this.courseRepository.find({
      relations: [
        'host',
        'imageURLs',
        'category',
        'materials',
        'courseDate',
        'courseDate.courseTime',
        'review',
      ],
    });
    const result = [];
    for (let i = 0; i < allCourses.length; i++) {
      if (allCourses[i].category.name === search) {
        result.push(allCourses[i]);
      }
    }
    const pagination = [];
    for (let i = (page - 1) * 16; i < page * 16; i++) {
      if (result[i] !== undefined) pagination.push(result[i]);
    }
    return pagination;
  }

  async fetchCoursesByUser(id, page) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    const payments = await this.paymentRepository.find({
      where: { user: user },
      relations: ['user', 'course', 'courseTime'],
    });
    const courses = [];
    for (let i = 0; i < payments.length; i++) {
      const course = await this.courseRepository.findOne({
        where: { payment: payments[i] },
        relations: [
          'host',
          'imageURLs',
          'category',
          'materials',
          'courseDate',
          'courseDate.courseTime',
          'review',
        ],
      });
      courses.push(course);
    }
    const pagination = [];
    for (let i = (page - 1) * 10; i < page * 10; i++) {
      if (courses[i] !== undefined) pagination.push(courses[i]);
    }
    return pagination;
  }

  async create({ createCourseInput, currentUser }) {
    const { imageURLs, category, materials, ...items } = createCourseInput;

    const hostUser = await this.userRepository.findOne({
      where: { email: currentUser.email },
    });

    let categoryResult = await this.categoryRepository.findOne({
      where: { name: category },
    });

    if (!categoryResult) {
      categoryResult = await this.categoryRepository.save({
        name: category,
      });
    }

    const result = await this.courseRepository.save({
      ...items,
      category: categoryResult,
      host: hostUser,
    });

    for (let i = 0; i < materials.length; i++) {
      await this.materialRepository.save({
        materials: materials[i],
        course: result,
      });
    }

    await this.imageRepository.save({
      isThumbnail: true,
      imageURLs: imageURLs[0],
      course: result,
    });
    for (let i = 1; i < imageURLs.length; i++) {
      await this.imageRepository.save({
        isThumbnail: false,
        imageURLs: imageURLs[i],
        course: result,
      });
    }

    const result2 = await this.courseRepository.findOne({
      relations: [
        'host',
        'imageURLs',
        'category',
        'materials',
        'courseDate',
        'courseDate.courseTime',
        'review',
      ],
      where: { id: result.id },
    });

    return result2;
  }

  async update({ courseId, updateCourseInput }) {
    const { imageURLs, ...updateCourse } = updateCourseInput;
    const myCourse = await this.courseRepository.findOne({
      where: { id: courseId },
    });
    const prevImage = await this.imageRepository.find({
      where: { course: { id: courseId } },
    });

    console.log(prevImage, '=====================');
    const prevUrl = prevImage.map((imageURLs) => imageURLs.imageURLs);
    console.log(prevUrl);
    await Promise.all(
      imageURLs.map((image) => {
        if (!prevUrl.includes(image)) {
          return this.imageRepository.save({
            imageURLs: image,
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
