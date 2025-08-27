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
              width={500}
              height={500}
              sizes="(max-width: 768px) 100vw, 500px"
              className={style.productImage}
              quality={index === 0 ? 100 : undefined}
              style={
                index === 0
                  ? { viewTransitionName: `post-image-${product.id}-0` }
                  : {}
              }
              onClick={() => openModal(image)}
              onKeyDown={(e) => handleKeyPress(e, image)}
              tabIndex={0}
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
