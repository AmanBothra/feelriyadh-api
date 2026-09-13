import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { NextImage } from '~/components/common';
import { useTranslation } from '~/i18n/TranslationProvider';

export const FeaturesList = ({ data, featureImage }: any) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const { locale } = useTranslation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section ref={ref} className='py-16 lg:py-32 relative'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center'>
          <motion.div
            initial='hidden'
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
            className='w-full flex flex-col gap-8 lg:gap-16'
          >
            {data?.map((feature, index) => (
              <motion.div
                key={index}
                className='flex flex-col lg:flex-row gap-8 w-full'
                variants={featureVariants}
              >
                <div className='rounded-full w-24 h-24 flex items-center justify-center border border-primary text-primary shrink-0 p-4'>
                  <NextImage
                    src={feature?.icon}
                    className='w-16'
                    width={64}
                    height={64}
                    alt=''
                  />
                </div>
                <div className='w-full lg:w-3/4'>
                  <h4 className='uppercase font-medium text-xl mb-4'>
                    {locale == 'en' ? feature?.title_en : feature?.title_ar}
                  </h4>
                  <p
                    className='leading-relaxed text-base'
                    dangerouslySetInnerHTML={{
                      __html:
                        locale == 'en'
                          ? feature?.description_en
                          : feature?.description_ar,
                    }}
                  ></p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className='w-full'
          >
            <NextImage
              src={featureImage?.[0]?.image}
              alt='features'
              responsive
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
