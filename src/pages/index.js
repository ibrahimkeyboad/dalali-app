import Container from '../components/main';
import HeadC from '../components/head';
import prisma from '../../db';

export async function getStaticProps() {
  await prisma.accommodation.deleteMany();
  await prisma.user.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.image.deleteMany();
  const data = await prisma.accommodation.findMany({
    include: {
      images: true,
    },
  });

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
