'use client';
import ImageDropDiv from '../../../components/ImageDropDiv';
import { getServerSession } from 'next-auth/next';
import style from '../../../../styles/profile.module.css';
import Aside from '../../../components/aside';
import { authOptions } from '../../api/auth/[...nextauth]';
import { useFormik } from 'formik';
import prisma from '../../../../db';
import { useEffect, useState } from 'react';
import HeadC from '../../../components/head';
import Loader from '../../../components/spinner/loader';
import { useUpdateProfileMutation } from '../../../context/authSlice';

export async function getServerSideProps(context) {
  const sessionData = await getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const session = await prisma.user.findUnique({
    where: {
      id: sessionData.user.email.id,
    },
    include: {
      profile: true,
      accommodations: true,
    },
  });

  await prisma.$disconnect();

  return {
    props: { session: JSON.parse(JSON.stringify(session)) },
  };
}

function Settings({ session }) {
  const [img, setImg] = useState(session.profile.image);
  const [updateProfile, { isSuccess, error }] = useUpdateProfileMutation();

  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: session.name,
      email: session.email,
      number: session.phoneNumber,
      bio: session.profile.bio,
    },

    onSubmit: submitHandler,
  });

  async function submitHandler(values) {
    // setLoading(true);
    let imgCloud;
    if (img.name) {
      imgCloud = await imageUpload([img]);
    }

    const data = {
      id: session.id,
      name: values.name,
      email: values.email,
      number: values.number,
      image: imgCloud === undefined ? session.profile.image : imgCloud[0].url,
      bio: values.bio,
    };

    console.log(data);

    updateProfile(data);
  }

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
    }
  }, [isSuccess]);

  return (
    <>
      <HeadC title='Settings' description='settings page' />
      <section className={style.profile}>
        <Aside amount={session.accommodations.length} />
        <div className={style.container}>
          <form onSubmit={formik.handleSubmit} className={style.form}>
            <div className='bg-[#15314d] flex flex-col h-[150px] p-3 items-center relative'>
              <h1 className={style.heading}>Profile Setting</h1>
              <ImageDropDiv
                image={session.profile.image}
                img={img}
                setImg={setImg}
              />
            </div>
            <div className='p-10 flex mt-6 flex-col gap-4'>
              <input
                {...formik.getFieldProps('name')}
                placeholder='Full Name'
                type='text'
                className={style.input}
              />
              <input
                placeholder='Email'
                type='email'
                {...formik.getFieldProps('email')}
                className={style.input}
              />
              <input
                {...formik.getFieldProps('number')}
                placeholder='Phone number'
                type='text'
                className={style.input}
              />

              <div className='flex flex-col w-[100%]'>
                <textarea
                  placeholder='Bio'
                  {...formik.getFieldProps('bio')}
                  rows={4}
                  className={`${style.input}`}
                />
                <p className={style.desc}>
                  describe about your self or about your campany
                </p>
              </div>

              <button className={style.btn} type='submit'>
                {loading ? <Loader /> : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Settings;
