'use client'

import CartItem from "./cartItem"
import Link from "next/link";
import styles from '../../styles/cart/userCart.module.scss'
import { useCart } from "@/app/context/CartContext";
import EmptyCart from "./EmptyCart";

// interface IUserCart {
//     products: IPost[]
//     total: string
// }

// function UserCart({ products, total }: IUserCart) {
function UserCart() {
    const { cartItems } = useCart();

    if (!cartItems || cartItems.length === 0) {
        return <EmptyCart />;
    }

    const total = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    return (
        <main className={styles.cart}>
            <h1 className={styles.title}>Корзина покупця</h1>
            <section className={styles.items}>
                {cartItems.map((item, id) => (
                    <CartItem key={id} item={item} />
                ))}
            </section>
            <div className={styles.summary}>
                <h2 className={styles.title}>Сума замовлення</h2>
                <p className={styles.total}>Разом: {total} грн.</p>
                <Link href={`/payment`}>
                    <button className={styles.button}>Оформлення замовлення</button>
                </Link>
            </div>
        </main>
    )
}

export default UserCart