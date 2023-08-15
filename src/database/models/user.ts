import { Entity, Column, OneToOne } from 'typeorm';

import { Common } from './commons';
import { Rol } from './rol';

@Entity({ name: 'users' })
export class User extends Common {
  @Column({ type: 'varchar', nullable: false, name: 'full_name' })
  fullName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @OneToOne(() => Rol, (rol) => rol.user, {
    onDelete: 'CASCADE',
  })
  rol: Rol;
}
