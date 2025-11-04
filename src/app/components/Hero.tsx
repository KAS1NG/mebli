'use client';

import Image from 'next/image';
import styles from '../styles/Hero.module.scss';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {

    return (
        <section className={styles.hero}>
            <div className={styles.bgWrapper}>
                <picture>
                    <source
                        media="(max-width: 880px)"
                        srcSet="https://res.cloudinary.com/dnwcmqbtm/image/upload/v1762240597/33606e21-fecf-4b21-8f45-1ea7c4182491.webp"
                    />
                    <Image
                        src="https://res.cloudinary.com/dnwcmqbtm/image/upload/v1762240598/19df9d0c-7bac-4f36-9b13-fbefa4ef19a7.webp"
                        alt="Роменський Меблевий Комбінат"
                        fill
                        quality={100}
                        className={styles.bgImage}
                        priority
                    />
                </picture>
            </div>
            <h1 className={styles.title}>
                <span>Роменський</span><div>МЕБЛЕВИЙ КОМБІНАТ</div>
            </h1>
            <Link href="/products" className={styles.catalogBtn}>
                    <div className={styles.contentBtn}>
                        <span>До каталогу</span>
                        <ChevronRight size={18} />
                    </div>
            </Link>
        </section>
    );
}
