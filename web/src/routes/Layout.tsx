import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../components';

export const Layout: FC = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
