import { unstable_getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import Aside from '../../components/aside';
import Container from '../../components/main';
import ProfileHeader from '../../components/ProfileHeader';
import prisma from '../../db';
import { authOptions } from '../api/auth/[...nextauth]';

export async function getServerSideProps({ req, res }) {
  const { user } = await unstable_getServerSession(req, res, authOptions);
  const data = await prisma.accommodation.findMany({
    where: {
      isAvailable: false,
      userId: user.email.id,
    },
    include: {
      images: true,
    },
  });

  await prisma.$disconnect();

  return {
    props: { data, user },
  };
}
function DisableProperties({ user, data }) {
  return (
    <>
      <Aside amount={data.length} />
      <ProfileHeader user={user} />
      <main>
        <nav className='flex justify-center gap-8 p-6'>
          <Link href='/profile/all-properties'>All data</Link>
          <Link
            className='text-[#034047] font-bold'
            href='/profile/disable-properties'>
            Taken Propeties
          </Link>
        </nav>{' '}
        {!data.length === 0 ? (
          <Container data={data} />
        ) : (
          <div className='flex mt-9 justify-center'>
            <h2>No data is marked unavailable</h2>
          </div>
        )}
      </main>
    </>
  );
}

export default DisableProperties;
