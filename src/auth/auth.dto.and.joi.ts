import * as Joi from 'joi';

export class LoginDto {
  mail: string;
  password: string;
}

export const LoginSchema = Joi.object({
  mail: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
