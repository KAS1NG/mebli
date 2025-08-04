import '@/app/styles/cart.scss';
import UserCart from '../components/UserCart';
import { fetchCart } from '../actions/fetchCart';
import EmptyCart from '../components/EmptyCart';

const Cart = async () => {

  const products = await fetchCart();

  if (!products || products.length === 0) {
    return <EmptyCart />
  }

  return <UserCart products={products} />;
};

export default Cart;
