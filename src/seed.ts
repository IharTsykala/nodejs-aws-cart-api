import { DataSource } from 'typeorm';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart/entities/cart-item.entity';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT, 10),
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    entities: [Cart, CartItem],
    ssl: {
        rejectUnauthorized: false,
    },
});

export async function seed() {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    const cart1 = new Cart();
    cart1.id = '1e95e27c-4c0b-4e2c-9d65-8c12cbb92562';
    cart1.user_id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    cart1.created_at = new Date();
    cart1.updated_at = new Date();
    cart1.status = 'OPEN';

    const cart2 = new Cart();
    cart2.id = '1e95e27c-4c0b-4e2c-9d65-8c12cbb92563';
    cart2.user_id = 'f47ac10b-58cc-4372-a567-0e02b2c3d480';
    cart2.created_at = new Date();
    cart2.updated_at = new Date();
    cart2.status = 'ORDERED';

    const cartItem1 = new CartItem();
    cartItem1.id = '6e8e6a3b-9f64-4d89-8e1d-42e6b9d8e1b1';
    cartItem1.cart_id = '1e95e27c-4c0b-4e2c-9d65-8c12cbb92562';
    cartItem1.product_id = 'product1';
    cartItem1.count = 2;

    const cartItem2 = new CartItem();
    cartItem2.id = '6e8e6a3b-9f64-4d89-8e1d-42e6b9d8e1b2';
    cartItem2.cart_id = '1e95e27c-4c0b-4e2c-9d65-8c12cbb92562';
    cartItem2.product_id = 'product2';
    cartItem2.count = 1;

    const cartItem3 = new CartItem();
    cartItem3.id = '6e8e6a3b-9f64-4d89-8e1d-42e6b9d8e1b3';
    cartItem3.cart_id = '1e95e27c-4c0b-4e2c-9d65-8c12cbb92563';
    cartItem3.product_id = 'product3';
    cartItem3.count = 4;

    await AppDataSource.getRepository(Cart).save([cart1, cart2]);
    await AppDataSource.getRepository(CartItem).save([cartItem1, cartItem2, cartItem3]);

    console.log('Seed data has been inserted!');
    await AppDataSource.destroy();
}
