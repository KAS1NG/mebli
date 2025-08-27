'use client';
import React, { memo } from 'react';
import Link from 'next/link';
import style from '../../styles/product/ProductTags.module.scss'

interface ProductTagsProps {
  tags: string[];
}

const ProductTags = memo(function ProductTags({ tags }: ProductTagsProps) {
  if (!tags.length) return null;

  return (
    <div className={style.tags}>
      <strong>Теги: </strong>
      {tags.map((tag) => (
        <Link
          key={tag} // Використовуємо tag як ключ, він повинен бути унікальним
          href={`/products?page=1&query=${encodeURIComponent(tag)}`}
          className={style.tag}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
});

ProductTags.displayName = 'ProductTags';

export default ProductTags;
