import { Suspense } from "react";
import { fetchPosts } from "../api/post/postService";
import ProductCard from "./ProductCard";
import Preloader from "./Preloader";

interface IInvoicesTable {
    query: string
    currentPage: number
}

export default async function InvoicesTable({ currentPage, }: IInvoicesTable) {

    const invoices = await fetchPosts(currentPage);

    return (
        <Suspense fallback={<Preloader />}>
            <section className="products__grid">
                {invoices.map((product, index) =>
                    <ProductCard
                        key={index}
                        product={product}
                        index={index}
                    />
                )}
            </section>
        </Suspense>
    )
}