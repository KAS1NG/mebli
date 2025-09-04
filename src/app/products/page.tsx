import { Metadata } from 'next';
import { fetchPageCount } from '../actions/fetchPageCount';
import InvoicesTable from '../components/table';
import PaginationPages from '../utils/generatePagination';
import { formatTitle } from '../utils/formatTitle';
import '@/app/styles/products.scss'

interface Params {} // якщо немає params
interface Search {
  query?: string;
  page?: string;
}

// Metadata залишається без змін
export const metadata: Metadata = {
  title: 'Меблі Ромни | Каталог',
  alternates: { languages: { 'uk-UA': '/uk-UA' } },
  openGraph: { title: 'Каталог' },
}

// Компонент
const Products = async ({
  searchParams,
}: {
  params?: Promise<Params>;
  searchParams?: Promise<Search>; // ✅ Next.js 15 очікує Promise
}) => {
  const { query, page } = (await searchParams) || {};
  const q = query || '';
  const currentPage = Number(page) || 1;

  const totalPages = await fetchPageCount(q);
  const { main, styledPart } = formatTitle(q);

  return (
    <main className="products">
      <section className="products__hero">
        {styledPart && (
          <h1 className="products__title">
            <span className="main-title">{main}</span>{' '}
            <span className="styled-title">{styledPart}</span>
          </h1>
        )}
        <InvoicesTable query={q} currentPage={currentPage} />
        {totalPages > 1 && <PaginationPages totalPages={totalPages} />}
      </section>
    </main>
  );
};

export default Products;
