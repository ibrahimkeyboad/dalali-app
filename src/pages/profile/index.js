import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import Aside from '../../components/aside';
import Container from '../../components/main';
import ProfileHeader from '../../components/ProfileHeader';
import prisma from '../../../db';
import { authOptions } from '../api/auth/[...nextauth]';

export async function getServerSideProps({ req, res }) {
  const { user } = await getServerSession(req, res, authOptions);
  const data = await prisma.accommodation.findMany({
    where: {
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
function AllProperties({ user, data }) {
  return (
    <>
      <Aside amount={data.length} />
      <ProfileHeader user={user} />

      <main>
        <nav className='flex justify-center gap-8 p-6'>
          <Link
            className='text-[#034047] font-bold'
            href='/profile/all-properties'>
            All data
          </Link>
          <Link href='/profile/disable-properties'>Taken Propeties</Link>
        </nav>
        {data.length === 0 ? (
          <div className='grid justify-center'>
            <h1 className='text-center text-lg'>No data</h1>
            {/* <button className='' onClick={logoutHandler}>
              Log out
            </button> */}

            <Link href='/profile/create'>Start upload</Link>
          </div>
        ) : (
          <Container data={data} />
        )}
      </main>
    </>
  );
}

export default AllProperties;
