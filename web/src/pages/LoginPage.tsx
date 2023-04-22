import React, { FC } from 'react';
import { LoginForm } from '../components/LoginForm';

export const LoginPage: FC = () => {
  return (
    <div className='max-w-[800px] mx-auto my-0 pt-12'>
      <LoginForm />
    </div>
  );
};
