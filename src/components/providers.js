'use client';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '../context/store';

function Providers({ children }) {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
}

export default Providers;
