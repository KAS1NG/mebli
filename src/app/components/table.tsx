import { fetchPosts } from "../api/post/postService";
import ProductCard from "./ProductCard";
import styles from "../styles/products/InvoicesTable.module.scss";
// import { getBlurDataUrl } from "../lib/getBlurDataUrl";

interface IInvoicesTable {
  query: string;
  currentPage: number;
}

export default async function InvoicesTable({ query, currentPage }: IInvoicesTable) {

  const invoices = await fetchPosts(currentPage, query);

  // додаємо blurDataURL
  // const productsWithBlur = await Promise.all(
  //   invoices.map(async (p) => ({
  //     ...p,
  //     blurDataURL: await getBlurDataUrl(p.thumbnail),
  //   }))
  // );

  return (
    <section className={styles.invoicesTable}>
      <div className={styles.grid}>
        {invoices.map((product, index) => (
          <ProductCard key={product.id ?? index} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
