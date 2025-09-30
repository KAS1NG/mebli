"use client"

import { categories } from '@/app/lib/constants';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../../styles/Header.module.scss';
import { Flame } from 'lucide-react';

export const Сategories = () => {

    const pathname = usePathname();

    return (
        <div className={styles['categories-wrapper']}>
            <div className={styles.categories}>
                {categories.map((cat) => {
                    const active = pathname === cat.mainUrl;
                    const discount = cat.mainUrl === '/products/znizhky'

                    return (
                        <Link
                            key={cat.href}
                            href={cat.href}
                            className={`
                            ${styles.category} 
                            ${active ? styles.active : ''} 
                            ${discount && active ? styles.discount : ''}
                            ${discount ? styles.discountBasic : ''}
                            `}>
                            {cat.name}
                            {discount && <Flame size={16} aria-hidden="true" />}
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}
