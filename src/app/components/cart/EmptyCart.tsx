import Link from 'next/link'
import styles from '../../styles/cart/emptyCart.module.scss';

function EmptyCart() {
  return <div className={styles.emptyCart}>
      <p className={styles.message}>🛒 Ваша корзина поки що порожня.</p>
      <Link href="/products">
        Перейти до покупок
      </Link>
    </div>
}

export default EmptyCart