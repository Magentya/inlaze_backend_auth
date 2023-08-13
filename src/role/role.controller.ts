import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { RoleService } from './role.service';
import {
  AssignRolToUserDto,
  AssignRolToUserSchema,
  CreateRolDto,
  CreateRolSchema,
  UpdateRolDto,
  UpdateRolSchema,
} from './role.dto.and.joi';
import { GeneralResponse } from 'src/types';
import to from 'await-to-js';
import { JoiValidationPipe } from 'src/pipe/joi.pipe';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new JoiValidationPipe(CreateRolSchema))
  async create(@Body() data: CreateRolDto): Promise<GeneralResponse> {
    const [err, response] = await to(this.roleService.create(data));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      message: 'Role created successfully',
      statusCode: HttpStatus.CREATED,
      data: response,
    };
  }

  @Get('/:id?')
  @HttpCode(HttpStatus.OK)
  async read(@Param('id') id: number): Promise<GeneralResponse> {
    const [err, response] = await to(this.roleService.read(id));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      message: 'Role retrieved successfully',
      statusCode: HttpStatus.OK,
      data: response ?? 'No role found',
    };
  }

  @Put('/assign')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(AssignRolToUserSchema))
  async assign(@Body() data: AssignRolToUserDto): Promise<GeneralResponse> {
    const [err, response] = await to(this.roleService.assignRolToUser(data));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      message: 'Role assigned successfully',
      statusCode: HttpStatus.OK,
      data: response,
    };
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(UpdateRolSchema))
  async update(
    @Param('id') id: number,
    @Body() data: UpdateRolDto,
  ): Promise<GeneralResponse> {
    const [err, response] = await to(this.roleService.update(id, data));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      message: 'Role updated successfully',
      statusCode: HttpStatus.OK,
      data: response.affected === 1 ? 'Rol updated' : 'No rol found',
    };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: number): Promise<GeneralResponse> {
    const [err, response] = await to(this.roleService.delete(id));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      message: 'Role deleted successfully',
      statusCode: HttpStatus.OK,
      data: response.affected === 1 ? 'Rol deleted' : 'No rol found',
    };
  }
}
