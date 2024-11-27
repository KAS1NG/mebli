'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { createPost } from '@/app/actions/createPost';
import CustomSubmitBtn from '@/app/utils/CustomSubmitBtn';
import { productSchema } from '@/app/schemas/productSchema';
import TagList from '@/app/components/TagList';
import "@/app/styles/createProduct.scss"

export default function LoginForm() {

  const router = useRouter()

  const { data: session } = useSession()
  const { accessToken } = session || {}

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  if (!accessToken) {
    router.push('/auth/login'); // Redirect to login if not authenticated
    return null;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles(filesArray);
    }
  }

  const handleTagSelect = (selectedTags: string) => {
    console.log(selectedTags)
  }

  const credentialsAction = async (formData: FormData) => {
    setLoading(true);

    // console.log(formData.get('files'))

    const productData = {
      title: formData.get('title') as string,
      price: Number(formData.get('price')),
      description: formData.get('description') as string,
      tags: formData.get('tags') as string,
      files: selectedFiles, // Вибрані файли зберігаються у формі FileList
    };

    // Валідація через Zod
    const validation = productSchema.safeParse(productData);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    const formDataNew = new FormData();
    formDataNew.append('title', productData.title);
    formDataNew.append('price', productData.price.toString());
    formDataNew.append('description', productData.description);
    formDataNew.append('tags', productData.tags);
    selectedFiles.forEach((file) => {
      formDataNew.append('file', file); // "files" — ключ для масиву файлів
    });

    try {
      await createPost(formDataNew, accessToken || null);
      router.push('/products?page=1');
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setLoading(false);
    }
  }

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...selectedFiles];
    const [removedFile] = newFiles.splice(index, 1);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    newFiles.splice(newIndex, 0, removedFile);
    setSelectedFiles(newFiles);
  };


  return (
    <main className="create-product">
      <form action={credentialsAction} className="create-product__form">
        <div className="create-product__form-group">
          <label htmlFor="title">Назва виробу</label>
          <input
            type="text"
            id="title"
            name="title"
            required
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="create-product__form-group">
          <label htmlFor="price">Ціна</label>
          <input
            type="number"
            id="price"
            name="price"
            required
            min="0"
            step="0.01"
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        <div className="create-product__form-group">
          <label htmlFor="description">Опис</label>
          <textarea
            id="description"
            name="description"
            required
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <div className="create-product__form-group">
          <label htmlFor="tags">Тег</label>
          {errors.tags && <span className="error">{errors.tags}</span>}
          <TagList
            onTagSelect={handleTagSelect}
          />
        </div>
        <div className="create-product__form-group">
          <label htmlFor="images">Зображення</label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            multiple
            required
            onChange={handleFileChange}
          />
          {errors.files && <span className="error">{errors.files}</span>}
        </div>
        <ul className='choosenImages'>
          {selectedFiles.map((file, index) => (
            <li key={index}>
              <Image
                key={index}
                width={200}
                height={200}
                src={URL.createObjectURL(file)} // Створюємо URL для попереднього перегляду
                alt={`preview ${index}`}
                className="preview-image"
              />
              <div className='funcBtn'>
                <div onClick={() => moveFile(index, 'up')}>
                  ⬅️
                </div>
                <div onClick={() => moveFile(index, 'down')}>
                  ➡️
                </div>
              </div>
            </li>
          ))}
        </ul>
        <CustomSubmitBtn text="Створити" classN="create-product__submit" disabled={loading} />
      </form>
    </main>
  );
}