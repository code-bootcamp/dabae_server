import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { CacheModule, Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { AppService } from './app.service';
import { UserModule } from './apis/user/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { FileModule } from './apis/file/file.module';
import { CourseModule } from './apis/course/course.module';
import { ReviewModule } from './apis/reivews/review.module';
import { AppController } from './app.controller';
import { CourseDateModule } from './apis/courseDate/courseDate.module';
import { SpecificScheduleModule } from './apis/specificSchedule/specificSchedule.module';
import { PickModule } from './apis/pick/pick.module';
import { CategoryModule } from './apis/category/category.module';
import { PaymentModule } from './apis/payment/payment.module';

@Module({
  imports: [
    // 배포용
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '10.86.0.2',
    //   port: 3306,
    //   username: 'root',
    //   password: '12345',
    //   database: 'dabae-database',
    //   entities: [__dirname + '/apis/**/*.entity.*'],
    //   synchronize: true,
    //   logging: true,
    // }),
    // CacheModule.register<RedisClientOptions>({
    //   store: redisStore,
    //   url: 'redis://10.86.1.3:6379',
    //   isGlobal: true,
    // }),

    // 로컬용
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '10.86.0.2',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'dabae-database',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: 'http://localhost:3000',
        credentials: 'include',
        exposedHeaders: ['Authorization', 'Set-Cookie', 'Cookie'],
      },
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://10.86.1.3:6379',
      isGlobal: true,
    }),
    ReviewModule,
    UserModule,
    AuthModule,
    FileModule,
    CategoryModule,
    CourseModule,
    CourseDateModule,
    SpecificScheduleModule,
    PickModule,
    PaymentModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
