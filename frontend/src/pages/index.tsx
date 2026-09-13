export default function Home() {
  return <></>;
}

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: '/ar',
    },
  };
}
