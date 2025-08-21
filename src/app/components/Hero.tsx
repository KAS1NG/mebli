'use client';

import Image from 'next/image';
import styles from '../styles/Hero.module.scss';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.bgWrapper}>
                <picture>
                    {/* Картинка для екранів ≤ 880px */}
                    <source
                        media="(max-width: 880px)"
                        srcSet="https://firebasestorage.googleapis.com/v0/b/sicero2-bfcd2.appspot.com/o/mebli%2FChatGPT%20Image%2021%20%D1%81%D0%B5%D1%80%D0%BF.%202025%20%D1%80.%2C%2018_06_59.png?alt=media"
                    />
                    {/* Дефолтна картинка для більших екранів */}
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/sicero2-bfcd2.appspot.com/o/mebli%2FUntitled84_20250821210937.jpg?alt=media"
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
            <a href="/products" className={styles.catalogBtn}>
                <div className={styles.contentBtn}>
                    <span>Переглянути каталог</span>
                    <ChevronRight size={18} />
                </div>
            </a>
        </section>
    );
}
