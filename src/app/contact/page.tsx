'use client'
import React, { useState } from 'react';
import '@/app/styles/contact.scss'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Обробка відправлення форми (API, email і т.д.)
  };

  return (
      <main className="contact">
        <section className="contact__hero">
          <h1 className="contact__title">Напишіть Нам</h1>
          <p className="contact__description">
          Ми будемо раді почути від вас! Не соромтеся зв&apos;язатися з нами, якщо у вас виникли запитання щодо наших продуктів, вам потрібна допомога чи просто хочете залишити відгук.
          </p>
        </section>
        <section className="contact__form-section">
          <h2 className="contact__heading">Зв&apos;яжіться з нами</h2>
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <label htmlFor="name">Ім&apos;я</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="email">Емайл</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="message">Повідомлення</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="contact__submit">Відправити Повідомлення</button>
          </form>
        </section>
      </main>
  );
};

export default Contact;
