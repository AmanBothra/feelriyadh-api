import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/outline';
import cn from 'classnames';
import React from 'react';

interface SwiperNavigationProps {
  slideNext: () => void;
  slidePrev: () => void;
  className?: string;
  iconsColor?: string;
}

export const SwiperNavigation = ({
  slideNext,
  slidePrev,
  className,
  iconsColor,
}: SwiperNavigationProps) => {
  return (
    <>
      <button
        onClick={slidePrev}
        className={cn(
          'w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-primary flex items-center justify-center shrink-0 transition-all duration-300 hover:bg-primary',
          className ? className : null,
        )}
      >
        <ArrowLongLeftIcon
          className={cn(
            'text-white w-8 rtl:rotate-180',
            iconsColor ? iconsColor : null,
          )}
        />
      </button>
      <button
        onClick={slideNext}
        className={cn(
          'w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-primary flex items-center justify-center shrink-0 transition-all duration-300 hover:bg-primary',
          className ? className : null,
        )}
      >
        <ArrowLongRightIcon
          className={cn(
            'text-white w-8 rtl:rotate-180',
            iconsColor ? iconsColor : null,
          )}
        />
      </button>
    </>
  );
};
