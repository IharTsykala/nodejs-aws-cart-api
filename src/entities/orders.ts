import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carts } from './carts';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'uuid', nullable: false })
  cart_id: string;

  @Column({ type: 'json', nullable: false })
  payment: object;

  @Column({ type: 'json', nullable: false })
  delivery: object;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ type: 'text', nullable: false })
  status: string;

  @Column()
  total: number;

  @OneToOne(() => Carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cartId', referencedColumnName: 'id' })
  carts: Carts;
}


