import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { Button, SubHeader } from '~/components/common';
import { useTranslation } from '~/i18n/TranslationProvider';

const NotFoundPage = () => {
  const { translate, locale } = useTranslation();
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
        <title>404</title>
      </Head>
      <SubHeader containerStyles='!h-screen lg:!h-[100vh]'>
        <div className='lg:py-32 py-16 text-white'>
          <div className='flex flex-col text-center w-full h-full justify-center lg:space-y-8 space-y-4'>
            <div className='text-white uppercase font-medium relative z-10 flex flex-col text-5xl lg:!text-9xl leading-tight text-center'>
              <span>{translate('404')}</span>
            </div>
            <div>
              <div className='text-4xl'>{translate('404 title')}</div>
              <div className='mt-4 text-xl'>{translate('404 description')}</div>
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

NotFoundPage.hideFooter = true;
export default NotFoundPage;
