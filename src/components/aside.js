import Link from 'next/link';
import React from 'react';

function Aside({ amount }) {
  console.log('amaount', amount);
  return (
    <aside className='bg-[#0b2744] p-2 text-white'>
      <nav className='flex py-4 gap-[30vw] md:gap-[40vw] justify-center m-auto  max-w-[1240px]'>
        <Link href='/'>Dalali</Link>

        <ul className='flex gap-3 md:gap-6'>
          <li>
            <Link href=' /profile'>Properties</Link>
          </li>
          <li>
            <Link href={amount <= 5 ? '/profile/create' : '/plan'}>Upload</Link>
          </li>
          <li>
            <Link href='/profile/settings'>Setting</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Aside;
