'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/cart/CartHoverModal.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { IPost } from '@/app/types/post';

export default function CartHoverModal({ products }: { products: IPost[] }) {
    const [isOpen, setIsOpen] = useState(false);
    // const [items, setItems] = useState<IPost[] | null>(null);
    const [loading] = useState(false);
    const closeTimeout = useRef<NodeJS.Timeout | null>(null);

    // useEffect(() => {
    //     if (isOpen && items === null) {
    //         setLoading(true);
    //         async function f1() {
    //             const products: IPost[] = await fetchCart();
    //             setItems(products);
    //             setLoading(false);
    //         }
    //         f1()
    //     }
    // }, [isOpen]);

    // useEffect(() => {
    //     if (isOpen && items === null) {
    //         setLoading(true);
    //         setItems(products)
    //         setLoading(false);
    //     }
    // }, [isOpen, products]);

    const handleMouseEnter = () => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
            closeTimeout.current = null;
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => {
            setIsOpen(false);
        }, 180); // 🔹 невелика затримка закриття
    };

    return (
        <div
            className={styles.wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* click для мобільних */}
            <button
                className={styles.iconBtn}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className={styles.cartIcon}>{products.length !== 0 && products.length} 🛒 Кошик</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        {loading ? (
                            <div className={styles.loader}>
                                <div className={styles.skeleton}></div>
                                <div className={styles.skeleton}></div>
                            </div>
                        ) : products && products.length > 0 ? (
                            <>
                                <ul className={styles.list}>
                                    {products.map((item) => (
                                        <li key={item.id} className={styles.item}>
                                            <div className={styles.imageWrapper}>
                                                <Image
                                                    src={item.images[0]}
                                                    alt={item.title}
                                                    width={64}
                                                    height={64}
                                                    className={styles.image}
                                                />
                                            </div>
                                            <div>
                                                <p>{item.title}</p>
                                                <span>
                                                    {/* {item.price.toLocaleString('uk-UA')} ₴ × {item.qty} */}
                                                    {item.price.toLocaleString('uk-UA')} ₴ × {1}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/cart" className={styles.cartBtn}>
                                    Перейти в кошик
                                </Link>
                            </>
                        ) : (
                            <p className={styles.empty}>Кошик порожній</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
