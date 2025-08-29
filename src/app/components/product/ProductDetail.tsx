import dynamic from 'next/dynamic';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/utils/authOptions';
import { IPost, IGetProperty, IPreviewPost } from '../../types/post';
import { stringToArray } from '../../utils/stringToArr';
import MySlider from '@/app/components/slider'
import style from '../../styles/product/ProductDetail.module.scss'

// Динамічні клієнтські компоненти
const ProductActionsWrapper = dynamic(() => import('./ProductActionsWrapper'), { ssr: false });
const AddProductProperties = dynamic(() => import('../AddProductProperties'), { ssr: false });
const ProductProperties = dynamic(() => import('./ProductProperties'), { ssr: false });
const ProductTags = dynamic(() => import('./ProductTags'), { ssr: false });
const ProductPage = dynamic(() => import('./ProductPage'), { ssr: false });
const DeliveryInfo = dynamic(() => import('./DeliveryInfo'), { ssr: false });

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

        <section className={style.info}>
          <h1 className={style.title}>{product.title}</h1>
          <p className={style.description}>{product.description}</p>
          <p className={style.price}>Ціна: ₴ {product.price} грн</p>

          <ProductProperties properties={productProperty} isAdmin={isAdmin} />
          <ProductTags tags={tagsArray} />

          {isAdmin && <AddProductProperties productId={product.id} />}

          {/* Клієнтський компонент для дії з кошиком */}
          <ProductActionsWrapper product={product} user={user} />

          <DeliveryInfo />

        </section>
      </div>

      {invoices && (
        <ProductPage invoices={invoices} currentProductId={product.id} />
      )}
    </main>
  );
}
