import { Injectable } from '@nestjs/common';
import { Rol } from '../database/models/rol';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  AssignRolToUserDto,
  CreateRolDto,
  UpdateRolDto,
} from './role.dto.and.joi';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async create(rol: CreateRolDto): Promise<Rol> {
    return await this.rolRepository.save(rol);
  }

  async assignRolToUser(data: AssignRolToUserDto): Promise<Rol> {
    await this.rolRepository.update(data.idRol, {
      user: {
        id: data.idUser,
      },
    });
    return await this.rolRepository.findOne({
      where: { id: data.idRol },
      relations: ['user'],
    });
  }

  async read(id: number) {
    if (!id) {
      return await this.rolRepository.find();
    }
    return await this.rolRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, rol: UpdateRolDto): Promise<UpdateResult> {
    return await this.rolRepository.update({ id }, rol);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.rolRepository.softDelete({ id });
  }
}
