'use client';

import { HelmetProvider } from 'react-helmet-async';
import AppContextProvider from './context/app-context-manager';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <AppContextProvider>{children}</AppContextProvider>
    </HelmetProvider>
  );
}
