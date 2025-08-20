'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState, KeyboardEvent } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IPost } from '../types/post';

interface ISliderProps {
  product: IPost;
  title: string;
}

const Modal = dynamic(() => import('./Modal'), { ssr: false });

export default function MySlider({ product, title }: ISliderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const slides = product.images

  const openModal = (image: string) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  const handleKeyPress = (e: KeyboardEvent<HTMLImageElement>, image: string) => {
    if (e.key === 'Enter') openModal(image);
  };

  return (
    <div className="product-page__gallery">
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
              className="product-page__image cursor-pointer"
              style={
                index === 0
                  ? { viewTransitionName: `post-image-${product.id}-0` }
                  : {}
              }
              onClick={() => openModal(image)}
              onKeyDown={(e) => handleKeyPress(e, image)}
              role="button"
              tabIndex={0}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedImage && (
        <Modal selectedImage={selectedImage} closeModal={closeModal} />
      )}
    </div>
  );
}
