import * as Joi from 'joi';

// PASSWORD REGEX
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export class CreateUserDto {
  readonly fullName: string;
  readonly email: string;
  readonly password: string;
  readonly phone?: string;
}

export const CreateUserSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordRegex).required(),
  phone: Joi.string().optional(),
});

export class UpdateUserDto {
  readonly fullName?: string;
  readonly email?: string;
  password?: string;
  readonly phone?: string;
}

export const UpdateUserSchema = Joi.object({
  fullName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().pattern(passwordRegex).optional(),
  phone: Joi.string().optional(),
});
