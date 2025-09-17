"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { IPreviewPost } from "../types/post";
import { transliterateAndClear } from "../utils/clearUrlString";
import { Flame } from "lucide-react";
import styles from "../styles/products/ProductCard.module.scss";

interface ProductCardProps {
  product: IPreviewPost;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const URL_LINK = `/products/${transliterateAndClear(product.title)}/${product.id}`;

  console.log(`${product.title} ${product.brand == 0} ${!product.brand}`)

  return (
    <Link
      href={URL_LINK}
      passHref
      className={styles.cardLink}
      aria-label={`View details of ${product.title}`}
      style={{ viewTransitionName: `post-image-${product.id}-0` }}
    >
      <div className={styles.card}>
        {product.brand && product.brand != 0 &&
          <span className={`${styles.label} ${styles.sale}`} data-tooltip="Економія 200 грн"
            title={`Економія ${product.price * product.brand} грн`}>
            <span>Знижка</span> <Flame size={16} />
          </span>
        }

        <div className={styles.imageWrapper}>
          <Image
            src={product.thumbnail}
            alt={`Image of ${product.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={product.blurDataURL}
            className={styles.image}
            priority
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{product.title}</h3>
          {product.brand == 0 && <p className={styles.price}>{product.price} грн</p>}
          {!product.brand && <p className={styles.price}>{product.price} грн</p>}
          {product.brand && product.brand != 0 &&
            <div className={styles.priceWrapper}
              title={`Економія ${product.price * product.brand} грн`}
            >
              <span className={styles.oldPrice}>{product.price} грн</span>
              <span className={styles.newPrice}>{product.price - product.price * product.brand} грн</span>
              {product.price && (
                <span className={styles.discount}>
                  -{Math.round(product.brand * 100)}%
                </span>
              )
              }
            </div>}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

