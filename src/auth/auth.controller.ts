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
}
