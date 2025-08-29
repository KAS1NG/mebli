import Image from 'next/image'
import { useState } from 'react';
import { IPost } from '../../types/post';
import { removeCartItem } from '../../actions/removeCartItem';
import { removeFromCart } from '../../utils/CartTest';
import styles from '../../styles/cart/cartItem.module.scss';
import { useCart } from '@/app/context/CartContext';

interface CartItemProps {
  item: IPost
}

const CartItem = ({ item }: CartItemProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { removeProductFromCart } = useCart();

  const handleRemove = async () => {
    setIsLoading(true)
    removeProductFromCart(item.id.toString())
    await removeCartItem(item.id)
    removeFromCart(item.id)
    setIsLoading(false)
  }

  return (
    <div className={styles.item}>
      <div className={styles.image}>
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
      <div className={styles.details}>
        <h3 className={styles.name}>{item.title}</h3>
        <p className={styles.price}>{item.price.toFixed(2)} грн.</p>
        <div className={styles.controls}>
          <label htmlFor={`quantity-${item.id}`}>Кількість:</label>
          <input
            type="number"
            id={`quantity-${item.id}`}
            min="1"
            defaultValue={1}
            className={styles.quantity}
          />
          <button
            onClick={handleRemove}
            className={styles.removeBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : "Видалити"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
