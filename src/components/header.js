import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiMoon, HiSun } from 'react-icons/hi';
import { links } from '../../util/links';
import Image from 'next/image';
import { HiSearch } from 'react-icons/hi';
import { useSession } from 'next-auth/react';
import style from '../../styles/header.module.css';

import { useFormik } from 'formik';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function Header() {
  const [mouted, setMouted] = useState(false);
  const { setTheme, systemTheme, theme } = useTheme();
  const { data } = useSession();
  const { asPath, push, query } = useRouter();
  const formik = useFormik({
    initialValues: {
      location: '',
    },

    onSubmit: onSubmitHandler,
  });

  function onSubmitHandler(value) {
    query.location = value.location;
    push({ pathname: '/search', query });
  }

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

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <Link className={style.logo} href='/'>
          Dalali
        </Link>

        <form
          onSubmit={formik.handleSubmit}
          className='flex-shrink-0  flex-grow-0 order-1 overflow-hidden flex justify-between border-gray-400 items-center lg:m-0 mt-4 md:basis-3/5 lg:basis-[50%] md:order-none basis-full border rounded-full'>
          <input
            {...formik.getFieldProps('location')}
            type='text'
            className={style.input}
            placeholder='Search location...'
          />
          <button
            type='submit'
            className='text-white py-1.5 px-5 basis-[8%] bg-[#034047]'>
            <HiSearch size={20} />
          </button>
        </form>

        {changeTheme()}

        {data ? (
          <Link href='/profile' className='relative h-12 w-12'>
            <Image
              placeholder='blur'
              blurDataURL={data?.user?.image}
              className='rounded-full object-cover'
              src={data?.user?.image}
              fill
              alt={data?.user?.name}
            />
          </Link>
        ) : (
          <div className='flex gap-4 items-center'>
            <Link className='text-[#034047] px-3 py-1' href='/login'>
              Login
            </Link>
            <Link
              className='bg-[#034047] font-semibold text-white px-3 py-2 rounded-xl'
              href='/signup'>
              Get Start
            </Link>
          </div>
        )}
      </nav>

      {!asPath.includes('search') && (
        <ul className='flex gap-10 justify-center'>
          {links.map((link) => (
            <Link
              key={link.name}
              className={`text-sm whitespace-nowrap my-3 mx-0 md:mx-4 ${
                asPath === link.link
                  ? 'text-[#034047] font-bold'
                  : ' text-[#676767]'
              }`}
              href={link.link}>
              {link.name}
            </Link>
          ))}
        </ul>
      )}
    </header>
  );
}

export default Header;
