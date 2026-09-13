import Head from 'next/head';

import {
  About,
  Chalets,
  Contact,
  FeaturesList,
  HeroSection,
  Splendor,
} from '~/components/Home';
import { useTranslation } from '~/i18n/TranslationProvider';
import { Axios } from '~/utils';

export default function Home({
  about,
  hero,
  counter,
  gallery,
  chalet,
  // amenities,
  splendor,
  feature,
  featureImage,
}) {
  const { translate } = useTranslation();
  return (
    <>
      <Head>
        <title>{translate('web title')}</title>
      </Head>
      <HeroSection data={hero} />
      <About data={about} counter={counter} gallery={gallery} />
      <Chalets data={chalet} />
      {/* <Features data={amenities} /> */}
      <Splendor data={splendor} />
      <FeaturesList data={feature} featureImage={featureImage} />
      <Contact />
    </>
  );
}

export const getServerSideProps = async () => {
  try {
    const { data: about } = await Axios.get('/about');
    const { data: hero } = await Axios.get('/banner');
    const { data: counter } = await Axios.get('/counter');
    const { data: gallery } = await Axios.get('/gallery');
    const { data: chalet } = await Axios.get('/chalet');
    // const { data: amenities } = await Axios.get('/amenities');
    const { data: splendor } = await Axios.get('/splendor');
    const { data: feature } = await Axios.get('/feature');
    const { data: featureImage } = await Axios.get('/feature-image');
    return {
      props: {
        about: about?.results?.[0] ?? [],
        counter: counter?.results ?? [],
        gallery: gallery?.results ?? [],
        chalet: chalet?.results ?? [],
        // amenities: amenities?.results ?? [],
        splendor: splendor?.results ?? [],
        feature: feature?.results ?? [],
        hero: hero?.results ?? [],
        featureImage: featureImage?.results ?? [],
      },
    };
  } catch (error) {
    return {
      props: {
        props: {
          about: [],
          counter: [],
          gallery: [],
          chalet: [],
          // amenities: [],
          splendor: [],
          feature: [],
          hero: [],
          featureImage: [],
        },
      },
    };
  }
};
