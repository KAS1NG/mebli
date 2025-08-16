import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { IPost } from '../types/post';
import { transliterateAndClear } from '../utils/clearUrlString';

interface ProductCardProps {
  product: IPost;
  index: number
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {

  const URL_LINK = `/products/${transliterateAndClear(product.title)}/${product.id}`

  return (
    <Link
      href={URL_LINK}
      passHref
      className="product-card"
      aria-label={`View details of ${product.title}`}
      prefetch={true}
    >
      <figure className="product-card__figure">
        <div className="product-card__image-wrapper">
          <Image
            src={product.images[0]}
            alt={`Image of ${product.title}`}
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="product-card__image"
            priority={index < 3}
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
