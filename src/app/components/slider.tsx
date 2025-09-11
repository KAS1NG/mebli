'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Parallax } from 'swiper/modules';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState, KeyboardEvent } from 'react';
import { IPost } from '../types/post';
import style from '../styles/product/MySlider.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';

const Modal = dynamic(() => import('./product/Modal'), { ssr: false });

interface ISliderProps {
  product: IPost;
  title: string;
}

export default function MySlider({ product, title }: ISliderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const slides = product.images;

  const openModal = (image: string) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  const handleKeyPress = (e: KeyboardEvent<HTMLImageElement>, image: string) => {
    if (e.key === 'Enter') openModal(image);
  };

  return (
    <div className={style.gallery}>
      <Swiper
        modules={[Navigation, Pagination, EffectFade, Parallax]}
        spaceBetween={30}
        navigation={slides.length > 1}
        pagination={slides.length > 1 ? { clickable: true, type: 'bullets' } : false}
        loop={slides.length > 1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={700}
        parallax={true}
        className={style.swiperWrapper}
      >
        {slides.map((image, index) => (
          <SwiperSlide key={image}>
            <div className={style.imageBackground} data-swiper-parallax="20%">
              <Image
                src={image}
                alt={`${title} — зображення ${index + 1}`}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 600px"
                className={style.productImage}
                quality={index === 0 ? 100 : 90}
                onClick={() => openModal(image)}
                onKeyDown={(e) => handleKeyPress(e, image)}
                tabIndex={0}
                priority={index === 0}
              />
            </div>
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