import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { GraphqlProvider } from '../layouts/ApolloProvider';

function CustomApp({ Component, pageProps }: AppProps) {
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
