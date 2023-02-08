import HeadC from '../../components/head';
import Container from '../../components/main';
import prisma from '../../../db';

export const getStaticProps = async () => {
  const apartments = await prisma.accommodation.findMany({
    where: {
      type: {
        contains: 'apartment',
      },
    },
    include: {
      images: true,
    },
  });

  await prisma.$disconnect();

  return {
    props: { apartments },
  };
};

export default function Page({ apartments = [] }) {
  return (
    <>
      <HeadC
        title='Apartments'
        description='List of Apartments for different cities '
      />
      <Container data={apartments} />
    </>
  );
}
