import styles from './styles/home.module.scss';
import { faqSchema } from './lib/constants';
import Script from 'next/script';
import CategoryGrid from './components/CategoryGrid';
import Hero from './components/Hero';

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <HalloweenParticles /> */}
      <main className={styles.main}>
        <section className={styles.featured}>
          <h2>Топ по категоріях</h2>
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
    </>
  );
}
