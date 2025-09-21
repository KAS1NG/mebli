import ProductCard from "./ProductCard";
import { IPreviewPost } from "../types/post";
import styles from "../styles/products/InvoicesTable.module.scss";

export default async function InvoicesTable({ invoices }: { invoices: IPreviewPost[] }) {

  return (
    <div className={styles.grid}>
      {invoices.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
    </div>
  );
}
