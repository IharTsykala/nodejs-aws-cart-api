import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column({
        type: 'varchar',
        length: 10,
    })
    status: 'OPEN' | 'ORDERED';

    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    items: CartItem[];
}
