import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Cart} from "./cart.entity";

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cart_id: string;

    @Column()
    product_id: string;

    @Column()
    count: number;

    @ManyToOne(() => Cart, cart => cart.items)
    cart: Cart;
}
