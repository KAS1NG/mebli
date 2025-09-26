"use client"

import { categories } from '@/app/lib/constants';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../../styles/Header.module.scss';

export const Сategories = () => {

    const pathname = usePathname();

    return (
        <div className={styles['categories-wrapper']}>
            <div className={styles.categories}>
                {categories.map((cat) => {
                    const active = pathname === cat.mainUrl;
                    return (
                        <Link
                            key={cat.href}
                            href={cat.href}
                            className={`${styles.category} ${active ? styles.active : ''}`}
                        >
                            {cat.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}
