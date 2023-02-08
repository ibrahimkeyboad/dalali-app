import React from 'react';

function Options() {
  return (
    <div>
      <label className='mr-3'>Choose a Property</label>
      <select className='bg-cyan-600 text-white hover:bg-sky-500 p-2 outline-none'>
        <option>Please select the option</option>
        <option>Apartment</option>
        <option>Cinemas</option>
        <option>Houses</option>
        <option>Hostels</option>
        <option>Guest House</option>
        <option>Restaurants</option>
        <option>Logdes</option>
      </select>
    </div>
  );
}

export default Options;
