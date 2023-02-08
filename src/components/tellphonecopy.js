import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useGetCountryQuery } from '../context/country';
import AsyncSelect from 'react-select/async';

function TellPhone({ changeHandler, number, country, setCode }) {
  const { data } = useGetCountryQuery();
  const searchSelectedCountry = data?.find((obj) => {
    if (obj.name.common === country) {
      return true;
    }
    return false;
  });

  const root = searchSelectedCountry?.idd.root;
  const id = searchSelectedCountry?.idd.suffixes[0];
  const code = `${root}${id}`;

  setCode(code);

  function changeHandler(values) {
  }

  return (
    <div>
      <AsyncSelect onChange={changeHandler} options={data} />

      <div className='flex gap-3 mt-4 '>
        {searchSelectedCountry && (
          <div className='flex border-b-2 gap-1 items-center'>
            <span className='relative object-cover w-8 h-6 shadow-md'>
              <Image fill src={searchSelectedCountry.flags.svg} alt='' />
            </span>
            <span>{code}</span>
          </div>
        )}

        <input
          type='text'
          placeholder='Your phone number'
          onChange={changeHandler}
          value={number}
          name='number'
          className='border-b-2 outline-none focus:border-[#098366] text-gray-600 px-2 py-1'
        />
      </div>
    </div>
  );
}

export default TellPhone;
