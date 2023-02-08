import React, { useState, memo, useEffect } from 'react';
import { imageUpload } from '../../../../../util/cloudinary';
import TextInput from '../../../../components/input';
import { useRouter } from 'next/navigation';
import style from '../../../../../styles/create.module.css';
import UploadImage from '../../../../components/uploadImage';
import Aside from '../../../../components/aside';
import Loader from '../../../../components/spinner/loader';
import prisma from '../../../../../db';
import { useFormik } from 'formik';
import HeadC from '../../../../components/head';
import { useUpdateApartmentMutation } from '../../../../context/apartmentSlice';

export async function getServerSideProps({ query }) {
  const data = await prisma.apartment.findUnique({
    where: {
      id: query.id,
    },
    include: {
      images: true,
      owner: {
        include: {
          profile: true,
        },
      },
    },
  });

  await prisma.$disconnect();

  return {
    props: { data: JSON.parse(JSON.stringify(data)) },
  };
}

function Page({ data }) {
  const navigate = useRouter();
  const [updateApartment, { isSuccess, error }] = useUpdateApartmentMutation();
  const [images, setImages] = useState(data.images);
  const [isLoading, setIsLoading] = useState(false);
  const [parking, setParking] = useState(data.parking);
  const [kitchen, setKitchen] = useState(data.kitchen);

  function removeHandler(index) {
    const newImgs = [...images];
    newImgs.splice(index, 1);
    setImages(newImgs);
  }

  const formik = useFormik({
    initialValues: {
      description: data.description,
      location: data.location,
      name: data.name,
      price: data.price,
      rooms: data.rooms,
      title: data.title,
      type: data.type,
    },

    onSubmit: submitHnadler,
  });

  function imageHandler(e) {
    let imgs = [];
    let num = 0;
    const files = [...e.target.files];
    files.forEach((file) => {
      num += 1;
      if (num <= 5) {
        imgs.push(file);
        return imgs;
      }
    });

    setImages([...images, ...imgs]);
  }

  useEffect(() => {
    if (isSuccess) {
      setIsLoading(false);
      navigate.push('/apartments');
    }
  }, [, navigate, isSuccess]);

  async function submitHnadler(values) {
    setIsLoading(true);

    let media = [];
    const newImage = images.filter((imag) => !imag.url);
    const oldImage = images.filter((img) => img.url);

    if (newImage.length > 0) {
      media = await imageUpload(newImage);
    }


    const datas = {
      id: data.id,
      description: values.description,
      location: values.location,
      name: values.name,
      price: +values.price,
      rooms: +values.rooms,
      title: values.title,
      type: values.type,
      kitchen,
      parking,
      slug: 'apartments',
      images: [...media, ...oldImage],
    };

    setIsLoading(false);

    updateApartment(datas);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={style.createSection}>
      <HeadC title={data.title} description={data.description} />
      <Aside />
      <div className={style.heading}>
        <h2 className={style.head}>Add new property</h2>
      </div>
      <form onSubmit={formik.handleSubmit} className={style.formContainer}>
        {/* <Options /> */}

        {/* Descrptions */}
        <div className='flex gap-4 flex-col'>
          <UploadImage
            style={style}
            imageHandler={imageHandler}
            images={images}
            removeHandler={removeHandler}
          />
          <>
            <label className='text-2xl font-bold'>Details</label>
            <div className={style.details}>
              <div className='grid grid-cols-[70%] md:grid-cols-3 gap-3'>
                <TextInput
                  required
                  hint='Title'
                  formik={formik}
                  type='text'
                  name='title'
                />
                <TextInput
                  formik={formik}
                  required
                  hint='Name'
                  type='text'
                  name='name'
                />
                <TextInput
                  required
                  type='text'
                  formik={formik}
                  name='location'
                  hint='location'
                />
              </div>

              <div className='grid grid-cols-[70%] md:grid-cols-3 gap-2'>
                <div className='flex items-center gap-3'>
                  <label className='text-sm text-gray-600'>Price</label>
                  <TextInput
                    required
                    min={100000}
                    formik={formik}
                    type='number'
                    name='price'
                  />
                </div>
                <div className='flex items-center gap-1'>
                  <label className='text-sm text-gray-600'>Rooms</label>
                  <TextInput
                    required
                    type='number'
                    formik={formik}
                    name='rooms'
                  />
                </div>

                <select name='type' className='outline-none border-b-2 p-2'>
                  <option>Select type</option>
                  <option>Rent</option>
                  <option>Sell</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm text-gray-600'>Description</label>
              </div>
              <div className='flex items-center gap-10'>
                <div className='flex items-center gap-3'>
                  <label>Parking</label>
                  <input
                    type='checkbox'
                    checked={parking}
                    onChange={(e) => setParking(e.target.checked)}
                  />
                </div>
                <div className='flex items-center gap-3'>
                  <label>Kitchen</label>
                  <input
                    className='outline-none'
                    type='checkbox'
                    checked={kitchen}
                    onChange={(e) => setKitchen(e.target.checked)}
                  />
                </div>
              </div>
              <textarea
                rows={4}
                {...formik.getFieldProps('description')}
                className={style.textinput}
                required
                type='text'
                name='description'
                placeholder='Description'
              />
            </div>
          </>
        </div>

        <button type='submit' className={style.btn}>
          Add
        </button>
      </form>
    </section>
  );
}

export default memo(Page);
