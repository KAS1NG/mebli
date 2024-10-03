import '@/app/styles/cart.scss';
import { fetchCart } from '../actions/fetchCart';
import UserCart from '../components/UserCart';

const Cart = async () => {
  const products = await fetchCart();

  // Check if cart is empty and return early if true
  if (!products || products.length === 0) {
    return <p className='emptyBlock'>Ваша корзина покищо порожня.</p>;
  }

  // // Render user cart with products
  return <UserCart products={products} />;
};

export default Cart;
