import { Suspense } from "react";
import { fetchPosts } from "../api/post/postService";
import ProductCard from "./ProductCard";

export default async function InvoicesTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const invoices = await fetchPosts(query, currentPage);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <section className="products__grid">
                {invoices.map(product =>
                    <ProductCard key={product.id} product={product} />
                )}
            </section>
        </Suspense>
    )
}