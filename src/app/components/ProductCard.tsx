import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { IPreviewPost } from '../types/post';
import { transliterateAndClear } from '../utils/clearUrlString';

interface ProductCardProps {
  product: IPreviewPost;
  index: number
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const URL_LINK = `/products/${transliterateAndClear(product.title)}/${product.id}`

  return (
    <Link
      href={URL_LINK}
      passHref
      className="product-card"
      aria-label={`View details of ${product.title}`}
      prefetch={true}
      style={{ viewTransitionName: `post-image-${product.id}-0` }} // унікальне ім’я
    >
      <figure className="product-card__figure">
        <div className="product-card__image-wrapper">
          <Image
            src={product.thumbnail}
            alt={`Image of ${product.title}`}
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="product-card__image"
            priority={true}
          />
        </div>
        <figcaption className="product-card__caption">
          <h3 className="product-card__name">{product.title}</h3>
          <p className="product-card__price">від {product.price} ₴</p>
        </figcaption>
      </figure>
    </Link >
  );
};

export default ProductCard;
