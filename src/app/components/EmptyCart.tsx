'use client';
import '@/app/styles/emptyCart.scss';

import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div className="emptyCart">
      <p className="message">🛒 Ваша корзина поки що порожня.</p>
      <Link href="/products" className="link">
        Перейти до покупок
      </Link>
    </div>
  );
}
