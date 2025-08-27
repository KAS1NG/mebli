// 'use client';

// import dynamic from 'next/dynamic';
// import MySlider from '@/app/components/slider';
// import { useSession } from 'next-auth/react';
// import { IPost, IGetProperty, IPreviewPost } from '../../types/post';
// import { stringToArray } from '../../utils/stringToArr';
// import { useCartActions } from '@/app/hooks/useCartActions';

// const ProductActions = dynamic(() => import('./ProductActions'), { ssr: false });
// const CartToast = dynamic(() => import('../../components/CartToast'), { ssr: false });
// const AddProductProperties = dynamic(() => import('../AddProductProperties'), { ssr: false });
// const ProductProperties = dynamic(() => import('./ProductProperties'), { ssr: false });
// const ProductTags = dynamic(() => import('./ProductTags'), { ssr: false });
// const ProductPage = dynamic(() => import('./ProductPage'), { ssr: false });
// const DeliveryInfo = dynamic(() => import('./DeliveryInfo'), { ssr: false });

// interface ProductDetailProps {
//     product: IPost;
//     productProperty: IGetProperty[];
//     invoices: IPreviewPost[]
// }

// export default async function ProductDetail({ product, productProperty, invoices }: ProductDetailProps) {

//     const { data: session } = useSession();
//     const user = session?.user;
//     const isAdmin = user?.role === 'ROLE_ADMIN';

//     const tagsArray = stringToArray(product.tags || '');

//     const { loadingAction, toast, handleAddToCart, handleRemoveFromCart } = useCartActions(user);

//     return (
//         <main className="product_container">
//             <div className="product-page">
//                 <MySlider product={product} title={product.title} />

//                 <section className="product-page__info">
//                     <h1 className="product-page__title">{product.title}</h1>
//                     <p className="product-page__description">{product.description}</p>
//                     <p className="product-page__price">Ціна: ₴ {product.price} грн</p>

//                     <ProductProperties properties={productProperty} isAdmin={isAdmin} />
//                     <ProductTags tags={tagsArray} />

//                     {isAdmin && <AddProductProperties productId={product.id} />}

//                     <ProductActions
//                         productId={product.id}
//                         isAdmin={isAdmin}
//                         loadingAction={loadingAction}
//                         onAdd={() => handleAddToCart(product.id)}
//                         onRemove={() => handleRemoveFromCart(product.id)}
//                     />

//                     <DeliveryInfo />
                    
//                     <CartToast show={toast.show} msg="Дякуємо за замовлення"/>
//                 </section>

//             </div>
//             {invoices && <ProductPage invoices={invoices} currentProductId={product.id} />}
//         </main>
//     );
// }

import dynamic from 'next/dynamic';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/utils/authOptions';
import { IPost, IGetProperty, IPreviewPost } from '../../types/post';
import { stringToArray } from '../../utils/stringToArr';
import MySlider from '@/app/components/slider'
import '@/app/styles/productDetail.scss';

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
    <main className="product_container">
      <div className="product-page">
        <MySlider product={product} title={product.title} />

        <section className="product-page__info">
          <h1 className="product-page__title">{product.title}</h1>
          <p className="product-page__description">{product.description}</p>
          <p className="product-page__price">Ціна: ₴ {product.price} грн</p>

          <ProductProperties properties={productProperty} isAdmin={isAdmin} />
          <ProductTags tags={tagsArray} />

          {isAdmin && <AddProductProperties productId={product.id} />}

          {/* Клієнтський компонент для дії з кошиком */}
          <ProductActionsWrapper productId={product.id} user={user} />

          <DeliveryInfo />

        </section>
      </div>

      {invoices && (
        <ProductPage invoices={invoices} currentProductId={product.id} />
      )}
    </main>
  );
}
