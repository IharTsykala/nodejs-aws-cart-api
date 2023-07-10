import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Types {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

@Entity()
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'date', nullable: false })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  updatedAt: Date;

  @Column({ type: 'enum', enum: Types, default: Types.OPEN })
  status: Types;
}
