import Image from 'next/image';
import React from 'react';

function ProfileHeader({ user }) {
  return (
    <header className='p-5'>
      <div className='flex gap-4 flex-col items-center'>
        <Image
          className='rounded-full object-cover '
          placeholder='blur'
          priority
          blurDataURL={user.image}
          src={user.image}
          width={100}
          height={100}
          alt='user photo'
        />
        <div className='flex flex-col items-center'>
          <h3>{user.name}</h3>
          <h4>{user.email.userEmail}</h4>
        </div>
      </div>
    </header>
  );
}

export default ProfileHeader;
