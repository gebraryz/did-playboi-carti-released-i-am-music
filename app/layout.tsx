import clsx from 'clsx';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import type { FC, PropsWithChildren } from 'react';
import '../styles/globals.css';

const interFont = Inter({
  display: 'swap',
  subsets: ['latin-ext'],
  variable: '--font-inter',
});
const swiss911CompressedRegularFont = localFont({
  src: '../fonts/Swiss 911 Compressed Regular.otf',
  display: 'swap',
  variable: '--font-swiss',
});

export const metadata: Metadata = {
  title: 'Did Playboi Carti released "I AM MUSIC"?',
  description: 'Guess.',
};

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <html
    lang="en"
    className={clsx(interFont.variable, swiss911CompressedRegularFont.variable)}
  >
    <body className={clsx('bg-black text-white antialiased')}>{children}</body>
  </html>
);

export default Layout;
