import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import Header from '../components/header';
import store from '../context/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '../../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  const { asPath, events } = useRouter();
  useEffect(() => {
    const handleStart = (url) => {
      NProgress.configure({});
      NProgress.start();
      NProgress.set(0.4);
    };
    ('64FFDA');
    const handleStop = () => {
      NProgress.done();
    };

    events.on('routeChangeStart', handleStart);
    events.on('routeChangeComplete', handleStop);
    events.on('routeChangeError', handleStop);

    return () => {
      events.off('routeChangeStart', handleStart);
      events.off('routeChangeComplete', handleStop);
      events.off('routeChangeError', handleStop);
    };
  }, [events]);
  const notShow =
    asPath.includes('login') ||
    asPath.includes('signup') ||
    asPath.includes('verify') ||
    asPath.includes('plan') ||
    asPath.includes('profile');

  return (
    <ThemeProvider enableSystem={true} attribute='class'>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          {!notShow && <Header />}
          <Component {...pageProps} />
          <Analytics />
        </Provider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
