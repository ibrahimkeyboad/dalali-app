import React, { useState } from 'react';
import style from '../../../styles/verify.module.css';
import { useRouter } from 'next/router';
import { usePhoneverifyMutation } from '../../context/authSlice';
import Loader from '../../components/spinner/loader';

function Verify() {
  const navigate = useRouter();
  const [code, setCode] = useState('');
  const [user, setUser] = useState();
  const [verify, { isSuccess, isLoading }] = usePhoneverifyMutation();

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userData')));
    if (isSuccess) {
      navigate.push('/set-profile');
    }
  }, [isSuccess, navigate]);

  function submitHandler(e) {
    e.preventDefault();

    const data = { code, ...user };

    verify(data);
  }

  return (
    <form onSubmit={submitHandler} className={style.form}>
      <h1 className='text-2xl'>Verify your phone number</h1>
      <input
        onChange={(e) => setCode(e.target.value)}
        value={code}
        type='text'
        className={style.input}
        placeholder='Inter code'
      />
      <button className={style.btn}>{isLoading ? <Loader /> : 'Send'}</button>
    </form>
  );
}

export default Verify;
