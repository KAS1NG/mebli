'use client';
import React from 'react';
import styles from '../../styles/DeliveryInfo.module.scss';
import { Truck, RotateCcw, CircleCheckBig, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

const DeliveryInfo: React.FC = () => {
    return (
        <section className={styles.card}>
            <ul className={styles.list}>
                <li><CircleCheckBig color='green' className={styles.icon} /><span className={styles.available}>В наявності </span></li>
                <li><MapPin className={styles.icon} /> Доставка по <strong>Сумській області</strong></li>
                <li><Truck className={styles.icon} /> Відправлення з <strong>Ромнів</strong></li>
                <li>
                    <RotateCcw className={styles.icon} />
                    <span>Повернення протягом 14 днів* <Link href={"/return-policy"} className={styles.returnPolicy} >Політика повернення</Link></span>
                </li>
                <li><Link href={"/return-policy"} className={styles.returnPolicy} >Політика повернення</Link></li>
                <li><Phone className={styles.icon} /> Уточнити <strong>
                    <a href="tel:+380503073436" className={styles.phone}>
                        +38 050 307 34 36
                    </a>
                </strong></li>
            </ul>
        </section>
    );
};


export default DeliveryInfo;