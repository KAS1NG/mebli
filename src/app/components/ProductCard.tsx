import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { IPost } from '../types/post';
import { transliterateAndClear } from '../utils/clearUrlString';

interface ProductCardProps {
  product: IPost;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  return (
    <Link href={`/products/${transliterateAndClear(product.title)}/${product.id}`} passHref>
      <div className="product-card" role="link" aria-label={`View details of ${product.title}`}>

        <figure className="product-card__figure">
          <div className="product-card__image-wrapper">
            <Image
              src={product.images[0]}
              alt={`Image of ${product.title}`}
              layout="fill"  // This makes the image fill its container
              objectFit="cover"  // Ensures that the image covers the container without distortion
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="product-card__image"
              priority={false}
            />
          </div>
          {/* <figure className="product-card__figure">
          <Image
            src={product.images[0]}
            alt={`Image of ${product.title}`}
            layout="responsive"     // The image will scale responsively based on the container width
            width={4}              // Aspect ratio (can be set arbitrarily)
            height={3}              // Aspect ratio (can be set arbitrarily)
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // sizes: визначає розмір зображення залежно від ширини вікна перегляду. У цьому випадку зображення матиме:
            // 100vw(повна ширина вікна перегляду) на екранах менше 768 пікселів,
            // 50vw(половина ширини вікна перегляду) для екранів до 1200 пікселів,
            // 33vw(одна третина ширини вікна перегляду) на великих екранах.
            className="product-card__image"
            priority={false}  // Set `true` if this image is critical to the page load
            // placeholder="blur" // You can also use a blur placeholder for better UX
            // blurDataURL={product.images[0]} // Use a low-quality image as a blur placeholder
          /> */}
          <figcaption className="product-card__caption">
            <h3 className="product-card__name">{product.title}</h3>
            <p className="product-card__price">від {product.price} ₴</p>
          </figcaption>
        </figure>
      </div>
    </Link >
  );
};

export default ProductCard;
