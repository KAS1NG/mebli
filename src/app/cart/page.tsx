import UserCart from '../components/cart/UserCart';
import { fetchCart } from '../actions/fetchCart';
import { IPost } from '../types/post';
import EmptyCart from '../components/cart/EmptyCart';

const Cart = async () => {

  const products: IPost[] = await fetchCart();

  if (!products || products.length === 0) {
    return <EmptyCart />;
  }

  const total = products.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return <UserCart products={products} total={total} />;

}

export default Cart;
