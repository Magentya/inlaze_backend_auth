import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import to from 'await-to-js';

import { UserService } from './user.service';
import { JoiValidationPipe } from 'src/pipe/joi.pipe';
import {
  CreateUserDto,
  CreateUserSchema,
  UpdateUserDto,
  UpdateUserSchema,
} from './user.dto.and.joi';
import { GeneralResponse } from 'src/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  async create(@Body() data: CreateUserDto): Promise<GeneralResponse> {
    const [err, response] = await to(this.userService.create(data));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      message: 'User created successfully',
      statusCode: HttpStatus.CREATED,
      data: response,
    };
  }

  @Get('/:id?')
  @HttpCode(HttpStatus.OK)
  async read(@Param('id') id: number): Promise<GeneralResponse> {
    const [err, response] = await to(this.userService.read(id));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      message: 'User retrieved successfully',
      statusCode: HttpStatus.OK,
      data: response ?? 'No user found',
    };
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(UpdateUserSchema))
  async update(
    @Param('id') id: number,
    @Body() data: UpdateUserDto,
  ): Promise<GeneralResponse> {
    const [err, response] = await to(this.userService.update(id, data));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      message: 'User updated successfully',
      statusCode: HttpStatus.OK,
      data: response.affected === 1 ? 'User updated' : 'No user found',
    };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: number): Promise<GeneralResponse> {
    const [err, response] = await to(this.userService.delete(id));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      message: 'User deleted successfully',
      statusCode: HttpStatus.OK,
      data: response.affected === 1 ? 'User deleted' : 'No user found',
    };
  }
}
