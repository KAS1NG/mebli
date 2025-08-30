'use client'

import styles from '../../styles/cart/userCart.module.scss'
import { useCart } from "@/app/context/CartContext";
import EmptyCart from "./EmptyCart";
import { IPreviewPost } from "@/app/types/post";
import Image from 'next/image';
import Link from 'next/link';

function UserCart() {
    const { cartItems, incrementProduct, decrementProduct, removeProductFromCart } = useCart();

    if (!cartItems || cartItems.length === 0) {
        return <EmptyCart />;
    }

    const groupedProducts: IPreviewPost[] = cartItems.reduce((acc: IPreviewPost[], item) => {
        const existingItem = acc.find((p) => p.id === item.id);
        if (existingItem) {
            existingItem.qty = (existingItem.qty || 1) + (item.qty || 1);
        } else {
            acc.push({ ...item, qty: item.qty || 1 });
        }
        return acc;
    }, []);

    const subtotal = groupedProducts.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);
    const shipping = subtotal > 10000 ? 0 : 600;
    const total = subtotal + shipping;

    return (
        <main className={styles.cartPage}>
            <h1>Ваш кошик</h1>

            {groupedProducts.length === 0 ? (
                <p className={styles.empty}>Ваш кошик порожній</p>
            ) : (
                <div className={styles.cartLayout}>
                    <section className={styles.cartItems}>
                        {groupedProducts.map((item) => (
                            <div className={styles.cartItem} key={item.id}>
                                <Image
                                    src={item.thumbnail}
                                    alt={item.title}
                                    width={64}
                                    height={64}
                                    className={styles.image}
                                />
                                <div className={styles.itemInfo}>
                                    <h2>{item.title}</h2>
                                    <p className={styles.price}>{item.price} грн</p>
                                    <div className={styles.controls}>
                                        <button onClick={() => decrementProduct(item.id)}>-</button>
                                        <span>{item.qty}</span>
                                        <button onClick={() => incrementProduct(item.id)}>+</button>
                                    </div>
                                </div>
                                <div className={styles.itemTotal}>
                                    {item.price * (item.qty || 1)} грн
                                </div>
                                <button
                                    className={styles.remove}
                                    onClick={() => removeProductFromCart(item.id.toString())}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </section>

                    {/* Підсумок */}
                    <aside className={styles.summary}>
                        <h3>Підсумок</h3>
                        <div className={styles.line}>
                            <span>Сума:</span>
                            <strong>{subtotal} грн</strong>
                        </div>
                        <div className={styles.line}>
                            <span>Доставка:</span>
                            <strong>{shipping === 0 ? 'Безкоштовно' : `${shipping} грн`}</strong>
                        </div>
                        <div className={styles.total}>
                            Разом: <strong>{total} грн</strong>
                        </div>
                        <Link href="/payment" className={styles.checkout}>Оформити замовлення</Link>
                    </aside>
                </div>
            )}
        </main>
    )
}

export default UserCart