import HeadC from '../../components/head';
import Container from '../../components/main';
import prisma from '../../../db';

export const getStaticProps = async () => {
  const apartments = await prisma.accommodation.findMany({
    where: {
      type: {
        contains: 'house',
      },
    },
    include: {
      images: true,
    },
  });

  await prisma.$disconnect();

  return {
    props: { apartments },
    revalidate: 10,
  };
};

export default function Page({ houses = [] }) {
  return (
    <>
      <HeadC
        title='House list'
        description='List of houses for different cities '
      />
      <Container data={houses} />
    </>
  );
}
