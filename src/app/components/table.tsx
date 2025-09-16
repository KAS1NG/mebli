// import { Suspense } from "react";
// import { fetchPosts } from "../api/post/postService";
// import ProductCard from "./ProductCard";
// import Preloader from "./Preloader";

// interface IInvoicesTable {
//     query: string
//     currentPage: number
// }

// export default async function InvoicesTable({ query, currentPage}: IInvoicesTable) {

//     const limit = 9

//     const invoices = await fetchPosts(currentPage, limit, query);

//     return (
//         <Suspense fallback={<Preloader />}>
//             <section className="products__grid">
//                 {invoices.map((product, index) =>
//                     <ProductCard
//                         key={index}
//                         product={product}
//                         index={index}
//                     />
//                 )}
//             </section>
//         </Suspense>
//     )
// }

// "use client"; // Якщо потрібен client component для hover, анімацій тощо

import React, { Suspense } from "react";
import { fetchPosts } from "../api/post/postService";
import ProductCard from "./ProductCard";
import Preloader from "./Preloader";
import styles from "../styles/products/InvoicesTable.module.scss";

interface IInvoicesTable {
  query: string;
  currentPage: number;
}

export default async function InvoicesTable({ query, currentPage }: IInvoicesTable) {
  const limit = 9;
  const invoices = await fetchPosts(currentPage, limit, query);

  return (
    <section className={styles.invoicesTable}>
      <Suspense fallback={<Preloader />}>
        <div className={styles.grid}>
          {invoices.map((product, index) => (
            <ProductCard key={product.id ?? index} product={product} index={index} />
          ))}
        </div>
      </Suspense>
    </section>
  );
}
