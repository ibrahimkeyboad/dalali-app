import React from 'react';

function Page() {
  return (
    <section className='mt-[10%]'>
      <h2 className='text-center'>Choose the right plan for you!</h2>
      <div className='flex flex-wrap justify-center gap-10 mt-5'>
        <figure className='shadow-xl grid justify-start p-5 basis-[50%] md:basis-[15%] rounded-md'>
          <h4 className='tracking-widest text-2xl '>Trial</h4>
          <p className='text-gray-500'>only</p>
          <h3 className='text-4xl'>Free</h3>
          <ul className='mt-2 text-base'>
            <li>Upload 5 images</li>
            <li>Post 3 properties</li>
            <li>Contain Ads</li>
          </ul>
          <button className='bg-slate-600 text-white py-1 px-3 rounded-lg shadow-md mt-4'>
            Start Trial
          </button>
        </figure>
        <figure className='shadow-xl grid justify-start p-5 md:basis-[15%] rounded-md'>
          <h4 className='tracking-widest text-2xl '>Premium</h4>
          <p className='text-gray-500'>only</p>
          <h3 className='text-4xl'>$5.00</h3>
          <p>USD / month</p>
          <ul className='mt-2 text-base'>
            <li>Upload 10 images</li>
            <li>Post 20 properties</li>
            <li>able to update property</li>
            <li>Remove Ads</li>
          </ul>
          <button className='bg-slate-600 text-white py-1 px-3 rounded-lg shadow-md mt-4'>
            Start
          </button>
        </figure>
        <figure className='shadow-xl grid justify-start p-5 md:basis-[15%] rounded-md'>
          <h4 className='tracking-widest text-2xl'>Plus</h4>
          <p className='text-gray-500'>only</p>
          <h3 className='text-4xl'>$10.00</h3>
          <p>USD / month</p>
          <ul className='mt-2 text-base'>
            <li>Upload more than 10 images</li>
            <li>Post more than 20 properties</li>
            <li>able to update property</li>
            <li>Remove Ads</li>
            <li>Promoted</li>
          </ul>
          <button className='bg-slate-600 text-white py-1 px-3 rounded-lg shadow-md mt-4'>
            Start
          </button>
        </figure>
      </div>
    </section>
  );
}

export default Page;
