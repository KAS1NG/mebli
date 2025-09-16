import { Metadata } from 'next';
import { fetchPageCount } from '../actions/fetchPageCount';
import InvoicesTable from '../components/table';
import '@/app/styles/products.scss'
import Pagination from '../utils/generatePagination';

type SearchParams = {
  page: string
  query: string
}

export const metadata: Metadata = {
  title: 'Меблі Ромни | Каталог',
  alternates: { languages: { 'uk-UA': '/uk-UA' } },
  openGraph: { title: 'Каталог' },
}

export default async function Products(
  { searchParams }: { searchParams: Promise<SearchParams> }
) {
  const { query = '', page = 1 } = (await searchParams) || {};
  const currentPage = Number(page)
  const totalPages = await fetchPageCount(query);

  return (
    <main className="products">
      <section className="products__hero">
        <InvoicesTable query={query} currentPage={currentPage} />
        {totalPages > 1 &&
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                query={query}
                            />}
      </section>
    </main>
  )
}
