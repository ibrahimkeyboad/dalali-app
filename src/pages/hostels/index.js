import HeadC from '../../components/head';
import Container from '../../components/main';
import prisma from '../../../db';

export const getStaticProps = async () => {
  const apartments = await prisma.accommodation.findMany({
    where: {
      type: {
        contains: 'hostel',
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

export default function Page({ hostels = [] }) {
  return (
    <>
      <HeadC
        title='Hostels List'
        description='List of hostels for different cities '
      />
      <Container data={hostels} />
    </>
  );
}
