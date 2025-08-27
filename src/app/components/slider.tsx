'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState, KeyboardEvent } from 'react';
import style from '../styles/product/MySlider.module.scss'
import { IPost } from '../types/post';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Modal = dynamic(() => import('./product/Modal'), { ssr: false })

interface ISliderProps {
  product: IPost;
  title: string;
}


export default function MySlider({ product, title }: ISliderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const slides = product.images

  const openModal = (image: string) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  const handleKeyPress = (e: KeyboardEvent<HTMLImageElement>, image: string) => {
    if (e.key === 'Enter') openModal(image);
  };

  return (
    <div className={style.gallery}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        navigation={slides.length > 1}
        pagination={slides.length > 1 ? { clickable: true } : false}
        loop={slides.length > 1}
      >
        {slides.map((image, index) => (
          <SwiperSlide key={image}>
            <Image
              src={image}
              alt={`${title} — зображення ${index + 1}`}
              width={400}
              height={400}
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 400px"
              className={style.productImage}
              quality={index === 0 ? 90 : 75}
              style={
                index === 0
                  ? { viewTransitionName: `post-image-${product.id}-0` }
                  : {}
              }
              onClick={() => openModal(image)}
              onKeyDown={(e) => handleKeyPress(e, image)}
              tabIndex={0}
              priority={index === 0}      // 👈 робимо головне зображення пріоритетним
              loading={index === 0 ? undefined : "lazy"} // 👈 лише інші картинки lazy
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedImage && (
        <Modal
          images={slides}
          selectedImage={selectedImage}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
