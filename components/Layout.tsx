import React from 'react';

import FollowBar from '@/components/layout/FollowBar';
import Sidebar from '@/components/layout/Sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen bg-black">
      <div className="container mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div
            className="
              col-span-3 
              lg:col-span-2 
              border-x-[1px] 
              border-neutral-800
          "
          >
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
      <footer className="w-full flex justify-center items-center px-6 py-12 mt-6 text-center bg-neutral-900">
        <p className="text-center text-white">
          Copyright © {new Date().getFullYear()} All rights reserved | This
          project is made with{' '}
          <span
            style={{ color: 'tomato', fontWeight: 'bold', fontSize: '24px' }}
          >
            ♡
          </span>{' '}
          by{' '}
          <a
            href="https://mohelmy-portfolio.vercel.app/"
            style={{ color: 'tomato', fontWeight: 'bold' }}
            target="_blank"
          >
            Mo.Helmy
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
