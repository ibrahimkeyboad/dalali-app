'use client';
import Image from 'next/image';

import style from '../../styles/detal.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Figere({ apartment }) {
  return (
    <Swiper
      style={{
        '--swiper-navigation-color': '#0a2326',
        '--swiper-navigation-size': '15px',
        fontWeight: 'bolder',
        color: '#034047',
      }}
      pagination={{
        type: 'fraction',
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className='mySwiper'>
      {apartment?.images?.map((img, i) => (
        <SwiperSlide key={i}>
          <Image
            quality={100}
            placeholder='blur'
            blurDataURL={img?.url}
            alt={apartment?.title}
            className={style.img}
            priority
            src={img.url}
            sizes='(min-width: 768px) 70vw,
            (min-width: 1200px) 100vw,
            50vw'
            fill
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Figere;
