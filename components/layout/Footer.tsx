import React from 'react';

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-full flex justify-center items-center px-6 py-12 mt-6  bg-neutral-900">
      <p className="text-center text-white">
        Copyright © {new Date().getFullYear()} All rights reserved | This
        project is made with{' '}
        <span style={{ color: 'tomato', fontWeight: 'bold', fontSize: '24px' }}>
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
  );
};

export default Footer;
