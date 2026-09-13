import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export const ContactFloatingButton = () => {
  return (
    <a
      href='https://wa.me/966531118104'
      target='_blank'
      rel='noreferrer'
      className='fixed bottom-[5dvh] ltr:right-8 rtl:left-8 w-12 h-12 rounded-full flex shadow-xl items-center justify-center bg-green-500 z-50'
    >
      <FaWhatsapp className='text-white text-3xl' />
    </a>
  );
};
