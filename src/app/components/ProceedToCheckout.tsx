'use client';

import React, { useState } from 'react';
import '@/app/styles/checkout.scss'
import { IPost } from '../types/post';

interface CheckoutItem {
  name: string;
  price: number;
  quantity: number;
}

const ProceedToCheckout = ({ products }: { products: IPost[] }) => {


  // Стани для форм
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');

  // Демо-товари для замовлення
  const items: CheckoutItem[] = [
    { name: 'Product 1', price: 50, quantity: 2 },
    { name: 'Product 2', price: 30, quantity: 1 },
  ];

  // Загальна сума
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Функція для підтвердження замовлення
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order confirmed!'); // Можна додати інші дії, наприклад, інтеграцію з API
  };

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

      {/* Форма для доставки та оплати */}
      <form className="checkout-page__form" onSubmit={handleSubmit}>
        {/* Форма для доставки */}
        <div className="checkout-page__section">
          <h3>Інформація про покупця</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ім'я"
            required
          />
          <input
            type="Email"
            placeholder="Емайл"
            required
          />
          <input
            type="tel"
            placeholder="Телефон"
            required
          />
          {/* <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
          />
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Postal Code"
            required
          /> */}
        </div>

        {/* Форма для оплати */}
        {/* <div className="checkout-page__section">
          <h3>Payment Information</h3>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Card Number"
            required
          />
          <input
            type="text"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            placeholder="Expiration Date (MM/YY)"
            required
          />
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="CVV"
            required
          />
        </div> */}

        {/* Кнопка для підтвердження */}
        <button type="submit" className="checkout-page__btn">
          Підтвердити замовлення
        </button>
      </form>
    </div>
  );
};

export default ProceedToCheckout;
