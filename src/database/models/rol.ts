import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import { Common } from './commons';
import { User } from './user';

@Entity({ name: 'roles' })
export class Rol extends Common {
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @OneToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn()
  user: User;
}
