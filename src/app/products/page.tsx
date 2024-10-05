import { Metadata } from 'next';
import { fetchPageCount } from '../actions/fetchPageCount';
import InvoicesTable from '../components/table';
import PaginationPages from '../utils/generatePagination';
import BedTypes from '../components/BedTypes';
import '@/app/styles/products.scss'

interface ProductsProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export const metadata: Metadata = {
  title: 'Manufacture P | Меблі',
  alternates: {
    languages: {
      'uk-UA': '/uk-UA',  // Українська
      'ru-RU': '/ru-RU',  // Російська
    },
  },
  openGraph: {
    title: 'Меблі',
  }
}

const Products = async ({ searchParams }: ProductsProps) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPageCount(query);

  return (
    <main className="products">
      <section className="products__hero">
        <h1 className="products__title">{query ? query : 'Наші меблі'}</h1>
        {query == 'ліжка' && 
          <BedTypes />
        }
        {/* <p className="products__description">
          Відкрийте для себе наш вибір меблів преміум-класу, призначених для покращення вашого дому та офісу.
        </p> */}
        <InvoicesTable query={query} currentPage={currentPage} />
        <PaginationPages totalPages={totalPages} />
      </section>
    </main>
  );
};

export default Products