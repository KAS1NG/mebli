'use client'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { createPost } from '@/app/actions/createPost';
import CustomSubmitBtn from '@/app/utils/CustomSubmitBtn';
import "@/app/styles/createProduct.scss"

export default function LoginForm() {

  const router = useRouter()

  const { data: session } = useSession();
  const { accessToken } = session || {};

  const credentialsAction = async (formData: FormData) => {
    const title = formData.get("title") as string
    const price = formData.get("price") as string
    const description = formData.get("description") as string
    const colors = formData.get("colors") as string
    const tags = formData.get("tags") as string
    const brand = formData.get("brand") as string

    formData.delete("title")
    formData.delete("price")
    formData.delete("description")
    formData.delete("colors")
    formData.delete("tags")
    formData.delete("brand")

    formData.append('data', new Blob([JSON.stringify(
      { title, price, description, colors, tags, brand }
    )], { type: 'application/json' }));

    await createPost(formData, accessToken || null);
    router.push('/products?page=1')
  }

  return (
    <main className="create-product">
      <form action={credentialsAction} className="create-product__form">
        <div className="create-product__form-group">
          <label htmlFor="title">Product Name</label>
          <input
            type="text"
            id="title"
            name="title"
            required
          />
        </div>

        <div className="create-product__form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="create-product__form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            required
          />
        </div>

        <div className="create-product__form-group">
          <label htmlFor="colors">Colors</label>
          <input
            type="text"
            id="colors"
            name="colors"
            required
          />
        </div>

        <div className="create-product__form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            required
          />
        </div>

        <div className="create-product__form-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            required
          />
        </div>

        <div className="create-product__form-group">
          <label htmlFor="images">Product Images</label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            multiple
            required
          />
        </div>
        <CustomSubmitBtn text="Create Post" classN="create-product__submit" />
       

        {/* {error && <p className="error">{error}</p>}
            <div>
                <label>Username</label>
                <input name='username' type="text" className='input' required />
            </div>
            <div>
                <label>Password</label>
                <input name='password' type="password" className='input' required />
            </div>
            <button
                type="submit"
                className="button"
                disabled={isLoading}>
                {isLoading ? 'Logining...' : 'Login'}
            </button> */}
      </form>
    </main>
  );
}



// 'use client'
// import React, { useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { createPosts } from '@/app/api/post/postService';
// import "@/app/styles/createProduct.scss"

// interface Product {
//   title: string;
//   price: number;
//   description: string;
//   colors: string;
//   tags: string;
//   brand: string;
//   images: File[];
// }

// const CreateProduct: React.FC = () => {
//   const { data: session, status } = useSession();
//   const [product, setProduct] = useState<Partial<Product>>({
//     title: '',
//     price: 0,
//     description: '',
//     colors: '',
//     tags: '',
//     brand: '',
//     images: []
//   });
//   const [error, setError] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setProduct(prevProduct => ({
//       ...prevProduct,
//       images: Array.from(e.target.files ?? []) // Fallback to empty array if files are null
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!session) {
//       setError('You must be logged in to create a product');
//       return;
//     }

//     if (!product.images || product.images.length === 0) {
//       setError('At least one image is required');
//       return;
//     }

//     setError(null);
//     setIsSubmitting(true);

//     const formData = new FormData();
//     formData.append('data', new Blob([JSON.stringify(product)], { type: 'application/json' }));

//     product.images.forEach(file => {
//       formData.append('file', file);
//     });

//     try {
//       await createPosts(formData, session.accessToken || null);
//       // Reset form after successful submission
//       setProduct({
//         title: '',
//         price: 0,
//         description: '',
//         colors: '',
//         tags: '',
//         brand: '',
//         images: []
//       });
//     } catch (error) {
//       setError('Failed to create product. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <main className="create-product">
//       <h1 className="create-product__title">Create New Product</h1>
//       {error && <p className="create-product__error">{error}</p>}
//       <form className="create-product__form" onSubmit={handleSubmit}>
//         <div className="create-product__form-group">
//           <label htmlFor="title">Product Name</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={product.title || ''}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="create-product__form-group">
//           <label htmlFor="price">Price</label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={product.price || 0}
//             onChange={handleInputChange}
//             required
//             min="0"
//             step="0.01"
//           />
//         </div>

//         <div className="create-product__form-group">
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={product.description || ''}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="create-product__form-group">
//           <label htmlFor="colors">Colors</label>
//           <input
//             type="text"
//             id="colors"
//             name="colors"
//             value={product.colors || ''}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="create-product__form-group">
//           <label htmlFor="tags">Tags</label>
//           <input
//             type="text"
//             id="tags"
//             name="tags"
//             value={product.tags || ''}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="create-product__form-group">
//           <label htmlFor="brand">Brand</label>
//           <input
//             type="text"
//             id="brand"
//             name="brand"
//             value={product.brand || ''}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="create-product__form-group">
//           <label htmlFor="images">Product Images</label>
//           <input
//             type="file"
//             id="images"
//             name="images"
//             accept="image/*"
//             multiple
//             onChange={handleFileChange}
//             required
//           />
//           <div className="create-product__image-preview">
//             {product.images && product.images.length > 0 && (
//               <ul>
//                 {product.images.map((file, index) => (
//                   <li key={index}>{file.name}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>

//         <button type="submit" className="create-product__submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Creating...' : 'Create Product'}
//         </button>
//       </form>
//     </main>
//   );
// };

// export default CreateProduct;
