import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './src/commons/graphql/schema.gql',
    }),
    CourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
