import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Rol } from './models/rol';
import { User } from './models/user';
import env from '../env';

const { bd_host, bd_user, bd_pass, bd_name } = env;

export const databaseOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: bd_host,
  port: 5432,
  username: bd_user,
  password: bd_pass,
  database: bd_name,
  synchronize: true,
  entities: [User, Rol],
};

/* docker run --name Oto -e MYSQL_ROOT_PASSWORD=mysecretpassword -e MYSQL_DATABASE=developer -d -p 3306:3306 mysql */
/* docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres */
