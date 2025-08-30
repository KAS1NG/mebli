import Image from 'next/image'
import { IPreviewPost } from '../../types/post';
import { removeFromCart } from '../../utils/CartTest';
import styles from '../../styles/cart/cartItem.module.scss';
import { useCart } from '@/app/context/CartContext';

interface CartItemProps {
  item: IPreviewPost
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeProductFromCart } = useCart();

  const handleRemove = () => {
    removeProductFromCart(item.id.toString())
    removeFromCart(item.id)
  }

  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <Image
          src={item.thumbnail}
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
            defaultValue={item.qty}
            className={styles.quantity}
          />
          <button
            onClick={handleRemove}
            className={styles.removeBtn}
          >
            {"Видалити"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
