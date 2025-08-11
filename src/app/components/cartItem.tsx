import React, { useState } from 'react';
import { IPost } from '../types/post';
import { removeCartItem } from '../actions/removeCartItem';
import Image from 'next/image'
import { removeFromCart } from '../utils/CartTest';

interface CartItemProps {
  item: IPost
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {

  const [isLoading, setIsLoading] = useState(false)

  const handleRemove = async () => {
    setIsLoading(true)

    await removeCartItem(item.id)
    removeFromCart(item.id)
    setIsLoading(false)
  }

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <Image
          src={item.images[0]}
          alt={item.title}
          layout="responsive"     // The image will scale responsively based on the container width 
          width={400}
          height={300}
          quality={90}
          loading="lazy"
          placeholder="blur"
          blurDataURL="/images/wardrobe-blur.jpg"            // Aspect ratio (can be set arbitrarily)
        />
      </div>
      <div className="cart-item__details">
        <h3 className="cart-item__name">{item.title}</h3>
        <p className="cart-item__price">{item.price.toFixed(2)} грн.</p>
        <div className="cart-item__controls">
          <label htmlFor={`quantity-${item.id}`}>Кількість:</label>
          <input
            type="number"
            id={`quantity-${item.id}`}
            min="1"
            defaultValue={1}
            // onChange={(e) => onQuantityChange(item.id, Number(e.target.value))}
            className="cart-item__quantity"
          />
          <button
            onClick={handleRemove}
            className="cart-item__remove-btn"
            disabled={isLoading}
          >
            <div>
              {isLoading ? 'Loading...' : "Видалити"}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
