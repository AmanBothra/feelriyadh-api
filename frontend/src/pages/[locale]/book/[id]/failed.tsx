import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { FaTimes } from 'react-icons/fa';

import { Button, SubHeader } from '~/components/common';
import { useTranslation } from '~/i18n/TranslationProvider';

const BookFailedPage = () => {
  const { translate, locale } = useTranslation();
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
        <title>{translate('booking failed')}</title>
      </Head>
      <SubHeader containerStyles='!h-screen lg:!h-[100vh] flex items-center justify-center'>
        <div className='lg:py-16 py-8 text-black lg:max-w-2xl w-full mx-auto px-8 rounded-lg bg-white h-fit'>
          <div className='flex flex-col text-center w-full h-full justify-center lg:space-y-8 space-y-4'>
            <div className='text-red-500 uppercase font-medium relative z-10 flex flex-col text-5xl lg:!text-6xl leading-tight text-center'>
              <FaTimes className='w-12 mx-auto text-center mb-2' />
              <span>{translate('booking failed')} </span>
            </div>
            <div>
              <div className='text-lg'>
                {translate('failed booking message')}
              </div>
            </div>
            <Button
              onClick={() => router.push(`/${locale}`)}
              className='w-fit mx-auto'
            >
              {translate('back to home')}
            </Button>
          </div>
        </div>
      </SubHeader>
    </>
  );
};

BookFailedPage.hideFooter = true;
export default BookFailedPage;
