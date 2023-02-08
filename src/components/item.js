import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { GoPrimitiveDot } from 'react-icons/go';
import { useAvailableMutation } from '../context/apartmentSlice';

function Item({ data, style }) {
  const [update] = useAvailableMutation();
  const [show, setShow] = useState(false);
  const { asPath } = useRouter();

  function handelerActivate(id) {
    const datas = { id: id, value: !data.isAvailable };
    update(datas);
  }

  function handlerDelete(id) {
    console.log(id);
  }
  return (
    <article className='relative overflow-hidden'>
      <Link href={`/${data.type.trim()}s/${data.id}`}>
        <Image
          placeholder='blur'
          blurDataURL={data.images[0].url}
          src={data.images[0].url}
          className='rounded-lg object-cover'
          alt={data?.title}
          width={400}
          height={550}
          priority
        />
        <div className={style.detail}>
          <div className='flex gap-2 text-sm text-[#496265]'>
            <span>{data.bathrooms} bathrooms</span>
            <span>{data.bedrooms} bedrooms</span>
            <span>{data.area} sqft</span>
          </div>

          <div className='flex flex-col'>
            <h3 className={style.name}>{data.title}</h3>
            <h4 className='text-base font-semibold'>{`Tsh ${data.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/${data.duration}`}</h4>
            <h4 className={style.location}>
              {data.street} {data.city}
            </h4>
          </div>
        </div>
      </Link>
      {asPath.includes('profile') && (
        <>
          <button
            onClick={() => setShow((prevState) => !prevState)}
            className='absolute top-1 right-1 bg-white p-2 rounded-full'>
            <HiOutlineDotsHorizontal size={20} />
          </button>
          {show && (
            <div className='absolute top-0 right-0 w-[40%] rounded-bl-lg  flex flex-col gap-2 bg-slate-200 '>
              <Link
                href={`/profile/create/${data.id}`}
                className='text-[#034047] flex p-1 gap-4 items-center hover:bg-slate-300'>
                <span className='bg-white p-2 flex rounded-full'>
                  <MdModeEditOutline />
                </span>
                <span>Edit</span>
              </Link>
              <button
                onClick={() => handlerDelete(data.id)}
                className='text-red-600 flex p-1 gap-4 hover:bg-slate-300 items-center'>
                <span className='bg-white p-2 flex rounded-full'>
                  <MdDelete />
                </span>
                <span>Delete</span>
              </button>
              <button
                onClick={() => handelerActivate(data.id)}
                className='hover:bg-slate-300 ml-1 p-1 flex gap-5 items-center'>
                <span
                  className={`bg-white shadow-md ${
                    data.isAvailable ? 'text-green-500' : 'text-red-600'
                  }   flex rounded-full`}>
                  <GoPrimitiveDot size={20} />
                </span>
                <span>Activate</span>
              </button>
              <button
                onClick={() => setShow((prevState) => !prevState)}
                className='hover:bg-slate-300 ml-1 p-1 self-end flex gap-5 items-center'>
                <span className='bg-white shadow-md rounded-full p-2'>
                  <IoMdClose size={10} />
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </article>
  );
}

export default Item;
