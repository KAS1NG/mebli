'use client';
import React, { memo } from 'react';
import Link from 'next/link';

interface ProductTagsProps {
  tags: string[];
}

const ProductTags = memo(function ProductTags({ tags }: ProductTagsProps) {
  if (!tags.length) return null;

  return (
    <div className="product-page__tags">
      <strong>Теги: </strong>
      {tags.map((tag) => (
        <Link
          key={tag} // Використовуємо tag як ключ, він повинен бути унікальним
          href={`/products?page=1&query=${encodeURIComponent(tag)}`}
          className="product-page__tag"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
});

ProductTags.displayName = 'ProductTags';

export default ProductTags;
