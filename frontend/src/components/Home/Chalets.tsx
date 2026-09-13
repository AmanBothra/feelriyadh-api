import Link from 'next/link';
import React, { useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Button, NextImage } from '~/components/common';
import { useTranslation } from '~/i18n/TranslationProvider';
export const Chalets = ({ data }) => {
  const [_, setSwiper] = useState<SwiperType | null>(null); // Specify Swiper type
  const { translate, locale } = useTranslation();

  // const calculateLowestPrice = (chaletDetails) => {
  //   let minPrice = null;
  //   for (const detail of chaletDetails) {
  //     const price = parseFloat(detail.price);
  //     if (minPrice === null || price < minPrice) {
  //       minPrice = price;
  //     }
  //   }
  //   return minPrice;
  // };

  const onSwiper = (swiperInstance: SwiperType | null) => {
    setSwiper(swiperInstance);
  };

  return (
    <section className='py-16 pb-0 relative overflow-hidden text-dark'>
      <div className='container'>
        <div className='flex lg:flex-row flex-col w-full justify-between lg:items-center gap-4'>
          <div className='font-medium'>
            <h2 className='lg:text-6xl text-4xl uppercase text-secondary'>
              {translate('choose a chalet')}
            </h2>
          </div>

          <div className='text-lg w-full lg:w-1/2'>
            <p className='text-secondary'>
              {locale == 'en' ? data?.description_en : data?.description_ar}{' '}
            </p>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='lg:pt-16 pt-8 relative z-50'>
          <Swiper
            spaceBetween={30}
            onSwiper={onSwiper}
            dir={locale == 'ar' ? 'rtl' : 'ltr'}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className='w-full !z-20 !overflow-visible'
          >
            {data?.map((chalet) => (
              <SwiperSlide key={chalet?.id}>
                {/* <NextLink href={`/book/${chalet?.id}`}>
                 */}
                <Link href='https://wa.me/966531118104'>
                  <NextImage
                    src={chalet?.chalet_image}
                    alt='image'
                    loading='lazy'
                    responsive
                  />
                  <div className='lg:mt-8 mt-4'>
                    {/* <h3 className='text-2xl  font-medium uppercase'>
                      {locale == 'en' ? chalet.name_en : chalet?.name_ar}
                    </h3> */}
                    {/* <div className='w-full flex justify-between gap-4 items-center'>
                      <p>
                        {translate('starts from', {
                          price:
                            calculateLowestPrice(chalet?.chalet_details) ??
                            chalet?.chalet_details?.[0]?.price ??
                            '00.00',
                        })}
                      </p>
                    </div> */}
                    <Button className='mt-4 h-12 px-4'>
                      {translate('book now')}
                    </Button>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* <div className='mt-8 lg:mt-16 flex gap-5 w-full relative z-50'>
          <SwiperNavigation
            slideNext={() => swiper?.slideNext()}
            slidePrev={() => swiper?.slidePrev()}
            className='border-dark bg-lightPrimary hover:bg-white'
            iconsColor='!text-dark'
          />
        </div> */}
      </div>
    </section>
  );
};
