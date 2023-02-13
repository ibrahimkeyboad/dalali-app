import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useGetCountryQuery } from '../context/country';
import TextInput from './input';
import AsyncSelect from 'react-select/async';
import { setCodeHandler } from '../context/sliceApp';
import { useDispatch } from 'react-redux';

function TellPhone({ country, formik, style }) {
  const { data } = useGetCountryQuery();
  const dispatch = useDispatch();
  const searchSelectedCountry = data?.find((obj) => {
    if (obj.name.common === country) {
      return true;
    }
    return false;
  });
  const root = searchSelectedCountry?.idd.root;
  const id = searchSelectedCountry?.idd.suffixes[0];
  const code = `${root}${id}`;

  if (!code.includes('undefine')) {
    console.log('set');
    dispatch(setCodeHandler(code));
  }

  return (
    <div className={style['input-control']}>
      <select
        {...formik.getFieldProps('country')}
        name='country'
        className='w-60 h-10 text-sm dark:bg-[#112240] font-bold outline-none border-b-2 '>
        <option className='text-gray-500'>Select your Country</option>
        {data &&
          data.map((item) => (
            <option
              className='text-gray-500'
              key={item.name.common}
              value={item.name.common}>
              {item.name.common}
            </option>
          ))}
      </select>
      <div className='flex flex-col '>
        <div className='flex  gap-3 mt-4'>
          {searchSelectedCountry && (
            <div className='flex border-b-2 gap-1 items-center'>
              <span className='relative object-cover w-8 h-6 shadow-md'>
                <Image fill src={searchSelectedCountry.flags.svg} alt='' />
              </span>
              <span>{code}</span>
            </div>
          )}
          <div>
            <TextInput
              type='text'
              hint='Your phone number'
              formik={formik}
              name='number'
            />
          </div>
        </div>

        {formik.errors && (
          <p className='text-red-400 text-sm'>
            {formik.errors && formik.touched.number && formik.errors.number}
          </p>
        )}
      </div>
    </div>
  );
}

export default TellPhone;
