import React, { useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import TextInput from './input';

function FormInput({ hint, label, name }) {
  const [show, setShow] = useState(false);
  return (
    <div className=''>
      <div className='flex gap-3 items-center'>
        <label className='text-xl'>{label}</label>
        {/* <button onClick={() => setShow((prev) => !prev)}>
          <FiInfo size={17} />
        </button> */}
        {/* {show && <p>{description || 'Hello World'}</p>} */}
      </div>
      <TextInput required hint={hint} type='text' name={name} />
    </div>
  );
}

export default FormInput;
