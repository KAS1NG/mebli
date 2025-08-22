import { Metadata } from 'next';
import { fetchPageCount } from '../actions/fetchPageCount';
import InvoicesTable from '../components/table';
import PaginationPages from '../utils/generatePagination';
import { formatTitle } from '../utils/formatTitle';
import '@/app/styles/products.scss'

interface ProductsProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export const metadata: Metadata = {
  title: 'Меблі Ромни | Каталог',
  alternates: {
    languages: {
      'uk-UA': '/uk-UA',  // Українська
    },
  },
  openGraph: {
    title: 'Каталог',
  }
}

const Products = async ({ searchParams }: ProductsProps) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPageCount(query);
  const { main, styledPart } = formatTitle(query);

  return (
    <main className="products">
      <section className="products__hero">
       {styledPart && <h1 className="products__title">
          <span className="main-title">{main}</span>{' '} {/* Основна частина */}
          <span className="styled-title">{styledPart}</span> {/* Стилізована частина */}
        </h1>}
        <InvoicesTable query={query} currentPage={currentPage} />
        {/* якщо сторінко більше ніж одна то показується пагінація сторінок */}
        {totalPages > 1 && <PaginationPages totalPages={totalPages} />}
      </section>
    </main>
  );
};

export default Products