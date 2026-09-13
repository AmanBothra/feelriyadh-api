import { GetStaticPaths } from 'next';
import Head from 'next/head';

import { Booking, BookingHeader } from '~/components/Booking';
import { useTranslation } from '~/i18n/TranslationProvider';
import { Axios } from '~/utils';

export default function BookPage({ data }) {
  const { translate } = useTranslation();
  return (
    <>
      <Head>
        <title>{translate('web title')}</title>
      </Head>
      <BookingHeader data={data} />
      <Booking data={data} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async (ctx) => {
  const { id } = ctx.params;
  const { data } = await Axios.get(`/chalet/${id}`);

  return {
    props: {
      data: data?.results ?? [],
    },
    revalidate: true,
  };
};
