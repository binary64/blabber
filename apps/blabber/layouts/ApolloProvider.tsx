'use client';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { invoke } from '@tauri-apps/api';
import { FC, PropsWithChildren } from 'react';

const httpLink = new HttpLink({
  uri: 'http://dummy.localhost',
  fetch: async (_uri, options) => {
    console.log('fetching from tauri', options);
    console.log('query is', options?.body?.toString());
    const results = await invoke<string>('graphql_request', {
      query: options?.body?.toString(),
    });
    console.log('results', results);
    return new Response(results);
  },
});

const apolloClient = new ApolloClient({
  ssrMode: false,
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: false,
});

const GraphqlProvider: FC<PropsWithChildren> = ({ children }) => (
  <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
);

export { GraphqlProvider, apolloClient };
