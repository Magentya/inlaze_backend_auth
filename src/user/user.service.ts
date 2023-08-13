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
      return await this.userRepository.find({
        relations: ['rol'],
      });
    }
    return await this.userRepository.findOne({
      where: { id },
      relations: ['rol'],
    });
  }

  async update(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    if (user.password) {
      user.password = await encryptPassword(user.password);
    }
    return await this.userRepository.update({ id }, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.softDelete({ id });
  }

  async getUserByMail(mail: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: mail },
    });
  }
}
