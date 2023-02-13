import style from '../../../styles/signup.module.css';
import { useEffect } from 'react';
import TellPhone from '../../components/tellphone';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import Link from 'next/link';
import Loader from '../../components/spinner/loader';
import { toggleHandler } from '../../context/sliceApp';
import { useDispatch, useSelector } from 'react-redux';
import HeadC from '../../components/head';
import {
  useSendverifyMutation,
  useSignupMutation,
} from '../../context/authSlice';
import TextInput from '../../components/input';
function Signup() {
  const dispatch = useDispatch();
  const { toggle, code } = useSelector((state) => state.slices);
  const navigate = useRouter();
  const [signup, { isSuccess, isLoading, error }] = useSignupMutation();
  const [sendverify] = useSendverifyMutation();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      number: '',
      country: '',
      city: '',
    },
    onSubmit: onSubmitHandler,

    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
      password: Yup.string()
        .min(6, 'Too Short!')
        .required('Password is required'),
      name: Yup.string().required('Name is required'),
      city: Yup.string().required('City is required'),
      number: Yup.string().required('Phone number is required'),
      country: Yup.string().required('Country is required'),
    }),
  });

  function onSubmitHandler(value) {
    const number = +value.number;
    const phoneNumber = `${code}${number}`;
    localStorage.setItem('number', phoneNumber);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        phoneNumber,
        email: value.email,
      })
    );

    const data = {
      name: value.name,
      email: value.email.toLowerCase().trim(),
      password: value.password.toLowerCase().trim(),
      number: number,
      country: value.country,
      city: value.city,
      code,
    };

    signup(data);
  }

  useEffect(() => {
    if (isSuccess) {
      const phoneNumber = localStorage.getItem('number');
      localStorage.removeItem('number');
      sendverify(phoneNumber);
      navigate.push('/verify');
    }
  }, [isSuccess, navigate, sendverify]);

  return (
    <>
      <HeadC title='signup' description='create your account to get access' />
      <section className={style.signupSection}>
        <form
          onSubmit={formik.handleSubmit}
          className={`dark:shadow-none dark:bg-[#112240] ${style.form}`}>
          <h1 className='text-2xl self-center'>Create Your Account</h1>

          <div className={style['input-control']}>
            <TextInput
              name='name'
              className={style.input}
              required
              type='text'
              {...formik.getFieldProps('name')}
              hint='Full Name'
            />
            {formik.errors && (
              <p className='text-red-400 text-sm'>
                {formik.errors && formik.touched.name && formik.errors.name}
              </p>
            )}
          </div>
          <div className={style['input-control']}>
            <TextInput
              className={`${style.input} ${error && 'border-red-400'}`}
              required
              name='email'
              type='email'
              {...formik.getFieldProps('email')}
              hint='Email'
            />
            {formik.errors && (
              <p className='text-red-400 text-sm'>
                {formik.errors && formik.touched.email && formik.errors.email}
              </p>
            )}
            {error && <p className='text-red-400 text-sm'>{error.data.msg}</p>}
          </div>

          <div className={style['input-control']}>
            <span className='flex items-center'>
              <TextInput
                className={style.input}
                required
                type={toggle ? 'text' : 'password'}
                name='password'
                {...formik.getFieldProps('password')}
                hint='Password'
              />
              {!toggle ? (
                <HiOutlineEyeOff
                  onClick={() => dispatch(toggleHandler())}
                  size={25}
                  className='-m-7 cursor-pointer'
                />
              ) : (
                <HiOutlineEye
                  onClick={() => dispatch(toggleHandler())}
                  size={25}
                  className='-m-7 cursor-pointer'
                />
              )}
            </span>

            {formik.errors &&
            formik.touched.password &&
            formik.errors.password ? (
              <p className='text-red-400 text-sm'>
                {formik.errors &&
                  formik.touched.password &&
                  formik.errors.password}
              </p>
            ) : (
              <p className={style.desc}>Please enter atleast 6 character</p>
            )}
          </div>
          <TellPhone
            style={style}
            formik={formik}
            country={formik.values.country}
          />
          <div className={style['input-control']}>
            <TextInput
              className={style.input}
              required
              type='text'
              name='city'
              {...formik.getFieldProps('city')}
              hint='City'
            />
            {formik.errors && (
              <p className='text-red-400 text-sm'>
                {formik.errors && formik.touched.city && formik.errors.city}
              </p>
            )}

            <p className={style.desc}>add your city</p>
          </div>
          <div className='flex flex-col gap-3'>
            <button type='submit' className={`dark:shadow-none ${style.btn}`}>
              {isLoading ? <Loader /> : 'Sign up'}
            </button>
            <Link className='self-center' href='/login'>
              <span>Already a member? </span>
              <span className='font-bold'> Login</span>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Signup;
