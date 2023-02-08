import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { IoFilter } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHandler } from '../context/sliceApp';
import { filterData } from '../../util/filtterData';
import { CustomSelect } from './CustomSelect';

function FilterSeach() {
  const { pathname, push, query } = useRouter();
  const dispatch = useDispatch();

  const { toggle } = useSelector((state) => state.slices);

  function changeHandler(data) {
    console.log(Array.isArray(data.value));

    query[data.name] = data.value.value;
    console.log(query);
  }

  function filterHandler() {
    push({ pathname, query });
  }

  console.log(query);

  return (
    <div className='bg-gray-100 p-5'>
      <div className='flex justify-center items-center gap-5'>
        <h3>Filter search</h3>
        <button onClick={() => dispatch(toggleHandler())}>
          <IoFilter size={20} />
        </button>
      </div>
      {toggle && (
        <div className='flex flex-wrap justify-center gap-8 p-4 items-center relative'>
          {filterData.map((select) => (
            <CustomSelect
              key={select.name}
              onChange={(value) =>
                changeHandler({ value: value, name: select.name })
              }
              label={select.name}
              options={select.options}
              multi={select.isMulti}
              placeholder={select.placeholder}
            />
          ))}

          <button
            onClick={filterHandler}
            className='absolute bottom-0 right-0 bg-[#098366] hover:bg-[#034047] active:bg-[#034047] duration-100 text-gray-50 shadow-lg py-1 px-3 rounded-lg'>
            {/* <HiAdjustmentsHorizontal size={20} /> */}
            <p>Filter</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterSeach;
