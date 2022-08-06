import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGoogleStrategy } from 'src/common/auth/jwt-social-google.strategy';
import { JwtKakaoStrategy } from 'src/common/auth/jwt-social-kakaotalk.strategy';
import { JwtNaverStrategy } from 'src/common/auth/jwt-social-naver.strategy';
import { JwtAccessStrategy } from 'src/common/auth/jwt.access.strategy';
import { JwtRefreshStrategy } from 'src/common/auth/jwt.refresh.strategy';
import { Course } from '../course/entities/course.entity';
import { Pick } from '../pick/entities/pick.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User, Pick, Course]),
  ],
  providers: [
    AuthResolver, //
    AuthService,
    UserService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtKakaoStrategy,
    JwtNaverStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
