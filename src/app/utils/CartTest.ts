// utils/cart.ts
import Cookies from 'js-cookie';
import { revalidateCart } from '../actions/revalidateCart';

const CART_COOKIE_NAME = 'cart_ids';

export function getCartIds(): number[] {
  const raw = Cookies.get(CART_COOKIE_NAME);
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed) && parsed.every(id => typeof id === 'number')) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
}

export async function addToCartTest(productId: number) {
  const ids = getCartIds();
  ids.push(productId);
  Cookies.set(CART_COOKIE_NAME, JSON.stringify(ids), { expires: 7 });

  // Тригеримо оновлення кешу на сервері
  await revalidateCart();
}

export function removeFromCart(productId: number): void {
  const ids = getCartIds();
  const index = ids.indexOf(productId);
  if (index !== -1) {
    ids.splice(index, 1); // видалити першу появу
  }
  Cookies.set(CART_COOKIE_NAME, JSON.stringify(ids), { expires: 7 });
}

export function clearCart(): void {
  Cookies.remove(CART_COOKIE_NAME);
}
