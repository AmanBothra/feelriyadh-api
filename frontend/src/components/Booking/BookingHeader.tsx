import { useAnimation } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect } from 'react';

import { SubHeader } from '~/components/common';
import { useTranslation } from '~/i18n/TranslationProvider';

export const BookingHeader = ({ data }: any) => {
  const controls = useAnimation();
  const { translate, locale } = useTranslation();

  const parallax = () => {
    const scrollPosition: number = window.scrollY;
    const parallaxElement: HTMLElement | null =
      document.querySelector('.parallax');

    if (parallaxElement) {
      parallaxElement.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', parallax);

    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: 'easeInOut' },
    });

    return () => {
      window.removeEventListener('scroll', parallax);
    };
  }, [controls]);

  return (
    <SubHeader image={data?.banner_image}>
      <div className='lg:py-32 py-16 text-white'>
        <div className='flex flex-col w-full h-full'>
          <h1 className='text-white uppercase font-medium relative z-10 flex flex-col text-5xl lg:!text-9xl leading-tight'>
            <span>{locale == 'en' ? data?.name_en : data?.name_ar}</span>
          </h1>
          <div className='font-normal uppercase mt-8'>
            <Link href={`/${locale}`}>{translate('home')}</Link>
            <span className='mx-2'>·</span>
            <span>{locale == 'en' ? data?.name_en : data?.name_ar}</span>
          </div>
        </div>
      </div>
    </SubHeader>
  );
};
