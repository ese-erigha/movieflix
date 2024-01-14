import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import NavBar from './components/navbar';
import Footer from './components/footer';

import '../assets/scss/custom.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <div data-testid="container" className="container mt-100">
          <main data-testid="main">{children}</main>
          <Footer data-testid="footer" />
        </div>
      </body>
    </html>
  );
}
