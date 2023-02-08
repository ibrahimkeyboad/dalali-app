import React from 'react';
import Filter from '../../components/filter';
import HeadC from '../../components/head';
import Container from '../../components/main';
import prisma from '../../../db';

export async function getServerSideProps({ query }) {
  console.log(query);
  let data;

  const property = query.property || '';
  const location = query.location || '';
  const minPrice = +query.minPrice || 1;
  const maxPrice = +query.maxPrice || 9999999;
  const bed = +query.bed || 1;
  const bath = +query.bath || 1;
  const duration = query.duration || '';

  data = await prisma.accommodation.findMany({
    where: {
      location: {
        contains: location,
      },
      type: {
        contains: property,
      },
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
      bathrooms: {
        gte: bath,
      },
      bedrooms: {
        gte: bed,
      },
      duration: {
        contains: duration,
      },
    },
    include: {
      images: true,
    },
  });

  await prisma.$disconnect();

  return {
    props: { data },
  };
}

function Search({ data }) {
  return (
    <>
      <HeadC title='Seaching' description={`searching details`} />
      <Filter />

      <div className='my-5' />

      <Container data={data} />
    </>
  );
}

export default Search;
