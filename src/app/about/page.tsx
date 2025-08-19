import React from 'react';
import '@/app/styles/about.scss'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Меблі Ромни | Про нас',
  openGraph: {
    title: 'Про нас',
  },
  alternates: {
    languages: {
      'uk-UA': '/uk-UA',  // Українська
    },
  },
};

const About: React.FC = () => {

  return (
    <main className="about">
      <section className="about__hero">
        <h1 className="about__title">Про нас</h1>
        <p className="about__description">
          Ласкаво просимо до Mebli Romny! Ми прагнемо пропонувати високоякісні меблі, які відповідають вашому стилю життя та потребам.
        </p>
      </section>
      <section className="about__content">
        <h2 className="about__heading">Наша місія</h2>
        <p>
          Наша місія полягає в тому, щоб запропонувати красиві та міцні меблі, які покращують ваш житловий простір. Ми прагнемо запропонувати вам найкращий дизайн, функціональність і якість.
        </p>
        <h2 className="about__heading">Наша історія</h2>
        <p>
          Ми засновані у 2020 році, виросли із невеликого місцевого підприємства до онлайн-магазину меблів із глобальним охопленням. Наша пристрасть до майстерності та задоволення клієнтів є наріжним каменем нашого зростання.
        </p>
      </section>
    </main>
  );
};

export default About;
