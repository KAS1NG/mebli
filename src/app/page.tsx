import '@/app/styles/home.scss'

export default function Home() {
  return (
    <main className="home">
      {/* Вітальний банер */}
      <section className="home__banner">
        <h1 className="home__title">Welcome to Furniture Store</h1>
        <p className="home__subtitle">Discover premium quality furniture for your home and office</p>
      </section>

      {/* Популярні продукти */}
      {/* <section className="home__products">
          <h2 className="home__section-title">Popular Products</h2>
          <div className="home__product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section> */}
    </main>
  );
}
