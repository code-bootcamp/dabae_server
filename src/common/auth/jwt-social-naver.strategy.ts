import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';
import 'dotenv/config';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'https://dabae.shop/login/naver',
      // callbackURL: 'http://localhost:3000/login/naver',
      scope: ['profile'],
    });
  }
  validate(accestoken, refreshToken, profile) {
    return {
      email: profile.email,
      password: '12093812093',
      name: profile.name,
      phone: profile.mobile,
      DOB: '2010-04-22',
      address: '',
    };
  }
}
