import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import 'dotenv/config';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://dabae.shop/login/google',
      //callbackURL: 'http://localhost:3000/login/google',

      scope: ['email', 'profile'],
    });
  }
  validate(accestoken, refreshToken, profile) {
    return {
      email: profile.emails[0].value,
      nickname: profile.emails[0].value.split('@')[0],
      isHost: false,
      // phone: '011034123',
      // birth: '2022-03-21',
      // marketingAgreement: true,
    };
  }
}
