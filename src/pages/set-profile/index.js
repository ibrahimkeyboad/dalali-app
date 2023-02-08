import Image from 'next/image';
import { IoMdAdd } from 'react-icons/io';
import React, { useEffect, useState } from 'react';
import { imageUpload } from '../../../util/cloudinary';
import { useRouter } from 'next/router';
import { useCreateProfieMutation } from '../../context/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from '../../components/spinner/loader';

function SetProfile() {
  const navigate = useRouter();
  const [createprofile, { isSuccess, error }] = useCreateProfieMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState(
    'https://res.cloudinary.com/ibracloud/image/upload/v1668599254/dalali-app/blank-profile-picture-gb86e5398d_1280_swyjff.png'
  );
  const [user, setUser] = useState({});
  const formik = useFormik({
    initialValues: {
      bio: '',
      category: '',
    },
    validationSchema: Yup.object({
      bio: Yup.string().min(20, 'Too short!').required('Bio is required'),
    }),
    onSubmit: submitHandler,
  });

  function imageHandler(e) {
    const file = e.target.files[0];
    setImg(file);
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userData')));
    if (isSuccess) {
      setIsLoading(false);
      localStorage.removeItem('userData');
      navigate.push('/login');
    }
  }, [isSuccess, navigate]);

  async function submitHandler(values) {
    // setIsLoading(true);
    let imgCloud;
    if (img.name) {
      imgCloud = await imageUpload([img]);
    }

    const profile = {
      bio: values.bio,
      category: values.category,
      email: user.email,
      image: imgCloud === undefined ? img : imgCloud[0].url,
    };

    console.log(profile);

    createprofile(profile);
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex flex-col p-10 gap-5 shadow-lg rounded-md max-w-[540px] my-20 mx-auto justify-center items-center'>
      <h1 className='text-2xl'>Set Your Profile</h1>
      <div className='flex flex-col gap-10'>
        <div className='flex justify-center relative '>
          <figure className='relative w-[100px] h-[100px] '>
            <Image
              className='rounded-full shadow-lg'
              src={img.name ? URL.createObjectURL(img) : img}
              alt=''
              fill
            />
          </figure>
          <button
            type='button'
            className='absolute self-end text-[#0b2744] capitalize tracking-wide cursor-pointer'>
            <input
              onChange={imageHandler}
              type='file'
              accept='image/*'
              className='w-[90px] cursor-pointer opacity-0 overflow-hidden absolute z-[21]'
            />
            <div className='p-1 shadow-md rounded-3xl bg-white'>
              <IoMdAdd size={20} />
            </div>
          </button>
        </div>
        <select
          {...formik.getFieldProps('category')}
          name='category'
          className='outline-none text-base border-b-2 p-1'>
          <option>Select Your Professional</option>
          <option value='apartment'>Apartments</option>
          <option value='house'>Houses</option>
          <option value='hostel'>Hostel</option>
          <option value='Lodge'>Lodge</option>
          <option value='Guest house'>Guest house</option>
          <option value='Meet Hall'>Meet Hall</option>
        </select>
        <div className='flex flex-col max-w-[400px]'>
          <textarea
            {...formik.getFieldProps('bio')}
            name='bio'
            placeholder='Bio'
            rows={3}
            className='border-2 outline-none focus:border-[#098366] rounded-lg py-1 px-2 '
          />
          {formik.errors && formik.touched.bio && formik.errors.bio ? (
            <p className='text-red-400 text-sm'>
              {formik.errors && formik.touched.bio && formik.errors.bio}
            </p>
          ) : (
            <p className='text-gray-400 text-sm ml-2'>
              Describe about your self or about your campany
            </p>
          )}
        </div>

        {error && <p className='text-red-400 text-sm'>{error}</p>}

        <button
          type='submit'
          className='bg-[#098366] text-white p-2 rounded-lg shadow-md shadow-gray-400'>
          {isLoading ? <Loader /> : 'Create'}
        </button>
      </div>
    </form>
  );
}

export default SetProfile;
