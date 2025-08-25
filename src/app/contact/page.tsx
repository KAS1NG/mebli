// app/contacts/page.tsx
"use client";

import React from "react";
import "../styles/contact.scss";

export default function ContactsPage() {
  return (
    <section className="contacts">
      <div className="container">
        <h1 className="contacts__title">Контакти</h1>
        <p className="contacts__intro">
          Зв’яжіться з нами будь-яким зручним способом.
          Ми завжди готові допомогти з вибором меблів, оформленням замовлення чи консультацією.
        </p>

        <div className="contacts__block">
          <h2>Наші телефони</h2>
          <ul>
            <li><a href="tel:+380501234567">+38 (050) 307-34-36</a></li>
            <li><a href="tel:+380971234567">+38 (096) 811-99-76</a></li>
          </ul>
        </div>

        <div className="contacts__block">
          <h2>Електронна пошта</h2>
          <p>
            Для запитань та співпраці пишіть на адресу:
            <a href="mailto:info@romen-mebli.com">mebelshuk@gmail.com</a>
          </p>
        </div>

        <div className="contacts__block">
          <h2>Адреса магазину</h2>
          <p>
            м. Ромни, 1-й провулок Свободи, 10
            (пн–пт: 9:00–18:00, сб: 10:00–15:00)
          </p>
        </div>

        <div className="contacts__block">
          <h2>Форма зворотного зв’язку</h2>
          <form className="contacts__form">
            <input type="text" placeholder="Ваше ім’я" required />
            <input type="email" placeholder="Ваш email" required />
            <textarea placeholder="Ваше повідомлення" rows={4} required></textarea>
            <button type="submit">Надіслати</button>
          </form>
        </div>

        <div className="contacts__note">
          <p>
            Ми відповідаємо на всі повідомлення протягом <strong>1 робочого дня</strong>.
            Дякуємо, що обираєте Роменський меблевий комбінат!
          </p>
        </div>
      </div>
    </section>
  );
}
