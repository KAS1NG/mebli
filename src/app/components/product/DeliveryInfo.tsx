// import React from 'react';
// import { Truck, RotateCcw, CircleCheckBig, MapPin, Phone } from 'lucide-react';
// import Link from 'next/link';
// import styles from '../../styles/DeliveryInfo.module.scss';

// const DeliveryInfo = () => {
//     return <section
//         className={styles.card}
//         aria-labelledby="delivery-info-title"
//         itemScope
//         itemType="https://schema.org/Offer"
//     >
//         <h2 id="delivery-info-title" className="sr-only">
//             Інформація про умови доставки та повернення
//         </h2>
//         <ul className={styles.list} role="list">
//             <li>
//                 <CircleCheckBig
//                     color='green'
//                     className={styles.icon}
//                     aria-hidden="true"
//                     focusable="false"
//                 />
//                 <span className={styles.available}>В наявності </span>
//             </li>
//             <li>
//                 <MapPin
//                     className={styles.icon}
//                     aria-hidden="true"
//                     focusable="false"
//                 />
//                 <span>Доставка по <strong>Сумській області </strong>
//                     <Link href={"/delivery"} className={styles.returnPolicy}> Про доставку</Link>
//                 </span>
//             </li>
//             <li>
//                 <Truck
//                     className={styles.icon}
//                     aria-hidden="true"
//                     focusable="false"
//                 />
//                 <span>Відправлення з <strong>Ромнів</strong></span>
//             </li>
//             <li>
//                 <RotateCcw
//                     className={styles.icon}
//                     aria-hidden="true"
//                     focusable="false"
//                 />
//                 <span>Повернення протягом 14 днів* <Link href={"/return-policy"} className={styles.returnPolicy} >Політика повернення</Link></span>
//             </li>
//             <li>
//                 <Phone
//                     className={styles.icon}
//                     aria-hidden="true"
//                     focusable="false"
//                 />
//                 <span>Уточнити <strong>
//                         <a href="tel:+380503073436" className={styles.phone}>
//                             +38 050 307 34 36
//                         </a>
//                     </strong>
//                 </span>
//             </li>
//         </ul>
//     </section>
// };

// export default DeliveryInfo;

"use client";

import { motion } from "framer-motion";
import { Truck, RotateCcw, CircleCheckBig, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import styles from "../../styles/DeliveryInfo.module.scss";

const DeliveryInfo = () => {
  const items = [
    {
      icon: <CircleCheckBig className={styles.icon} aria-hidden="true" />,
      text: <span className={styles.available}>В наявності</span>,
    },
    {
      icon: <MapPin className={styles.icon} aria-hidden="true" />,
      text: (
        <span>
          Доставка по <strong>Сумській області</strong>{" "}
          <Link href="/delivery" className={styles.link}>
            Про доставку
          </Link>
        </span>
      ),
    },
    {
      icon: <Truck className={styles.icon} aria-hidden="true" />,
      text: <span>Відправлення з <strong>Ромнів</strong></span>,
    },
    {
      icon: <RotateCcw className={styles.icon} aria-hidden="true" />,
      text: (
        <span>
          Повернення протягом 14 днів*{" "}
          <Link href="/return-policy" className={styles.link}>
            Політика повернення
          </Link>
        </span>
      ),
    },
    {
      icon: <Phone className={styles.icon} aria-hidden="true" />,
      text: (
        <span>
          Уточнити{" "}
          <strong>
            <a href="tel:+380503073436" className={styles.phone}>
              +38 050 307 34 36
            </a>
          </strong>
        </span>
      ),
    },
  ];

  return (
    <motion.section
      className={styles.card}
      aria-labelledby="delivery-info-title"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 id="delivery-info-title" className="sr-only">
        Інформація про доставку та повернення
      </h2>
      <ul className={styles.list} role="list">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            {item.icon}
            {item.text}
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
};

export default DeliveryInfo;


