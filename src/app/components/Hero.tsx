'use client';

import Image from 'next/image';
import styles from '../styles/Hero.module.scss';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

// геловінський пресет
import { Haunted } from 'react-halloween';

export default function Hero() {

    return (
        <section className={styles.hero}>
            <div className={styles.bgWrapper}>
                <picture>
                    {/* <source
                        media="(max-width: 880px)"
                        srcSet="https://firebasestorage.googleapis.com/v0/b/sicero2-bfcd2.appspot.com/o/mebli%2FChatGPT%20Image%2021%20%D1%81%D0%B5%D1%80%D0%BF.%202025%20%D1%80.%2C%2018_06_59.png?alt=media"
                    />
                    <Image
                        src="https://res.cloudinary.com/dnwcmqbtm/image/upload/v1756537502/%D1%84%D0%BE%D0%BD_%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BD%D0%B0_w2h2ow.jpg"
                        alt="Роменський Меблевий Комбінат"
                        fill
                        quality={100}
                        className={styles.bgImage}
                        priority
                    /> */}
                    <source
                        media="(max-width: 880px)"
                        srcSet="/halloween-mobile.png"
                    />
                    <Image
                        src="/halloween.jpg" // ✅ шлях від кореня сайту
                        alt="Роменський Меблевий Комбінат"
                        fill
                        quality={100}
                        className={styles.bgImageHelloween}
                        priority
                    />
                </picture>
            </div>

            <div className={styles.sign}>
                <h1 className={styles.sign__title}>
                    <span>Знижки до 31 жовтня</span>
                    <div>Happy halloween</div>
                </h1>
            </div>
            {/* <h1 className={styles.title}>
                <span>Роменський</span><div>МЕБЛЕВИЙ КОМБІНАТ</div>
            </h1> */}
            <div className={styles.catalogBtn}>
                <Link href="/products"  >
                    <Haunted 
                    creatureOptions={{ numberOf: 5, distance: 200 }}
                        glowOptions={{
                            boxShadowOn: 'none',
                            boxShadowOff: 'none',
                        }}>
                        <div className={styles.contentBtn}>
                            <span>До каталогу</span>
                            <ChevronRight size={18} />
                        </div>
                    </Haunted>
                </Link>
            </div>
            {/* <Link href="/products" className={styles.catalogBtn}>
                    <div className={styles.contentBtn}>
                        <span>До каталогу</span>
                        <ChevronRight size={18} />
                    </div>
            </Link> */}
        </section>
    );
}
