'use client';

import { addProductProperty } from '../actions/addProductProperty';
import CustomSubmitBtn from '../utils/CustomSubmitBtn';
import '@/app/styles/AddProductProperties.scss'

const AddProductProperties = ({ productId }: { productId: number }) => {
  const credentialsAction = async (formData: FormData) => {
    const name = formData.get("text") as string
    const text = formData.get("description") as string

    const productProperty = { name, text }

    await addProductProperty(productProperty, productId)
  }

  return (
    <div className="add-properties">
      <h2>Add Product Properties</h2>
      {/* Форма для додавання нової властивості */}
      <form action={credentialsAction} className="add-properties__form">
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
