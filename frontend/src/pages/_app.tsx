import { NextComponentType, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';

import { ContactFloatingButton } from '~/components/common';
import { Footer, Header } from '~/components/Layout';
import {
  TranslationProvider,
  useTranslation,
} from '~/i18n/TranslationProvider';

interface CustomAppProps extends AppProps {
  Component: NextComponentType<NextPageContext> & {
    hideFooter?: boolean;
  };
}

const App = ({ Component, pageProps }: CustomAppProps) => {
  const router = useRouter();
  const { setLocale, translate, locale } = useTranslation();
  useEffect(() => {
    // Set the locale from the URL for server-side rendering
    if (router.asPath.startsWith('/ar')) {
      setLocale('ar');
    } else {
      setLocale('en');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return (
    <TranslationProvider>
      <DefaultSeo
        description={`${translate('seo description') as string}`}
        defaultTitle={`${translate('web title') as string}`}
        titleTemplate='%s | My Website'
        openGraph={{
          description: translate('seo description') as string,
          locale: locale,
          type: 'website',
          images: [
            {
              url: '/favicon.ico',
            },
          ],
        }}
      />
      <Toaster
        position='top-center'
        toastOptions={{
          className: '',
          style: {
            zIndex: 9999999999999,
          },
        }}
      />

      <Header />
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <main>
        <Component {...pageProps} />
        <ContactFloatingButton />
      </main>
      {Component?.hideFooter ? null : <Footer />}
    </TranslationProvider>
  );
};

export default App;
