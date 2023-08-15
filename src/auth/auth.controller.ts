import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import to from 'await-to-js';
import { GeneralResponse } from 'src/types';
import { LoginDto, LoginSchema } from './auth.dto.and.joi';
import { JoiValidationPipe } from 'src/pipe/joi.pipe';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(LoginSchema))
  async login(@Body() data: LoginDto): Promise<GeneralResponse> {
    const [err, response] = await to(
      this.authService.login(data.mail, data.password),
    );

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      message: 'User logged in successfully',
      statusCode: HttpStatus.OK,
      data: response,
    };
  }

  @MessagePattern('validateToken')
  async validateToken({ accessToken }: { accessToken: string }) {
    try {
      if (!accessToken) {
        throw new RpcException('Not token provided');
      }

      // Validate access token
      const responseToken = this.authService.validateToken(accessToken);

      return responseToken;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
