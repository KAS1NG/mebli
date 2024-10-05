import React from 'react'
import ProceedToCheckout from '../components/ProceedToCheckout'
import { fetchCart } from '../actions/fetchCart';

async function page() {
  const products = await fetchCart();

  return (
    <ProceedToCheckout products={products} />
  )
}

export default page