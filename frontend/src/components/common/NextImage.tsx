import cn from 'classnames';
import Image, { ImageProps } from 'next/image';
import React from 'react';
interface NextImageProps extends ImageProps {
  responsive?: boolean;
}

export const NextImage = ({
  src,
  alt,
  width,
  height,
  responsive,
  className,
  ...props
}: NextImageProps) => {
  return (
    <>
      {responsive ? (
        <Image
          src={src}
          alt={alt}
          width='0'
          height='0'
          sizes='100vw'
          className={cn('w-full h-auto', className)}
          {...props}
        />
      ) : (
        <Image src={src} alt={alt} width={width} height={height} {...props} />
      )}
    </>
  );
};
