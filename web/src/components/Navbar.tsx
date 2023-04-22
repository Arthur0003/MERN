import React, { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logoutUser, reset } from '../features/auth/authSlice';

export const Navbar: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate('/');
  };

  return (
    <>
      <nav className='relative flex flex-wrap items-center justify-between  bg-slate-500 mb-3 text-white'>
        <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
          <h2>MERN APP</h2>
          <div className={`${user && 'py-3'}`}>
            {!user ? (
              <ul className='flex gap-x-8 items-center'>
                <li className='hover:bg-slate-600 hover:text-slate-900 transition-all duration-300 '>
                  <NavLink className='block px-2 py-3' to={'register'}>
                    Register
                  </NavLink>
                </li>
                <li className='hover:bg-slate-600 hover:text-slate-900 transition-all duration-300 '>
                  <NavLink className='block px-2 py-3' to={'/'}>
                    Login
                  </NavLink>
                </li>
              </ul>
            ) : (
              <button
                onClick={handleLogout}
                className='px-5 py-2 bg-slate-600 hover:bg-slate-900 outline-none border-none rounded-lg transition-colors duration-150'>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
