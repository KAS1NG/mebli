import Image from 'next/image';
import styles from './styles/home.module.scss';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Ласкаво просимо до нашого меблевого магазину</h1>
        <p className={styles.subtitle}>
          Стильні та якісні меблі для вашого дому та офісу
        </p>
        <a href="/products" className={styles.button}>Переглянути каталог</a>
      </section>

      <section className={styles.featured}>
        <h2>Популярні товари</h2>
        <div className={styles.products}>
          <div className={styles.productCard}>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/sicero-9aa5f.appspot.com/o/8ca1b6e1-0765-4e00-b575-c75ed5bfc1e4.png?alt=media"
              alt="Великий диван"
              width={300}
              height={200}
              quality={90}
              loading="lazy"
              placeholder="blur"
              blurDataURL="/images/wardrobe-blur.jpg"
            />
            <h3>Зручні дивани</h3>
            <p>Ціна: від 10 000 грн</p>
          </div>
          <div className={styles.productCard}>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/sicero-9aa5f.appspot.com/o/3611e007-0bc9-4c1d-9e48-33e50b310cbb.png?alt=media"
              alt="Сучасті стільці"
              width={300}
              height={200}
              quality={90}
              loading="lazy"
              placeholder="blur"
              blurDataURL="/images/wardrobe-blur.jpg"
            />
            <h3>Сучасні стільці</h3>
            <p>Ціна: від 2 500 грн</p>
          </div>
          <div className={styles.productCard}>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/sicero-9aa5f.appspot.com/o/0d1adbb4-f08d-40a7-89e7-211b74705ae3.png?alt=media"
              alt="Великі шафи"
              width={300}
              height={200}
              quality={90}
              loading="lazy"
              placeholder="blur"
              blurDataURL="/images/wardrobe-blur.jpg"
            />
            <h3>Великі шафи</h3>
            <p>Ціна: від 15 000 грн</p>
          </div>
        </div>
      </section>

      <section className={styles.about}>
        <h2>Про нас</h2>
        <p>
          Ми пропонуємо великий вибір меблів від перевірених виробників. Якість, стиль та доступні ціни — наші головні переваги.
        </p>
      </section>
    </main>
  );
}
