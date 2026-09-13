import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { NextImage } from '~/components/common';
import { useTranslation } from '~/i18n/TranslationProvider';

export const Splendor = ({ data }) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null); // Specify Swiper type
  const { translate, locale } = useTranslation();

  const onSwiper = (swiperInstance: SwiperType | null) => {
    setSwiper(swiperInstance);
  };

  return (
    <section className='pt-16 lg:pt-32 relative'>
      <div className='container'>
        <div className='font-medium'>
          <h2 className='lg:text-6xl text-4xl uppercase text-secondary'>
            {translate('splendor')}
          </h2>
        </div>
      </div>
      <div className='lg:pt-16 pt-8 relative'>
        <Swiper
          spaceBetween={0}
          onSwiper={onSwiper}
          dir={locale == 'ar ' ? 'rtl' : 'ltr'}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
        >
          {data?.map((item, key) => (
            <SwiperSlide key={key}>
              <div className='relative before:absolute before:inset-0 before:mx-auto before:w-full before:h-full before:bg-black before:bg-opacity-30 before:z-10'>
                <NextImage
                  src={item?.image}
                  alt='image'
                  loading='lazy'
                  responsive
                  className='w-full h-[80vh] max-h-[400px] object-cover lg:h-[80vh] lg:max-h-[800px]'
                />
                <div className='container absolute inset-0 z-20 h-full w-full flex'>
                  <div className='font-medium text-white text-2xl uppercase mb-8 lg:mb-16 flex mt-auto lg:px-16'>
                    {locale == 'en' ? item?.title_en : item?.title_ar}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='absolute w-full h-full inset-0 flex items-center justify-center'>
          <button
            onClick={() => swiper?.slidePrev()}
            className='relative z-10 w-16 h-16 lg:w-24 lg:h-24 bg-secondary bg-opacity-10 flex items-center justify-center shrink-0 transition-all duration-300 hover:bg-primary'
          >
            <ArrowLongLeftIcon className='text-white lg:w-8 w-4 rtl:rotate-180' />
          </button>
          <button
            onClick={() => swiper?.slideNext()}
            className='relative z-10 w-16 h-16 lg:w-24 lg:h-24 bg-secondary bg-opacity-10 flex items-center justify-center shrink-0 transition-all duration-300 hover:bg-primary'
          >
            <ArrowLongRightIcon className='text-white lg:w-8 w-4 rtl:rotate-180' />
          </button>
        </div>
      </div>
    </section>
  );
};
