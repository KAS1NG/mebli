'use client'

import { IPost } from "../../types/post"
import CartItem from "./cartItem"
import Link from "next/link";
import styles from '../../styles/cart/userCart.module.scss'

interface IUserCart {
    products: IPost[]
    total: string
}

function UserCart({ products, total }: IUserCart) {
    return (
        <main className={styles.cart}>
            <h1 className={styles.title}>Корзина покупця</h1>
            <section className={styles.items}>
                {products.map((item, id) => (
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