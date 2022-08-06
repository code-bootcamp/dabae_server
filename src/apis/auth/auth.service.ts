import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getAccessToken({ user }) {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
    return accessToken;
  }

  setRefreshToken({ user, req, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      {
        secret: 'myRefreshKey',
        expiresIn: '6h',
      },
    );
    // 개발환경
    // res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`); // path 설정 반드시 필요!! (소셜로그인에서)
    // 배포할 때
    //---------
    const allowedOrigins = ['https://dabae.co.kr', 'http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    );
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; domain=.dabae.shop; SameSite=None; Secure; httpOnly;`,
    );
    // ------
    // ngrok 켤 때
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.jp.ngrok.io; SameSite=None; Secure; httpOnly;`,
    // );
    //local 할때
    // res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }
  async createSocialUser({ req, res }) {
    let userFound = await this.userRepository.findOne({
      where: { email: req.user.email },
    });

    console.log(userFound);
    if (!userFound) {
      userFound = await this.userRepository.save({
        email: req.user.email,
        nickname: req.user.nickname,
        phone: req.user.phone,
        birth: req.user.DOB,
        isHost: req.user.isHost,
        marketingAgreement: true,
      });
    }
    this.setRefreshToken({ user: userFound, res, req });

    res.redirect('https://dabae.co.kr');
    //https://dabae.co.kr ,http://localhost:3000
    return userFound;
  }
}
