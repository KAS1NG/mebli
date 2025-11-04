'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import styles from '../../styles/Header.module.scss';

import type { Session } from 'next-auth';
import { ICategory } from '@/app/types/post';
import { useCart } from '@/app/context/CartContext';
import CartHoverModal from '../cart/CartHoverModal';
import { usePathname } from 'next/navigation';

interface Props {
    session: Session | null;
    isAdmin: boolean;
    categories: ICategory[];
}

export default function HeaderClient({ session, isAdmin }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartItems } = useCart(); // client-only cart context

    const pathname = usePathname();

    useEffect(() => {
        // кожного разу при зміні сторінки стан змінюється на false
        setMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <nav className={`${styles.nav} ${menuOpen ? styles.active : ''}`}>
                <Link href="/gallery">Арт галерея</Link>
                <Link href="/about">Про нас</Link>
                <Link href="/contact">Контакти</Link>

                {session ?
                    <button className={styles.signout} onClick={() => signOut()}>
                        Вийти
                    </button> :
                    <Link href="/auth/login">Вхід</Link>}

                {isAdmin && <Link href="/admin/product/create">Створити</Link>}
            </nav>

            <div className={styles.right}>
                <button
                    className={styles.burger}
                    aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
                    onClick={() => setMenuOpen((s) => !s)}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <Link href="/cart" className={styles.cart}>
                    <CartHoverModal products={cartItems} />
                </Link>
            </div>
        </>
    );
}