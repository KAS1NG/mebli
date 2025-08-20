import styles from './styles/home.module.scss';
import { faqSchema } from './lib/constants';
import Script from 'next/script';
import CategoryGrid from './components/CategoryGrid';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Роменський меблевий комбінат</h1>
        <p className={styles.subtitle}>
          Стильні та якісні меблі для вашого дому та офісу
        </p>
        <a href="/products" className={styles.button}>Переглянути каталог</a>
      </section>

      <section className={styles.featured}>
        <h2>Популярні товари</h2>
        <CategoryGrid />
      </section>

      <section className={styles.about}>
        <h2>Про нас</h2>
        <p>
          Ми пропонуємо великий вибір меблів від перевірених виробників. Якість, стиль та доступні ціни — наші головні переваги.
        </p>
      </section>
      <Script
        id="json-ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </main>
  );
}
