import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { User } from 'src/database/models/user';
import { CreateUserDto, UpdateUserDto } from './user.dto.and.joi';
import { encryptPassword } from 'src/utils/encrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(user: CreateUserDto): Promise<User> {
    const hashPassword = await encryptPassword(user.password);
    return await this.userRepository.save({ ...user, password: hashPassword });
  }

  async read(id: number) {
    if (!id) {
      return await this.userRepository.find();
    }
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<UpdateResult> {
    if (data.password) {
      data.password = await encryptPassword(data.password);
    }
    return await this.userRepository.update({ id }, data);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.softDelete({ id });
  }
}
