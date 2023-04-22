import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginData } from '../features/auth/authTypes';
import { loginUser } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const LoginForm: FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isError, isSuccess, isLoading, message } = useAppSelector(
    (state) => state.auth
  );
  const { email, password } = formData;

  console.log(user);

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleForm: React.FormEventHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData));
    navigate('user');
  };

  useEffect(() => {
    if (user) {
      navigate('user');
    }
  }, [user]);

  if (isError) {
    return <h1>{message}</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <form onSubmit={handleForm}>
        <div className='mb-6'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Your email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={changeHandler}
            className='  text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-100  placeholder-gray-500 focus:outline-none focus:border-none'
            placeholder='write your email'
            required
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Your password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={changeHandler}
            className='bg-gray-100 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:outline-none focus:border-none'
            required
          />
        </div>

        <button
          type='submit'
          className='text-white bg-slate-600 hover:bg-slate-900 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center transition-all duration-200'>
          Login
        </button>

        <div className='my-6'>
          <span>
            Don't have an account?
            <Link
              to={'/register'}
              className='font-bold text-blue-500 hover:text-blue-700 transition-all duration-200'>
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};
