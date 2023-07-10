import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Carts } from './carts';

@Entity()
export class CartItems {
  @PrimaryColumn('uuid')
  cart_id: string;

  @Column({ type: 'uuid', nullable: false })
  productId: string;

  @Column()
  count: number;

  @OneToOne(() => Carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  carts: Carts;
}
