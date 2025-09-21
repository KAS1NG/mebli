import { Metadata } from 'next';
import { fetchPageCount } from '../actions/fetchPageCount';
import InvoicesTable from '../components/table';
import Pagination from '../utils/generatePagination';
import { fetchPosts } from '../api/post/postService';
import '@/app/styles/products.scss'

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
  )
}
