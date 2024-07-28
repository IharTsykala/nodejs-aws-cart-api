import {Cart} from "../entities/cart.entity";
import {CartItem} from "../entities/cart-item.entity";


/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Cart): number {
  return cart ? cart.items.reduce((acc: number, { product_id, count }: CartItem) => {

    const price = 10;
    return acc + (price * count);
  }, 0) : 0;
}
