import Link from "next/link";
import Image from "next/image";

import { IPreviewPost } from "../types/post";
import { Flame } from "lucide-react";
import { getProductUrl } from "../lib/getProductUrl";
import styles from "../styles/products/ProductCard.module.scss";

interface ProductCardProps {
  product: IPreviewPost;
  index: number
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const URL_LINK = getProductUrl(product.title, product.id)

  const brand = product.brand ?? 0;
  const hasDiscount = brand > 0;
  const discountValue = hasDiscount ? product.price * brand : 0;
  const newPrice = hasDiscount ? product.price - discountValue : product.price;

  return (
    <Link
      href={URL_LINK}
      className={styles.cardLink}
      aria-label={`View details of ${product.title}`}
      style={{ viewTransitionName: `post-image-${product.id}-0` }}
      scroll={true}
    >
      <div className={styles.card} role="link">
        {hasDiscount && (
          <span className={`${styles.label} ${styles.sale}`}>
            <span>Знижка</span> <Flame size={16} aria-hidden="true" />
          </span>
        )}

        <div className={styles.imageWrapper}>
          <Image
            src={product.thumbnail}
            alt={`Купити ${product.title} за ${newPrice || product.price} грн`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 364px"
            className={styles.image}
            priority={index < 3}
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{product.title}</h3>
          {hasDiscount ? (
            <div className={styles.priceWrapper} title={`Економія ${discountValue} грн`}>
              <span className={styles.oldPrice}>{product.price.toLocaleString('uk-UA')} грн</span>
              <span className={styles.newPrice}>{newPrice.toLocaleString('uk-UA')} грн</span>
              <span className={styles.discount}>-{Math.round(brand * 100)}%</span>
            </div>
          ) : (
            <p className={styles.price}>{product.price.toLocaleString('uk-UA')} грн</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;