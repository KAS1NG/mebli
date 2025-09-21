import { fetchPageCount } from "@/app/actions/fetchPageCount";
import { fetchPosts } from "@/app/api/post/postService";
import InvoicesTable from "@/app/components/table";
import Pagination from "@/app/utils/generatePagination";
import '@/app/styles/products.scss'

type SearchParams = {
    page: string
    query: string
}

export default async function CategoryPage(
    { searchParams }: PageProps<'/products/[slug]/[id]'> & { searchParams: Promise<SearchParams> }
) {
    const { query, page = 1 } = await searchParams

    const [invoices, totalPages] = await Promise.all([
        fetchPosts(page, query),
        fetchPageCount(query),
    ]);

    return (
        <main className="products">
            <section className="products__hero">
                <InvoicesTable invoices={invoices} />
                <Pagination totalPages={totalPages} />
            </section>
        </main>
    );
}