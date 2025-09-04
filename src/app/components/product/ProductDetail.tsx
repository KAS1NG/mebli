import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/utils/authOptions';
import { IPost, IGetProperty, IPreviewPost } from '../../types/post';
import { stringToArray } from '../../utils/stringToArr';
import MySlider from '@/app/components/slider'
import ProductPage from './ProductPage';
import ProductDetailClient from './ProductDetailClient';
import style from '../../styles/product/ProductDetail.module.scss'

interface ProductDetailProps {
  product: IPost;
  productProperty: IGetProperty[];
  invoices: IPreviewPost[];
}

export default async function ProductDetailServer({
  product,
  productProperty,
  invoices
}: ProductDetailProps) {
  // Отримуємо сесію на сервері
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const isAdmin = user?.role === 'ROLE_ADMIN';

  const tagsArray = stringToArray(product.tags || '');

  return (
    <main className={style.container}>
      <div className={style.page}>
        <MySlider product={product} title={product.title} />
        <ProductDetailClient
          product={product}
          isAdmin={isAdmin}
          productProperty={productProperty}
          tags={tagsArray}
          user={user}
        />
      </div>

      {invoices && (
        <ProductPage invoices={invoices} currentProductId={product.id} />
      )}
    </main>
  );
}
