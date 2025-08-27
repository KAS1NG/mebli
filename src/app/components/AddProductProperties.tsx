'use client';

import { useRef } from 'react';
import { addProductProperty } from '../actions/addProductProperty';
import CustomSubmitBtn from '../utils/CustomSubmitBtn';
// import '@/app/styles/AddProductProperties.scss'
import style from '../styles/product/AddProductProperties.module.scss'

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
    <div className={style.addProperties}>
      <h2>Додати характеристики товару</h2>

      <form ref={formRef} action={credentialsAction} className={style.form}>
        <input
          type="text"
          id='text'
          name='text'
          placeholder="Enter property"
          className={style.input}
        />
        <input
          type="text"
          id='description'
          name='description'
          placeholder="Enter description"
          className={style.input}
        />
        <CustomSubmitBtn text="Add" classN={style.btn} />
      </form>
    </div>
  );
};

export default AddProductProperties;
