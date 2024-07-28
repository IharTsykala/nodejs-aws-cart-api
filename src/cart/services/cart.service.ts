import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Cart } from "../entities/cart.entity";
import { CartItem } from "../entities/cart-item.entity";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CartService {
  constructor(
      @InjectRepository(Cart)
      private cartRepository: Repository<Cart>,
      @InjectRepository(CartItem)
      private cartItemRepository: Repository<CartItem>,
  ) {}

  async findAll(): Promise<Cart[]> {
    const carts = await this.cartRepository.find();
    console.log('All carts:', carts);  // Добавьте логирование для проверки
    return carts;
  }

  async findByUserId(userId: string): Promise<Cart | null> {
    console.log('Finding cart for user ID:', userId);  // Добавьте логирование
    return await this.cartRepository.findOne({ where: { user_id: userId }, relations: ['items'] });
  }

  async createByUserId(userId: string): Promise<Cart> {
    console.log('Creating cart for user ID:', userId);  // Добавьте логирование
    const id = uuidv4();
    const cart = this.cartRepository.create({
      id,
      user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
      status: 'OPEN',
      items: [],
    });
    return await this.cartRepository.save(cart);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    let cart = await this.findByUserId(userId);
    if (!cart) {
      cart = await this.createByUserId(userId);
    }
    return cart;
  }

  async updateByUserId(userId: string, items: CartItem[]): Promise<Cart> {
    const cart = await this.findOrCreateByUserId(userId);
    cart.items = items;
    cart.updated_at = new Date();
    return await this.cartRepository.save(cart);
  }

  async removeByUserId(userId: string): Promise<void> {
    const cart = await this.findByUserId(userId);
    if (cart) {
      await this.cartRepository.remove(cart);
    }
  }
}
