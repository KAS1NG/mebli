'use client';
import React from 'react';
import styles from '../../styles/DeliveryInfo.module.scss';
import { Truck, RotateCcw, CircleCheckBig, MapPin, Phone } from 'lucide-react';

const DeliveryInfo: React.FC = () => {
    return (
        <section className={styles.card}>
            <ul className={styles.list}>
                <li><CircleCheckBig color='green' className={styles.icon} /><span className={styles.available}>В наявності </span></li>
                <li><MapPin className={styles.icon} /> Доставка по <strong>Сумській області</strong></li>
                <li><Truck className={styles.icon} /> Відправлення з <strong>Ромнів</strong></li>
                <li><RotateCcw className={styles.icon} /> Повернення протягом 30 днів*</li>
                <li><Phone  className={styles.icon} /> Уточнити <strong>+38 050 307 34 36</strong></li>
            </ul>
        </section>
    );
};


export default DeliveryInfo;