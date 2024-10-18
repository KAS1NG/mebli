'use client';

import { useRef } from 'react';
import { addProductProperty } from '../actions/addProductProperty';
import CustomSubmitBtn from '../utils/CustomSubmitBtn';
import '@/app/styles/AddProductProperties.scss'

const AddProductProperties = ({ productId }: { productId: number }) => {
  // Створюємо реф для форми
  const formRef = useRef<HTMLFormElement>(null);

  // Функція для очищення полів
  const clearForm = () => {
    if (formRef.current) {
      formRef.current.reset(); // Очищає всі поля форми
    }
  };

  const credentialsAction = async (formData: FormData) => {
    const name = formData.get("text") as string
    const text = formData.get("description") as string

    const productProperty = { name, text }

    await addProductProperty(productProperty, productId)
    clearForm(); // Очищаємо поля форми після успішної відправки
  }

  return (
    <div className="add-properties">
      <h2>Додати характеристики товару</h2>
      {/* Форма для додавання нової властивості */}
      <form ref={formRef} action={credentialsAction} className="add-properties__form">
        <input
          type="text"
          id='text'
          name='text'
          placeholder="Enter property"
          className="add-properties__input"
        />
        <input
          type="text"
          id='description'
          name='description'
          placeholder="Enter description"
          className="add-properties__input"
        />
        <CustomSubmitBtn text="Add" classN="add-properties__btn" />
      </form>
    </div>
  );
};

export default AddProductProperties;
