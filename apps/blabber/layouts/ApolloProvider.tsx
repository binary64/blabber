"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import Router from 'next/router';
import { FC, PropsWithChildren } from 'react';

const cache = new InMemoryCache({
  resultCaching: true,
  typePolicies: {},
});

const GRAPHQL_WS_ENDPOINT = process.env.NEXT_PUBLIC_WS_ENDPOINT;
const GRAPHQL_HTTP_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_ENDPOINT,
});

const errorMap: Record<string, VoidFunction> = {
  'Not Authorized': () => {
    Router.replace('/403');
  },
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      if (typeof window !== 'undefined') {
        if (error?.message in errorMap) {
          return errorMap[error?.message]();
        }
        console.log(
          `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`
        );
      }
    }
  }
  if (networkError) {
    console.log(
      `[Network error]: ${networkError.message} ${networkError.stack}`
    );
  }
});

const getWebSocketLink = () =>
  GRAPHQL_WS_ENDPOINT
    ? createClient({
        url: GRAPHQL_WS_ENDPOINT,
        lazy: true,
        shouldRetry: () => true,
      })
    : undefined;

const wsLink = typeof window !== 'undefined' ? getWebSocketLink() : undefined;

const terminatingLink = wsLink
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription' &&
          typeof window !== 'undefined'
        );
      },
      new GraphQLWsLink(wsLink),
      httpLink
    )
  : httpLink;

const apolloClient = new ApolloClient({
  ssrMode: false,
  link: ApolloLink.from([errorLink, terminatingLink]),
  cache,
  connectToDevTools: true,
});

const GraphqlProvider: FC<PropsWithChildren> = ({ children }) => (
  <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
);

export { GraphqlProvider, apolloClient };
