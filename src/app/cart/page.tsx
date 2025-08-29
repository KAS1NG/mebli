import UserCart from '../components/cart/UserCart';

const Cart = async () => {

  // const products: IPost[] = await fetchCart();

  // if (!products || products.length === 0) {
  //   return <EmptyCart />;
  // }

  // const total = products.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return <UserCart 
  // products={products} 
  // total={total} 
  />;

}

export default Cart;
