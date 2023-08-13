import * as Joi from 'joi';

export class CreateRolDto {
  name: string;
}

export const CreateRolSchema = Joi.object({
  name: Joi.string().required(),
});

export class UpdateRolDto {
  name: string;
}

export const UpdateRolSchema = Joi.object({
  name: Joi.string().required(),
});

export class AssignRolToUserDto {
  idRol: number;
  idUser: number;
}

export const AssignRolToUserSchema = Joi.object({
  idRol: Joi.number().required(),
  idUser: Joi.number().required(),
});
