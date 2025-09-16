"use client";

import React from "react";
import styles from "../styles/ProductSkeleton.module.scss";

export default function ProductPageSkeleton() {
  return (
    <div className={styles.wrapper} role="status" aria-label="Завантаження товару">
      <div className={styles.slider} />
      <div className={styles.details}>
        <div className={styles.title} />
        <div className={styles.price} />
        <div className={styles.actions}>
          <div className={styles.btn} />
          <div className={styles.btn} />
        </div>
        <div className={styles.text} />
        <div className={styles.text} />
        <div className={styles.textLong} />
      </div>
    </div>
  );
}
