import Image from 'next/image';
import { TfiPencil } from 'react-icons/tfi';
function ImageDropDiv({ img, setImg }) {
  function imageHandler(e) {
    const file = e.target.files[0];
    console.log(file);

    setImg(file);
  }

  return (
    <div className='absolute top-[50%] left-[43%] h-[100%] w-[100%]'>
      <figure className='relative w-[120px] h-[120px]'>
        <Image
          placeholder='blur'
          blurDataURL={img.name ? URL.createObjectURL(img) : img}
          className='object-cover rounded-full shadow-xl border-2 border-[#15314d]'
          src={img.name ? URL.createObjectURL(img) : img}
          alt=''
          fill
        />
        <button className='absolute bottom-5 right-0 bg-[#15314d] text-white rounded-xl p-1 cursor-pointer'>
          <input
            onChange={imageHandler}
            title='upload image'
            type='file'
            accept='image/*'
            className='cursor-pointer top-0 left-0 opacity-0 overflow-hidden absolute w-full z-[21]'
          />
          <TfiPencil />
        </button>
      </figure>
    </div>
  );
}

export default ImageDropDiv;
