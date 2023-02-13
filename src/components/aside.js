import { useTheme } from 'next-themes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

function Aside({ amount }) {
  const [mouted, setMouted] = useState(false);
  const { setTheme, systemTheme, theme } = useTheme();

  useEffect(() => {
    setMouted(true);
  }, []);

  function changeTheme() {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    if (!mouted) return null;

    if (currentTheme === 'dark') {
      return (
        <HiSun
          className='w-7 h-7'
          role='button'
          onClick={() => setTheme('light')}
        />
      );
    } else {
      return (
        <HiMoon
          className='w-7 h-7'
          role='button'
          onClick={() => setTheme('dark')}
        />
      );
    }
  }
  console.log('amaount', amount);
  return (
    <aside className='bg-[#0a192f] p-2 text-white'>
      <nav className='flex py-4 gap-[30vw] md:gap-[40vw] justify-center m-auto  max-w-[1240px]'>
        <Link href='/'>Dalali</Link>

        <ul className='flex gap-3 md:gap-6'>
          <li>
            <Link href=' /profile'>Properties</Link>
          </li>
          <li>{changeTheme()}</li>
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
