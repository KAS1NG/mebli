'use client';

import React, { useState } from 'react';
import { IPost } from '../types/post';
import { makeOrder } from '../actions/checkout';
import { useRouter } from 'next/navigation';
import { clearCart } from '../utils/CartTest';
import '@/app/styles/checkout.scss'

const ProceedToCheckout = ({ products }: { products: IPost[] }) => {

  const router = useRouter()

  const [showToast, setShowToast] = useState(false);

  const confirmOrder = () => {
    setShowToast(true);

    // Автоматично ховаємо через 3 сек
    setTimeout(() => {
      setShowToast(false);
      router.push('/products')
    }, 3000);
  };

  const credentialsAction = async (formData: FormData) => {
    products.map((item) => (
      formData.append("postsID", `${item.id}`)
    ))
    formData.append("orderType", "True")
    
    await makeOrder(formData);
    // очищення cookie
    confirmOrder()
    clearCart()
  }

  return (
    <div className="checkout-page">
      <h2>Оформлення замовлення</h2>

      {/* Відображення інформації про замовлення */}
      <div className="checkout-page__order-summary">
        <h3>Ваше замовлення</h3>
        <ul>
          {products.map((item, index) => (
            <li key={index}>
              {item.title} - ${item.price}
            </li>
          ))}
        </ul>
        {/* <p className="checkout-page__total">Total: ${total}</p> */}
      </div>
      <form action={credentialsAction} className="checkout-page__form">
        <div className="checkout-page__section">
          <h3>Інформація про покупця</h3>
          <input
            type="text"
            name='name'
            id='name'
            placeholder="Ім'я"
            required
          />
          <input
            type="Email"
            name='email'
            id='email'
            placeholder="Емайл"
            required
          />
          <input
            type="tel"
            name='phoneNumber'
            id='phoneNumber'
            placeholder="Телефон"
            required
          />
        </div>
        <button type="submit" className="checkout-page__btn">
          Підтвердити замовлення
        </button>
      </form>

       {showToast && (
        <div className="toast-message">
          Дякуємо за замовлення!
        </div>
      )}
    </div>
  );
};

export default ProceedToCheckout;
