import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseOptions } from './database/database.provider';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseOptions), UserModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
