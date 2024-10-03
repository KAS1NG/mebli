'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // Правильний імпорт модулів
import Image from 'next/image';
import Modal from './Modal';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ISlider {
  slides: string[],
  title: string
}

function MySlider({ slides, title }: ISlider) {

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="product-page__gallery">
      {slides.length > 1 ? (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          // slidesPerView={Math.min(slides.length, 3)}
          breakpoints={{
            640: {
              slidesPerView: 1, // Для маленьких екранів: максимум 1.5 слайда
              spaceBetween: 20,
            },
            768: {
              slidesPerView: Math.min(slides.length, 1.5), // Для середніх екранів: максимум 2 слайда
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: Math.min(slides.length, 2), // Для великих екранів: максимум 2.5 слайда
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: Math.min(slides.length, 2.5), // Для дуже великих екранів: максимум 3 слайда
              spaceBetween: 20,
            },
          }}
        >
          {slides.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                alt={title}
                width={500}
                height={500}
                className="product-page__image"
                onClick={() => openModal(image)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // Якщо тільки одна картинка, просто відображаємо зображення
        <Image
          src={slides[0]}
          alt={title}
          width={500}
          height={500}
          className="product-page__image"
          onClick={() => openModal(slides[0])}
        />
      )}

      {selectedImage && (
        <Modal selectedImage={selectedImage} closeModal={closeModal} />
      )}
    </div>
  )
}

export default MySlider