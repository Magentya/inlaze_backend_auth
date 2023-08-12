import { Entity, Column } from 'typeorm';

import { Common } from './commons';

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
}
