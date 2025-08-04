import '@/app/styles/home.scss'

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <h1 className="title">Ласкаво просимо до нашого меблевого магазину</h1>
        <p className="subtitle">
          Стильні та якісні меблі для вашого дому та офісу
        </p>
        <a href="/products" className="button">Переглянути каталог</a>
      </section>
      <section className="featured">
        <h2>Популярні товари</h2>
        <div className="products">
          <div className="productCard">
            <img src="/images/sofa.jpg" alt="Зручний диван" />
            <h3>Зручний диван</h3>
            <p>Ціна: 10 000 грн</p>
          </div>
          <div className="productCard">
            <img src="/images/chair.jpg" alt="Сучасний стілець" />
            <h3>Сучасний стілець</h3>
            <p>Ціна: 2 500 грн</p>
          </div>
          <div className="productCard">
            <img src="/images/wardrobe.jpg" alt="Велика шафа" />
            <h3>Велика шафа</h3>
            <p>Ціна: 15 000 грн</p>
          </div>
        </div>
      </section>
      <section className="about">
        <h2>Про нас</h2>
        <p>
          Ми пропонуємо великий вибір меблів від перевірених виробників. Якість, стиль та доступні ціни — наші головні переваги.
        </p>
      </section>
    </main>
  );
}
