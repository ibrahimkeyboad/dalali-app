import Container from '../components/main';
import HeadC from '../components/head';
import prisma from '../../db';

export async function getStaticProps() {
  const data = await prisma.accommodation.findMany({
    include: {
      images: true,
    },
  });

  console.log(data);

  return {
    props: { data },
    revalidate: 10,
  };
}

function Home({ data }) {
  return (
    <>
      <Container data={data} />
    </>
  );
}

export default Home;
