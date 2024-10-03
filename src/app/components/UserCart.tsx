'use client'

import { IPost } from "../types/post"
import CartItem from "./cartItem"
import Link from "next/link";

function UserCart({ products }: { products: IPost[] }) {
    const total = products.reduce((acc, item) => acc + item.price, 0);

    return (
        <main className="cart">
            <h1 className="cart__title">Корзина покупця</h1>
            <section className="cart__items">
                {products.length > 0 ? (
                    products.map((item, id) => (
                        <CartItem
                            key={id}
                            item={item}
                        />
                    ))
                ) : (
                    <p>Ваша корзина покищо порожня.</p>
                )}
            </section>
            <section className="cart__summary">
                <h2 className="cart__summary-title">Сума замовлення</h2>
                <p className="cart__total">Разом: ${total.toFixed(2)}</p>
                <Link href={`/payment`}>
                    <button className="cart__checkout-button">Оформлення замовлення</button>
                </Link>
            </section>
        </main>
    )
}

export default UserCart