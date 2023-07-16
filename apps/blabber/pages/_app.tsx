import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { GraphqlProvider } from '../layouts/ApolloProvider';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';

function CustomApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  return (
    <GraphqlProvider>
      <Head>
        <title>Welcome to blabber!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </GraphqlProvider>
  );
}

export default CustomApp;
