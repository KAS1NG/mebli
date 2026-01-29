'use client';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import styles from '../../styles/product/Modal.module.scss';

interface ModalProps {
    images: string[];
    selectedImage: string;
    closeModal: () => void;
}

export default function Modal({ images, selectedImage, closeModal }: ModalProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

    const initialIndex = images.indexOf(selectedImage);

    return (
        <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {/* Кнопка закриття */}
                <button className={styles.closeBtn} onClick={closeModal}>
                    ✕
                </button>

                <div className={styles.galleryWrapper}>
                    {/* Основний слайдер */}
                    <Swiper
                        modules={[Navigation, Thumbs]}
                        navigation
                        thumbs={{ swiper: thumbsSwiper }}
                        initialSlide={initialIndex >= 0 ? initialIndex : 0}
                        className={styles.mainSwiper}
                    >
                        {images.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <TransformWrapper>
                                    <TransformComponent>
                                        <Image
                                            src={img}
                                            alt={`Фото ${idx + 1}`}
                                            width={1000}
                                            height={800}
                                            className={styles.mainImage}
                                        />
                                    </TransformComponent>
                                </TransformWrapper>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Прев’юшки */}
                    <Swiper
                        modules={[Thumbs]}
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={5}
                        watchSlidesProgress
                        className={styles.thumbsSwiper}
                        breakpoints={{
                            0: { direction: 'horizontal', slidesPerView: 4 }, // мобільний
                            768: { direction: 'vertical', slidesPerView: 5 }, // десктоп
                        }}
                    >
                        {images.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <Image
                                    src={img}
                                    alt={`Прев’ю ${idx + 1}`}
                                    width={100}
                                    height={100}
                                    className={styles.thumbImage}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
