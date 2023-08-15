import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { comparePassword } from 'src/utils/encrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(mail: string, password: string) {
    const user = await this.userService.getUserByMail(mail);

    if (!user) {
      throw new Error('User not found');
    }

    if (!comparePassword(password, user.password)) {
      throw new Error('Invalid password');
    }

    delete user.password;

    return {
      access_token: this.jwtService.sign({ ...user }),
    };
  }

  validateToken(accessToken: string) {
    console.log('accessToken', accessToken);

    console.log(
      'this.jwtService.verify(accessToken)',
      this.jwtService.verify(accessToken),
    );

    return this.jwtService.verify(accessToken);
  }
}
