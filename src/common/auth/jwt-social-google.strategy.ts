import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import 'dotenv/config';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://dabae.shop/login/google',
      scope: ['email', 'profile'],
    });
  }
  validate(accestoken, refreshToken, profile) {
    return {
      email: profile.emails[0].value,
      nickname: 'sammmm',
      pwd: '12093812093',
      name: profile.displayName,
      phone: '01034781231',
      address: '',
      DOB: '2002-04-12',
      isHost: false,
    };
  }
}
