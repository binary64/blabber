import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GraphqlProvider } from '../layouts/ApolloProvider';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import './styles.css';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  return (
    <SessionProvider session={session}>
      <GraphqlProvider>
        <Head>
          <title>Welcome to blabber!</title>
        </Head>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </GraphqlProvider>
    </SessionProvider>
  );
}

export default CustomApp;
