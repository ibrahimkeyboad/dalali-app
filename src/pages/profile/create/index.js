import React, { useState, memo, useEffect } from 'react';
import { imageUpload } from '../../../../util/cloudinary';
import TextInput from '../../../components/input';
import { useRouter } from 'next/navigation';
import style from '../../../../styles/create.module.css';
import UploadImage from '../../../components/uploadImage';
import Aside from '../../../components/aside';
import Loader from '../../../components/spinner/loader';
import { usePostApartmentMutation } from '../../../context/apartmentSlice';
import { useSession } from 'next-auth/react';
import { SelectTags, SelectPer } from '../../../components/CustomSelect';
import HeadC from '../../../components/head';
import FormInput from '../../../components/FormInput';
import PropertyContain from '../../../components/create/propertyContain';

function Create() {
  const navigate = useRouter();
  const { data: session } = useSession();
  console.log(session);
  const [postData, { isSuccess, isError }] = usePostApartmentMutation();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [per, setPer] = useState('');

  const changeHandler = (values) => {
    setTags(values);
  };
  const perHandler = (data) => {
    setPer(data);
  };

  function removeHandler(index) {
    const newImgs = [...images];
    newImgs.splice(index, 1);
    setImages(newImgs);
  }

  function imageHandler(e) {
    let imgs = [];
    let num = 0;
    const files = [...e.target.files];
    files.forEach((file) => {
      num += 1;
      if (num <= 10) {
        imgs.push(file);
        return imgs;
      }
    });

    setImages([...images, ...imgs]);
  }

  useEffect(() => {
    if (isSuccess) {
      setIsLoading(false);
      navigate.push('/profile');
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, navigate, isError]);

  async function submitHnadler(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = {};
    Array.from(form).forEach((field) => {
      if (!field.name) return;
      formData[field.name] = field.value;
    });

    let media = [];
    const newImage = images.filter((imag) => !imag.url);
    const oldImage = images.filter((img) => img.url);

    if (newImage.length > 0) {
      setIsLoading(true);
      media = await imageUpload(newImage);
    }

    const data = {
      ...formData,
      duration: per['value'],
      id: session.user.email.id,
      type: session.user.email.property,
      tags: tags,
      images: [...media, ...oldImage],
    };

    console.log(data);

    postData(data);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={`bg-gray-50 dark:bg-[#0a192f]`}>
      <HeadC title='Create Property' description='create property to upload' />
      <Aside />
      <div className={style.heading}>
        <h2 className='text-[#d9dfe8]'>Add new property</h2>
      </div>
      <form
        onSubmit={submitHnadler}
        className={`dark:text-[#d9dfe8] ${style.formContainer}`}>
        {/* <Options /> */}

        {/* Descrptions */}
        <div className='flex gap-4 flex-col'>
          <label className='text-2xl text-[#CCD6F6] font-bold'>Details</label>
          <div className={style.details}>
            <div
              className={`grid dark:bg-[#112240] ${style.container} md:grid-cols-2 md:items-end gap-6 items-start`}>
              <div>
                <p className='text-[14px] text-[#626D89]'>{`Title that describe your property`}</p>
                <FormInput hint='Title' label='Title' name='title' />
              </div>

              <select
                name='purpose'
                className='outline-none border-2 p-2 dark:bg-[#112240] text-[#CCD6F6]'>
                <option>Select propurse</option>
                <option value='Rent'>Rent</option>
                <option value='Sell'>Sell</option>
              </select>
            </div>

            <div
              className={`grid md:grid-cols-2 dark:bg-[#112240] items-center gap-3 ${style.container}`}>
              <div>
                <p className='text-[14px]'>{`Where's your property located?`}</p>

                <TextInput hint='Street' type='text' name='street' />
              </div>
              <TextInput hint='City' type='text' name='city' />
              <TextInput hint='Country' type='text' name='country' />
            </div>

            <PropertyContain style={style} />

            <div className={`${style.container} dark:bg-[#112240] md:p-10`}>
              <p className='text-[14px]'>Inter Price and price per duration</p>
              <label>Price</label>
              <div className='flex flex-col md:flex-row md:items-center px-4 gap-5 md:gap-10'>
                <div className='basis-[50%] md:basis-[30%]'>
                  <TextInput type='number' hint='Price' name='price' />
                </div>
                <SelectPer onChange={perHandler} />
              </div>
            </div>
            <SelectTags style={style} onChange={changeHandler} />

            <div
              className={`flex flex-col gap-2 dark:bg-[#112240] ${style.container}`}>
              <label className='text-sm text-gray-600'>
                Add description to describe addition things
              </label>
              <textarea
                rows={4}
                className={`dark:bg-[#112240] dark:text-gray-200 focus:border-[#8892b0] ${style.textinput}`}
                type='text'
                placeholder='Description'
                name='description'
              />
            </div>
          </div>

          <UploadImage
            style={style}
            imageHandler={imageHandler}
            images={images}
            removeHandler={removeHandler}
          />
        </div>

        <button type='submit' className={style.btn}>
          Create
        </button>
      </form>
    </section>
  );
}

export default memo(Create);
