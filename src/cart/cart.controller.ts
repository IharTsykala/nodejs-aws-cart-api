import { Controller, Get, Delete, Put, Body, Param, Post, HttpStatus } from '@nestjs/common';
import { CartService } from './services/cart.service';
import { calculateCartTotal } from './models-rules';
import { OrderService } from '../order';

@Controller('api/profile')
export class CartController {
  constructor(
      private cartService: CartService,
      private orderService: OrderService,
  ) {}

  @Get("carts")
  async findAllCarts() {
    const carts = await this.cartService.findAll();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { carts },
    };
  }

  @Get('cart/:user_id')
  async findUserCart(@Param('user_id') userId: string) {
    console.log('User ID:', userId);
    const cart = await this.cartService.findOrCreateByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart, total: calculateCartTotal(cart) },
    }
  }

  @Put('cart/:user_id')
  async updateUserCart(@Param('user_id') userId: string, @Body() body: any) {
    console.log('User ID:', userId);
    const cart = await this.cartService.updateByUserId(userId, body.items);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
        total: calculateCartTotal(cart),
      }
    }
  }

  @Delete('cart/:user_id')
  async clearUserCart(@Param('user_id') userId: string) {
    console.log('User ID:', userId);
    await this.cartService.removeByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    }
  }

  @Post('cart/:user_id/checkout')
  async checkout(@Param('user_id') userId: string, @Body() body: any) {
    console.log('User ID:', userId);
    const cart = await this.cartService.findByUserId(userId);

    if (!(cart && cart.items.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;

      return {
        statusCode,
        message: 'Cart is empty',
      }
    }

    const { id: cartId, items } = cart;
    const total = calculateCartTotal(cart);
    const order = await this.orderService.create({
      ...body,
      userId,
      cartId,
      items,
      total,
    });
    await this.cartService.removeByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order }
    }
  }
}
