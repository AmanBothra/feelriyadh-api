import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';

import { useTranslation } from '~/i18n/TranslationProvider';

export const Footer = () => {
  const { translate, locale } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchAboutData = async () => {
      setLoading(true);
      try {
        const { data: about } = await axios.get('/api/about');
        setData(about.data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []); // Empty dependency array to ensure it runs only once

  return (
    <footer className='bg-secondary w-full text-white'>
      <div className='container'>
        <div className='py-8 lg:py-16 w-full flex lg:flex-row lg:gap-0 gap-12 lg:items-start items-center lg:text-start text-center flex-col justify-between border-b border-white border-opacity-10'>
          <div className='flex gap-4 lg:gap-8 flex-col lg:flex-row uppercase'>
            <Link
              className='hover:text-primary transition-all duration-300'
              href='/'
            >
              {translate('home')}
            </Link>
            <Link
              className='hover:text-primary transition-all duration-300'
              href='/'
            >
              {translate('about')}
            </Link>
            <Link
              className='hover:text-primary transition-all duration-300'
              href='/'
            >
              {translate('chalets')}
            </Link>
            <Link
              className='hover:text-primary transition-all duration-300'
              href='/'
            >
              {translate('contact us')}
            </Link>
          </div>
          {!loading && (
            <div className='flex gap-4 lg:gap-8  uppercase'>
              <a
                className='hover:text-primary transition-all duration-300'
                href={data?.facebook}
                target='_blank'
                rel='noreferrer'
              >
                <FaTiktok />
              </a>
              <a
                className='hover:text-primary transition-all duration-300'
                href={data?.instagram}
                target='_blank'
                rel='noreferrer'
              >
                <FaInstagram />
              </a>
              <a
                className='hover:text-primary transition-all duration-300'
                href={data?.twitter}
                target='_blank'
                rel='noreferrer'
              >
                <FaTwitter />
              </a>
            </div>
          )}
        </div>
        <div className='py-8 lg:py-16 w-full flex items-center flex-col'>
          <img
            src='/symbol.png'
            alt='symbol'
            className='!w-fit !h-56 mb-8 lg:mb-16'
          />
          <div className='text-primary font-medium text-3xl lg:text-6xl'>
            {locale == 'en' ? data?.mobile_number_en : data?.mobile_number_ar}
          </div>
          <div className='mt-8 lg:mt-16 flex flex-col items-center'>
            <div className='text-[#71677A] mb-4'>
              {translate('our location')}
            </div>
            <div
              className='mb-2 text-center'
              dangerouslySetInnerHTML={{
                __html: locale == 'en' ? data?.address_en : data?.address_ar,
              }}
            ></div>
            <div className='relative w-[90vw] lg:w-[40dvw] aspect-w-16 aspect-h-9'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.4555562254536!2d46.626019899999996!3d24.9165462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2eef319163241d%3A0x17da98145d88b138!2sFeel!5e0!3m2!1sen!2seg!4v1708342638760!5m2!1sen!2seg'
                className='absolute top-0 left-0 w-full h-full'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            </div>
          </div>
        </div>
        <div className='py-8 lg:py-32 lg:pb-16 w-full flex flex-col lg:flex-row lg:gap-0 gap-12 lg:items-start items-center lg:text-start text-center justify-between text-[#71677A]'>
          <div className='flex gap-4 lg:gap-8 flex-col lg:flex-row uppercase'>
            © {new Date().getFullYear()} {translate('copyrights')}
          </div>
          <div className='flex gap-2 lg:gap-8 capitalize'>
            <Link
              className='hover:text-primary transition-all duration-300'
              href='/'
            >
              {translate('privacy policy')}
            </Link>
            <Link
              className='hover:text-primary transition-all duration-300'
              href='/'
            >
              {translate('cookies')}
            </Link>
            <Link
              className='hover:text-primary transition-all duration-300'
              href='/'
            >
              {translate('documents')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
