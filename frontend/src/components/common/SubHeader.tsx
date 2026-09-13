import cn from 'classnames';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import {
  Parallax,
  ParallaxProps,
  ParallaxProvider,
} from 'react-scroll-parallax';

interface SubHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  containerStyles?: string;
  image?: string;
}

export const SubHeader = ({
  children,
  containerStyles,
  image,
}: SubHeaderProps) => {
  const controls = useAnimation();

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
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={controls}
      className=''
    >
      <ParallaxProvider>
        <div className='relative overflow-hidden'>
          <Parallax {...({ y: [-20, 20] } as ParallaxProps)}>
            <div
              className={cn(
                'parallax relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:bg-opacity-[0.15] before:z-10 bg-cover bg-center bg-no-repeat h-[60vh] lg:h-[95vh]',
                containerStyles,
              )}
              style={{
                backgroundImage: `url("${image ? image : '/subpage-bg.png'}")`,
              }}
            ></div>
            <div className='absolute inset-0 w-full h-full flex items-center'>
              <div className='container relative z-[100] '>{children}</div>
            </div>
          </Parallax>
        </div>
      </ParallaxProvider>
    </motion.section>
  );
};
