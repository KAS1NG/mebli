import React, { useState } from 'react';
import { IPost } from '../types/post';
import { removeCartItem } from '../actions/removeCartItem';
import Image from 'next/image';

interface CartItemProps {
  item: IPost
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {

  const [isLoading, setIsLoading] = useState(false)

  const handleRemove = async () => {
    setIsLoading(true)
    await removeCartItem(item.id)
    setIsLoading(false)
  }

  return (
    <div className="cart-item">
      <Image
        src={item.images[0]}
        alt={item.title}
        className="cart-item__image"
        layout="responsive"     // The image will scale responsively based on the container width
        width={4}              // Aspect ratio (can be set arbitrarily)
        height={3}              // Aspect ratio (can be set arbitrarily)
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="cart-item__details">
        <h3 className="cart-item__name">{item.title}</h3>
        <p className="cart-item__price">${item.price.toFixed(2)}</p>
        <div className="cart-item__controls">
          <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
          <input
            type="number"
            id={`quantity-${item.id}`}
            min="1"
            // onChange={(e) => onQuantityChange(item.id, Number(e.target.value))}
            className="cart-item__quantity"
          />
          <button
            onClick={handleRemove}
            className="cart-item__remove-button"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Remove'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
