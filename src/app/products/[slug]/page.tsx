import { fetchPageCount } from "@/app/actions/fetchPageCount";
import InvoicesTable from "@/app/components/table";
import PaginationPages from "@/app/utils/generatePagination";
import '@/app/styles/products.scss'

export default async function CategoryPage({
    searchParams,
}: {
    params: { category: string };
    searchParams: { page?: string, query?: string };
}) {

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams.page) || 1;

    const totalPages = await fetchPageCount(query);

    return (
        <main className="products">
            <section className="products__hero">
                <InvoicesTable query={query} currentPage={currentPage} />
                {/* якщо сторінко більше ніж одна то показується пагінація сторінок */}
                {totalPages > 1 && <PaginationPages totalPages={totalPages} />}
                {/* Тут робиш фільтрацію + пагінацію */}
            </section>
        </main>
    );
}
