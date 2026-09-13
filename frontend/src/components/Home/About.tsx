import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { NextImage, SwiperNavigation } from '~/components/common';
import { useTranslation } from '~/i18n/TranslationProvider';
import { AboutTypes } from '~/types';

interface AboutProps {
  data: AboutTypes;
  counter: AboutTypes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gallery: any;
}

export const About = ({ data, counter, gallery }: AboutProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null); // Specify Swiper type
  const controls = useAnimation();
  const { locale } = useTranslation();
  const onSwiper = (swiperInstance: SwiperType | null) => {
    setSwiper(swiperInstance);
  };
  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <motion.section
      className='bg-dark lg:py-32 py-16 relative overflow-hidden'
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className='container relative z-10'>
        <div className='absolute top-0 z-20'>
          <Pattern />
        </div>
        <motion.div
          className='w-full flex justify-end gap-4'
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <div
            className='w-full lg:w-1/2 flex flex-col lg:mt-0 text-white'
            dangerouslySetInnerHTML={{
              __html: locale == 'en' ? data?.content_en : data?.content_ar,
            }}
          ></div>
        </motion.div>
        <motion.div
          className='grid gap-8 uppercase lg:py-16 py-12 w-full  lg:grid-flow-col  lg:auto-cols-auto	'
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          {counter?.map((counter, index) => (
            <div
              key={index}
              className='flex flex-col items-center w-full justify-center text-white gap-1 font-medium'
            >
              <div className='lg:text-6xl text-3xl'>{counter?.value}</div>
              <div className='text-lg'>
                {locale == 'en' ? counter?.title_en : counter?.title_ar}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <div className='container'>
        <motion.div
          className='lg:pt-16 pt-8 relative z-50 cursor-move'
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
        >
          <Swiper
            spaceBetween={30}
            onSwiper={onSwiper}
            dir={locale == 'ar ' ? 'rtl' : 'ltr'}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 2.1,
              },
            }}
            className='w-full !z-20 !overflow-visible'
          >
            {gallery?.map((item) => (
              <SwiperSlide key={item?.id}>
                <NextImage
                  src={item?.image}
                  alt='image'
                  loading='lazy'
                  responsive
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        <motion.div
          className='mt-8 lg:mt-16 flex gap-5 w-full relative z-50'
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
        >
          <SwiperNavigation
            slideNext={() => swiper?.slideNext()}
            slidePrev={() => swiper?.slidePrev()}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

const Pattern = () => {
  return (
    <svg
      width='815'
      height='1150'
      viewBox='0 0 815 1150'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g opacity='0.02'>
        <g clipPath='url(#clip0_125_814)'>
          <path
            d='M421.054 1090.59H422.842H421.054ZM422.842 1090.59L430.63 1090.2H431.078H431.595H432.536L435.101 1089.99V313.909L379.899 363.996V1089.75L382.464 1089.96H383.405H383.899H384.37L392.158 1090.36H394.888L379.899 1089.54L422.842 1090.59ZM295.778 30.5736L475.315 193.385V223.656L552.965 153.334V1061.3C614.645 1034.95 667.845 992.379 706.78 938.203C745.715 884.027 768.894 820.323 773.797 754.021C778.7 687.718 765.139 621.355 734.588 562.147C704.038 502.939 657.668 453.153 600.52 418.204V372.216C669.267 408.827 725.943 464.204 763.812 531.763C801.681 599.322 819.15 676.221 814.141 753.318C809.132 830.415 781.857 904.467 735.558 966.671C689.259 1028.88 625.883 1076.61 552.965 1104.21V1104.45L545.294 1107.05C534.612 1110.84 523.748 1114.19 512.705 1117.11V243.611L475.315 277.421V1125.5L460.514 1127.27L459.338 1127.43L457.549 1127.61C445.502 1129.17 433.313 1130.11 420.983 1130.43H418.63H418.371H416.606H414.253H400.559H398.206H396.558H395.97H393.947L390.488 1130.32H388.77L385.311 1130.18H385.052H384.181H383.546H382.393H381.805C373.663 1129.69 365.545 1128.92 357.545 1127.85L355.757 1127.66L354.039 1127.45L339.78 1125.73V346.718L346.368 340.734L435.219 260.144V210.662L302.413 90.3005V1117.18C291.495 1114.32 280.765 1110.99 270.247 1107.26L262.153 1104.52V1104.31C189.239 1076.7 125.867 1028.95 79.5668 966.751C33.2664 904.548 5.98406 830.5 0.961196 753.404C-4.06166 676.308 13.3862 599.405 51.2316 531.834C89.077 464.262 145.729 408.862 214.456 372.216V418.204C157.306 453.156 110.936 502.948 80.39 562.163C49.8444 621.379 36.2934 687.749 41.2113 754.055C46.1292 820.361 69.3275 884.062 108.283 938.229C147.238 992.397 200.458 1034.96 262.153 1061.28V0L295.778 30.5736Z'
            fill='white'
          ></path>
        </g>
      </g>
      <defs>
        <clipPath id='clip0_125_814'>
          <rect width='815' height='1130.67' fill='white'></rect>
        </clipPath>
      </defs>
    </svg>
  );
};
