'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import HeadC from '../../components/head';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Loader from '../../components/spinner/loader';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { data: session } = useSession();

  const navigate = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
      password: Yup.string()
        .min(6, 'Too Short!')
        .required('Password is required'),
    }),

    onSubmit: submitHandler,
  });

  async function submitHandler(values) {
    setIsLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email.toLowerCase().trim(),
      password: values.password.toLowerCase().trim(),
    });
    console.log(res);

    if (session.user) {
      navigate.push('/profile');
    } else {
      setError(res.error);
    }
  }

  return (
    <>
      <HeadC title='Login' description='login to get access' />
      <section className='max-w-[1240px] py-20 h-[100vh] mx-auto my-32'>
        <form
          onSubmit={formik.handleSubmit}
          className='sm:w-[80%] md:w-[60%] lg:w-[50%] my-auto shadow-lg p-10  m-auto gap-5 flex flex-col '>
          <h2>Login</h2>
          <div>
            <input
              className='border-2 p-2 w-full dark:bg-[#112240] outline-none rounded-lg'
              placeholder='Email of phone number'
              {...formik.getFieldProps('email')}
            />
            <p className='text-red-400 text-sm'>
              {formik.errors && formik.touched.email && formik.errors.email}
            </p>
          </div>
          <div>
            <input
              className='border-2 outline-none  dark:bg-[#112240]  w-full p-2 rounded-lg '
              placeholder='Password'
              {...formik.getFieldProps('password')}
              type='password'
            />
            <p className='text-red-400 text-sm'>
              {formik.errors &&
                formik.touched.password &&
                formik.errors.password}
              {error && error}
            </p>
          </div>
          <Link className='text-gray-500 text-sm self-end' href='/forget'>
            Forget password?
          </Link>

          <button
            type='submit'
            className='bg-[#098366]  rounded-lg self-center py-1 px-10 tracking-wide text-white'>
            {isLoading ? <Loader /> : 'Login'}
          </button>
          <Link
            className='text-gray-500 text-sm self-center hover:text-gray-700'
            href='/signup'>
            Create account now
          </Link>
          <span className='text-gray-400 text-sm self-center'>Or</span>
        </form>
      </section>
    </>
  );
}

export default LoginPage;
