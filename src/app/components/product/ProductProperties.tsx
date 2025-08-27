'use client';

import React, { memo, useCallback } from 'react';
import { IGetProperty } from '../../types/post';
import { removeProperty } from '../../actions/removeProperty';
import style from '../../styles/product/ProductProperties.module.scss'

interface ProductPropertiesProps {
  properties: IGetProperty[];
  isAdmin: boolean;
}

const ProductProperties = memo(function ProductProperties({ properties, isAdmin }: ProductPropertiesProps) {
  // Створюємо функцію, яка повертає обробник видалення для конкретного id
  const handleRemove = useCallback(
    (id: number) => () => {
      removeProperty(id);
    },
    []
  );

  if (!properties?.length) return null;

  return (
    <div className={style.details}>
      {properties.map((item) => (
        <p key={item.id}>
          <strong>{item.name}:</strong> {item.text}
          {isAdmin && (
            <button
              aria-label={`Видалити властивість ${item.name}`}
              onClick={handleRemove(item.id)}
            >
              ✕
            </button>
          )}
        </p>
      ))}
    </div>
  );
});

ProductProperties.displayName = 'ProductProperties';

export default ProductProperties;
