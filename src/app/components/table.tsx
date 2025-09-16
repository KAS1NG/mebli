import React, { Suspense } from "react";
import { fetchPosts } from "../api/post/postService";
import ProductCard from "./ProductCard";
import Preloader from "./Preloader";
import styles from "../styles/products/InvoicesTable.module.scss";
import { getBlurDataUrl } from "../lib/getBlurDataUrl";

interface IInvoicesTable {
  query: string;
  currentPage: number;
}

export default async function InvoicesTable({ query, currentPage }: IInvoicesTable) {
  const limit = 9;
  const invoices = await fetchPosts(currentPage, limit, query);

  // додаємо blurDataURL
  const productsWithBlur = await Promise.all(
    invoices.map(async (p) => ({
      ...p,
      blurDataURL: await getBlurDataUrl(p.thumbnail),
    }))
  );
  
  return (
    <section className={styles.invoicesTable}>
      <Suspense fallback={<Preloader />}>
        <div className={styles.grid}>
          {productsWithBlur.map((product, index) => (
            <ProductCard key={product.id ?? index} product={product} index={index} />
          ))}
        </div>
      </Suspense>
    </section>
  );
}
