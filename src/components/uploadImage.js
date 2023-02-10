import Image from 'next/image';
import React, { memo } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { MdClear } from 'react-icons/md';

function UploadImage({ images, imageHandler, removeHandler, style }) {
  return (
    <div
      className={`${style.imgUploadContainer} dark:bg-slate-900 ${style.container}`}>
      <label className={style.buttonUpload}>
        <span>Add image</span>

        <input
          type='file'
          accept='image/*'
          className={style.inputImg}
          onChange={imageHandler}
          multiple
        />
      </label>
      <div className={style.imgContainer}>
        {images.length === 0 ? (
          <div className={style.noImages}>
            <BiImageAdd size={80} />
            <h2>Click add button to upload same images</h2>
          </div>
        ) : (
          images.map((img, index) => {
            return (
              <figure className={style.img} key={index}>
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <Image
                  className='object-cover rounded-md'
                  fill
                  priority
                  quality={50}
                  src={img.name ? URL.createObjectURL(img) : img.url}
                  alt='photo'
                />
                <span className='absolute bg-white rounded-xl p-1 top-1 right-1 font-bold'>
                  <MdClear
                    onClick={() => removeHandler(index)}
                    className={style.icon}
                    size={15}
                    fontWeight={900}
                  />
                </span>
              </figure>
            );
          })
        )}
      </div>
    </div>
  );
}

export default memo(UploadImage);
