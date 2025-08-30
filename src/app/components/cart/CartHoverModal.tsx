'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/cart/CartHoverModal.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { IPreviewPost } from '@/app/types/post';

export default function CartHoverModal({ products }: { products: IPreviewPost[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading] = useState(false);
    const closeTimeout = useRef<NodeJS.Timeout | null>(null);

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

  
        const groupedProducts: IPreviewPost[] = products.reduce((acc: IPreviewPost[], item) => {
            const existingItem = acc.find((p) => p.id === item.id);
            if (existingItem) {
                existingItem.qty = (existingItem.qty || 1) + (item.qty || 1);
            } else {
                acc.push({ ...item, qty: item.qty || 1 });
            }
            return acc;
        }, []);

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
                                        {groupedProducts.map((item) => (
                                            <li key={item.id} className={styles.item}>
                                                <div className={styles.imageWrapper}>
                                                    <Image
                                                        src={item.thumbnail}
                                                        alt={item.title}
                                                        width={64}
                                                        height={64}
                                                        className={styles.image}
                                                    />
                                                </div>
                                                <div>
                                                    <p>{item.title}</p>
                                                    <span>
                                                        {item.price.toLocaleString('uk-UA')} грн × {item.qty}
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
