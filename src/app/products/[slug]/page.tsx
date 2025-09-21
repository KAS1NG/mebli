import { fetchPageCount } from "@/app/actions/fetchPageCount";
import InvoicesTable from "@/app/components/table";
import '@/app/styles/products.scss'
import Pagination from "@/app/utils/generatePagination";

type SearchParams = {
    page: string
    query: string
}

export default async function CategoryPage(
    { searchParams }: PageProps<'/products/[slug]/[id]'> & { searchParams: Promise<SearchParams> }
) {
    const { query = '', page = 1 } = await searchParams

    const totalPages = await fetchPageCount(query);
    const currentPage = Number(page)

    return (
        <main className="products">
            <section className="products__hero">
                <InvoicesTable query={query} currentPage={currentPage} />
                    <Pagination totalPages={totalPages} />
            </section>
        </main>
    );
}