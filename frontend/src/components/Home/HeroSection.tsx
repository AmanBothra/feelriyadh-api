import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import {
  Parallax,
  ParallaxProps,
  ParallaxProvider,
} from 'react-scroll-parallax';

import { useTranslation } from '~/i18n/TranslationProvider';

export const HeroSection = ({ data }) => {
  const controls = useAnimation();
  const { locale } = useTranslation();
  const [firstArabicTitleWord, ...remainingArabicTitleWords] = (
    data?.[0]?.title_ar ?? ''
  )
    .trim()
    .split(/\s+/);

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
    <motion.section initial={{ opacity: 0, y: -20 }} animate={controls}>
      <ParallaxProvider>
        <div className='relative overflow-hidden'>
          <Parallax {...({ y: [-20, 20] } as ParallaxProps)}>
            <div
              className='parallax bg-cover bg-center bg-no-repeat h-[60vh] lg:h-[95vh]'
              style={{ backgroundImage: `url("${data?.[0]?.banner_image}")` }}
            ></div>
          </Parallax>
        </div>
      </ParallaxProvider>
      <motion.div className='pt-100 md:pt-20 sm:pt-60 bg-dark'>
        <div className='container'>
          <motion.div
            className='relative lg:absolute bottom-10 lg:-bottom-10 text-[40px] lg:!text-[150px] leading-tight'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <h1
              className='text-white uppercase font-medium relative z-10 flex flex-col last-word'
            >
              {locale == 'en' ? (
                <span
                  dangerouslySetInnerHTML={{ __html: data?.[0]?.title_en }}
                />
              ) : (
                <>
                  <span>{firstArabicTitleWord}</span>
                  {remainingArabicTitleWords.length > 0 && (
                    <span>{remainingArabicTitleWords.join(' ')}</span>
                  )}
                </>
              )}
            </h1>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};
