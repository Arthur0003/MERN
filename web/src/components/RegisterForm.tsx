import React, { FC, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { UserData } from '../features/auth/authTypes';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { registerUser, reset } from '../features/auth/authSlice';

export const RegisterForm: FC = () => {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });

  const { name, lastName, email, password } = formData;

  const { user, isError, isSuccess, isLoading, message } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (user || isSuccess) {
      navigate('/');
    }
  }, [user, isSuccess]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{message}</h1>;
  }

  return (
    <div>
      <div>
        <form onSubmit={handleForm}>
          <div className='mb-6'>
            <label
              htmlFor='name'
              className='block mb-2 text-sm font-medium text-gray-900'>
              Your: name
            </label>
            <input
              name='name'
              type='text'
              id='name'
              value={name}
              onChange={changeHandler}
              className='  text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-100  placeholder-gray-500 focus:outline-none focus:border-none'
              required
            />
          </div>

          <div className='mb-6'>
            <label
              htmlFor='lastName'
              className='block mb-2 text-sm font-medium text-gray-900'>
              Your: last name
            </label>
            <input
              name='lastName'
              type='text'
              id='lastName'
              value={lastName}
              onChange={changeHandler}
              className='  text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-100  placeholder-gray-500 focus:outline-none focus:border-none'
              required
            />
          </div>

          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900'>
              Your: email
            </label>
            <input
              name='email'
              type='email'
              id='email'
              value={email}
              onChange={changeHandler}
              className='  text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-100  placeholder-gray-500 focus:outline-none focus:border-none'
              placeholder='name@flowbite.com'
              required
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-900'>
              Your: password
            </label>
            <input
              name='password'
              type='password'
              id='password'
              value={password}
              onChange={changeHandler}
              className='bg-gray-100 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:outline-none focus:border-none'
              required
            />
          </div>

          <button
            type='submit'
            className='text-white bg-slate-600 hover:bg-slate-900 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center transition-all duration-200'>
            Register
          </button>

          <div className='my-6'>
            <span>
              Already have an account?{' '}
              <Link
                to={'/'}
                className='font-bold text-blue-500 hover:text-blue-700 transition-all duration-200'>
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
