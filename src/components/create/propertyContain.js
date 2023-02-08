import React, { useState } from 'react';
import TextInput from '../input';
import Select from 'react-select';

function PropertyContain({ style }) {
  const [contain, setContain] = useState(false);
  const options = [
    { value: 'furnished ', label: 'furnished ' },
    { value: 'unfurnished ', label: 'unfurnished ' },
  ];
  function handlerChange(data) {
    if (data.value === options[0].value) {
      setContain(true);
    } else {
      setContain(false);
    }
  }

  return (
    <div className={`items-center ${style.container}`}>
      <div className='flex flex-col md:flex-row gap-3'>
        <h3>Property contain </h3>

        <Select
          instanceId='id'
          onChange={handlerChange}
          placeholder='Select type property'
          options={options}
        />
      </div>

      <div className='grid md:grid-cols-2 flex-wrap gap-6  mt-2'>
        <div>
          <TextInput hint='Bathroom' type='number' name='bathrooms' />
        </div>
        <div>
          <TextInput type='number' name='bedrooms' hint='Bedrooms' />
        </div>
        {contain && (
          <>
            <div>
              <TextInput type='number' name='bed' hint='Bed' />
            </div>
            <div>
              <TextInput type='number' name='sofa' hint='Sofa' />
            </div>
          </>
        )}
        <div>
          <TextInput type='number' name='area' hint='Plot size   (sqft)' />
        </div>
      </div>
    </div>
  );
}

export default PropertyContain;
