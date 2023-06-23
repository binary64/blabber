import * as Types from '../../graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NumberOfSiteUsersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type NumberOfSiteUsersQuery = { __typename?: 'query_root', user_aggregate: { __typename?: 'user_aggregate', aggregate?: { __typename?: 'user_aggregate_fields', count: number } | null } };


export const NumberOfSiteUsersDocument = gql`
    query NumberOfSiteUsers {
  user_aggregate {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useNumberOfSiteUsersQuery__
 *
 * To run a query within a React component, call `useNumberOfSiteUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useNumberOfSiteUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNumberOfSiteUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useNumberOfSiteUsersQuery(baseOptions?: Apollo.QueryHookOptions<NumberOfSiteUsersQuery, NumberOfSiteUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NumberOfSiteUsersQuery, NumberOfSiteUsersQueryVariables>(NumberOfSiteUsersDocument, options);
      }
export function useNumberOfSiteUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NumberOfSiteUsersQuery, NumberOfSiteUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NumberOfSiteUsersQuery, NumberOfSiteUsersQueryVariables>(NumberOfSiteUsersDocument, options);
        }
export type NumberOfSiteUsersQueryHookResult = ReturnType<typeof useNumberOfSiteUsersQuery>;
export type NumberOfSiteUsersLazyQueryHookResult = ReturnType<typeof useNumberOfSiteUsersLazyQuery>;
export type NumberOfSiteUsersQueryResult = Apollo.QueryResult<NumberOfSiteUsersQuery, NumberOfSiteUsersQueryVariables>;