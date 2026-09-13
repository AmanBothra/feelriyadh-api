import { motion } from 'framer-motion';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import { NextImage } from '~/components/common';
import { useTranslation } from '~/i18n/TranslationProvider';

export const Features = ({ data }) => {
  const { locale } = useTranslation();

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={ref}
      className='py-16 lg:py-32 relative text-white bg-primary'
    >
      <div className='container'>
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, duration: 1 },
            },
          }}
          className='grid gap-8 grid-cols-2 lg:grid-cols-none lg:grid-flow-col lg:auto-cols-auto w-full'
        >
          {data?.map((feature) => (
            <motion.div
              key={feature?.id}
              className='flex flex-col justify-center text-center items-center border border-white border-opacity-20 hover:bg-white hover:bg-opacity-20 transition-all duration-300 h-36 lg:h-48 w-full p-4 uppercase text-xl font-jost font-medium'
              variants={featureVariants}
            >
              <motion.span className='w-12 h-12 text-white'>
                <NextImage
                  src={feature?.icon}
                  className='w-12 h-12'
                  alt=''
                  width={48}
                  height={48}
                />
              </motion.span>
              <motion.div className='mt-4 text-xl rtl:!font-readex'>
                {locale == 'en' ? feature?.title_en : feature?.title_ar}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
