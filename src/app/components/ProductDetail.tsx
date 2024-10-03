'use client'
import React, { useMemo, useState } from 'react';
import { IGetProperty, IPost } from '../types/post';
import { stringToArray } from '../utils/stringToArr';
import MySlider from '@/app/components/slider';
import AddProductProperties from './AddProductProperties';
import { addToCart } from '../actions/addToCart';
import { removePost } from '../actions/removePost';
import { removeProperty } from '../actions/removeProperty';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ProductDetailProps {
  product: IPost;
  productProperty: IGetProperty[];
}

const ProductDetail = ({ product, productProperty }: ProductDetailProps) => {
  const { data: session } = useSession();

  const router = useRouter()

  const user = session?.user;
  const isAdmin = user?.role === 'ROLE_ADMIN';

  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    if (!user) {
      router.push('/auth/login')
    } else {

      setIsLoading(true)
      const res = await addToCart({ itemId: product.id })
      setIsLoading(false)
      alert(res)
    }
  }


  // Memoize tags array to avoid unnecessary re-calculations
  const tagsArray = useMemo(() => stringToArray(product.tags || ''), [product?.tags]);

  return (
    <main className="product_container">
      <div className="product-page">

        {/* Product Slider */}
        <MySlider slides={product.images} title={product.title} />

        <section className="product-page__info">
          {/* Product Title and Description */}
          <h1 className="product-page__title">{product.title}</h1>
          <p className="product-page__description">{product.description}</p>
          <p className="product-page__price">Price: ${product.price}</p>

          {/* Product Details */}
          <div className="product-page__details">
            <p><strong>Color:</strong> {product.color}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            {productProperty && productProperty?.map(item => (
              <p key={item.id}><strong>{item.name}:</strong> {item.text}
                <button onClick={() => removeProperty(item.id)}>X</button>
              </p>
            ))}
          </div>

          {/* Tags */}
          {tagsArray.length > 0 && (
            <div className="product-page__tags">
              <strong>Tags: </strong>
              {tagsArray.map((tag, index) => (
                <span key={index} className="product-page__tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Add Product Properties */}
          {isAdmin &&
            <AddProductProperties productId={product.id} />
          }

          {/* Action Buttons */}
          <div className="product-page__buttons">
            <button
              className="product-page__btn product-page__btn--add-to-cart"
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Додати в корзину'}
            </button>
            <button className="product-page__btn product-page__btn--view-3d">
              3D Модель
            </button>
            {isAdmin && <button className="product-page__btn product-page__btn--delete-btn" onClick={() => removePost(product.id)}>
              <i className="fas fa-trash-alt"></i> Видалити
            </button>}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetail;
