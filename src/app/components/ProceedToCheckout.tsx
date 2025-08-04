'use client';

import React from 'react';
import { IPost } from '../types/post';
import { makeOrder } from '../actions/checkout';
import { useRouter } from 'next/navigation';
import '@/app/styles/checkout.scss'
import { clearCart } from '../utils/CartTest';

const ProceedToCheckout = ({ products }: { products: IPost[] }) => {

  const router = useRouter()

  // Стани для форм
  // const [name, setName] = useState('');

  // Загальна сума
  // const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Функція для підтвердження замовлення
  // const credentialsAction = async (formData: FormData) => {
  //   const title = formData.get("title") as string
  //   const price = formData.get("price") as string
  //   const description = formData.get("description") as string
  //   const color = formData.get("colors") as string
  //   const tag = formData.get("tags") as string
  //   const brand = formData.get("brand") as string

  //   const tags = tag.toLowerCase()

  //   formData.delete("title")
  //   formData.delete("price")
  //   formData.delete("description")
  //   formData.delete("colors")
  //   formData.delete("tags")
  //   formData.delete("brand")

  //   formData.append('data', new Blob([JSON.stringify(
  //     { title, price, description, color, tags, brand }
  //   )], { type: 'application/json' }));

  //   await checkout(formData, accessToken || null);
  //   router.push('/products?page=1')
  // }

  const credentialsAction = async (formData: FormData) => {

    products.map((item) => (
      formData.append("postsID", `${item.id}`)
    ))
    formData.append("orderType", "True")

    await makeOrder(formData);
    //очищення cookie
    clearCart()
    router.push('/products?page=1')
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
    </div>
  );
};

export default ProceedToCheckout;
