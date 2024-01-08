import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from './components/navbar';

import '../assets/scss/custom.scss';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <h1>Layout</h1>
          <Navbar/>
          <div>{children}</div>
        </div>
      </body>
    </html>
  )
}
