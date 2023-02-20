import { useSubscrptionMutation } from '@/context/apartmentSlice';
import React from 'react';
import { planData } from 'util/links';
import { useSession } from 'next-auth/react';

function Page() {
  const { data: session } = useSession();
  const [paySubscription] = useSubscrptionMutation();
  function subscrptionHandler(values) {
    console.log(values);

    if (values.price === 'Free') {
      return;
    }

    const data = {
      name: values.name,
      price: +values.price,
      userName: session.user.name,
    };
    paySubscription(data);
  }
  return (
    <section className='mt-[10%]'>
      <h2 className='text-center'>Choose the right plan for you!</h2>
      <div className='flex flex-wrap justify-center gap-10 mt-5'>
        {planData.map((plan) => (
          <figure
            key={plan.name}
            className='shadow-xl grid border-2 justify-start p-5  rounded-md'>
            <h4 className='tracking-widest text-2xl '>{plan.name}</h4>
            <p className='text-gray-500'>only</p>
            <h3 className='text-4xl tracking-wider'>{plan.price}</h3>
            {plan.price !== 'Free' && <p className='font-bold'>USD / month</p>}
            <ul className='mt-2 text-base'>
              {plan.values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
            <button
              onClick={() => subscrptionHandler(plan)}
              className='bg-slate-600  self-start text-white py-1 px-3 rounded-lg shadow-md mt-4'>
              Start
            </button>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Page;
