import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';
import { HiMenuAlt1 } from 'react-icons/hi';
import { CSSTransition } from 'react-transition-group';

import { Button } from '~/components/common';
import { useTranslation } from '~/i18n/TranslationProvider';

export const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setLocale, translate, locale } = useTranslation();
  const router = useRouter();
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

  const handleChangeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    const { asPath, pathname } = router;
    const newPath = asPath.replace(/^\/[a-z]{2}\//, '/');
    router.push(`${pathname}`, `/${newLocale}${newPath}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isScrolling = scrollTop > 0;
      setScrolling(isScrolling);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleBodyOverflow = () => {
      if (menuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    handleBodyOverflow();

    return () => {
      document.body.style.overflow = ''; // Cleanup
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        'bg-transparent text-white fixed h-32 z-[100] w-full duration-300 transition-all flex items-center',
        scrolling && '!bg-secondary',
      )}
    >
      <div className='container'>
        <div className='hidden xl:flex items-center w-full justify-between gap-8'>
          <div className='text-2xl flex items-center gap-24 uppercase '>
            <div
              className='flex gap-4 items-center cursor-pointer uppercase'
              onClick={() => setMenuOpen(true)}
            >
              <HiMenuAlt1 className='w-8 h-8  rtl:!rotate-180' />{' '}
              {translate('menu')}
            </div>
            <Link href={`/${locale}`} className='flex shrink-0'>
              <Image
                src='/logo.png'
                className=''
                width={110}
                height={41}
                alt='logo'
                priority
              />
            </Link>
          </div>
          <div className='flex gap-14 items-center text-white text-lg'>
            <div>
              {locale == 'en' ? data?.mobile_number_en : data?.mobile_number_ar}
            </div>
            {!loading && <SocialMedia data={data} />}
            <Language handleChangeLanguage={handleChangeLanguage} />
            <Button className='bg-white !text-secondary hover:!text-white'>
              {translate('book with us')}
            </Button>
          </div>
        </div>

        {/* Mobile Menu  */}
        <div className='flex xl:hidden justify-between gap-8 '>
          <div className='flex items-center gap-4 shrink-0'>
            <Link href={`/${locale}`}>
              <Image
                src='/logo.png'
                width={110}
                height={41}
                alt='logo'
                priority
              />
            </Link>
          </div>
          <div className='flex items-center gap-3'>
            <div
              className='flex gap-4 items-center cursor-pointer uppercase'
              onClick={() => setMenuOpen(true)}
            >
              <HiMenuAlt1 className='w-8 h-8 rtl:!rotate-180' />
              {translate('menu')}
            </div>
          </div>
        </div>

        {/* Animation for Menu */}
        <CSSTransition
          in={menuOpen}
          timeout={300}
          classNames='menu'
          unmountOnExit
        >
          <Menu
            closeMenu={() => setMenuOpen(false)}
            handleChangeLanguage={handleChangeLanguage}
            data={data}
          />
        </CSSTransition>
      </div>
    </header>
  );
};

const Language = ({ handleChangeLanguage }) => {
  return (
    <div className='flex items-center gap-2 lg:gap-5'>
      <div
        onClick={() => handleChangeLanguage('en')}
        className='hover:text-primary transition-all duration-300 cursor-pointer'
      >
        EN
      </div>
      <span className='font-thin'>|</span>
      <div
        onClick={() => handleChangeLanguage('ar')}
        className='hover:text-primary transition-all duration-300 cursor-pointer font-readex'
      >
        العربية
      </div>
    </div>
  );
};

const SocialMedia = ({ data }) => {
  return (
    <div className='flex items-center gap-5'>
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
        rel='noreferrer'
      >
        <FaInstagram />
      </a>
      <a
        className='hover:text-primary transition-all duration-300'
        href={data?.twitter}
        rel='noreferrer'
      >
        <FaTwitter />
      </a>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Menu = ({ closeMenu, handleChangeLanguage, data }: any) => {
  const { translate } = useTranslation();

  return (
    <div className='w-full flex items-center justify-center flex-col bg-white absolute h-screen overflow-hidden inset-0 text-black duration-300 transition-all text-lg font-medium'>
      <div
        className='absolute top-12 right-6 cursor-pointer group flex items-center'
        onClick={closeMenu}
      >
        <XMarkIcon className='w-8 h-8 group-hover:text-primary duration-300 transition-all' />{' '}
        <span className='group-hover:text-primary duration-300 transition-all uppercase'>
          {translate('close')}
        </span>
      </div>

      <div className='flex flex-col uppercase text-2xl my-auto text-center'>
        <div className='flex flex-col gap-8'>
          <Link
            className='hover:text-primary transition-all duration-300 flex items-center justify-center gap-4'
            href='/'
            onClick={closeMenu}
          >
            {translate('home')}{' '}
            <ArrowUpRightIcon className='w-4 h-4 opacity-40' />
          </Link>
          <Link
            className='hover:text-primary transition-all duration-300 flex items-center justify-center gap-4'
            href='/'
            onClick={closeMenu}
          >
            {translate('about')}{' '}
            <ArrowUpRightIcon className='w-4 h-4 opacity-40' />
          </Link>
          <Link
            className='hover:text-primary transition-all duration-300 flex items-center justify-center gap-4'
            href='/'
            onClick={closeMenu}
          >
            {translate('chalets')}{' '}
            <ArrowUpRightIcon className='w-4 h-4 opacity-40' />
          </Link>
          <Link
            className='hover:text-primary transition-all duration-300 flex items-center justify-center gap-4'
            href='/'
            onClick={closeMenu}
          >
            {translate('contact us')}{' '}
            <ArrowUpRightIcon className='w-4 h-4 opacity-40' />
          </Link>
        </div>
      </div>

      <div className='flex fixed bottom-0 left-0 w-full p-6 justify-between border-t border-secondary border-opacity-10'>
        <div className='text-center flex items-center [&>div]:justify-center [&>div]:w-full'>
          <SocialMedia data={data} />
        </div>
        <div className='text-center flex items-center [&>div]:justify-center [&>div]:w-full'>
          <Language handleChangeLanguage={handleChangeLanguage} />
        </div>
      </div>
    </div>
  );
};
