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
    const color = formData.get("colors") as string
    const tag = formData.get("tags") as string
    const brand = formData.get("brand") as string

    const tags = tag.toLowerCase()

    formData.delete("title")
    formData.delete("price")
    formData.delete("description")
    formData.delete("colors")
    formData.delete("tags")
    formData.delete("brand")

    formData.append('data', new Blob([JSON.stringify(
      { title, price, description, color, tags, brand }
    )], { type: 'application/json' }));

    await createPost(formData, accessToken || null);
    router.push('/products?page=1')
  }

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
        </div>

        <div className="create-product__form-group">
          <label htmlFor="description">Опис</label>
          <textarea
            id="description"
            name="description"
            required
          />
        </div>

        <div className="create-product__form-group">
          <label htmlFor="colors">Колір</label>
          <input
            type="text"
            id="colors"
            name="colors"
            required
          />
        </div>

        <div className="create-product__form-group">
          <label htmlFor="tags">Тег</label>
          <input
            type="text"
            id="tags"
            name="tags"
            required
          />
        </div>

        <div className="create-product__form-group">
          <label htmlFor="brand">Виробник | Бренд</label>
          <input
            type="text"
            id="brand"
            name="brand"
            required
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
          />
        </div>
        <CustomSubmitBtn text="Створити" classN="create-product__submit" />
      </form>
    </main>
  );
}