import * as Types from '../../graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NumberOfSiteUsersSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type NumberOfSiteUsersSubscription = { __typename?: 'subscription_root', user_aggregate: { __typename?: 'user_aggregate', aggregate?: { __typename?: 'user_aggregate_fields', count: number } | null } };


export const NumberOfSiteUsersDocument = gql`
    subscription NumberOfSiteUsers {
  user_aggregate {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useNumberOfSiteUsersSubscription__
 *
 * To run a query within a React component, call `useNumberOfSiteUsersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNumberOfSiteUsersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNumberOfSiteUsersSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNumberOfSiteUsersSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NumberOfSiteUsersSubscription, NumberOfSiteUsersSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NumberOfSiteUsersSubscription, NumberOfSiteUsersSubscriptionVariables>(NumberOfSiteUsersDocument, options);
      }
export type NumberOfSiteUsersSubscriptionHookResult = ReturnType<typeof useNumberOfSiteUsersSubscription>;
export type NumberOfSiteUsersSubscriptionResult = Apollo.SubscriptionResult<NumberOfSiteUsersSubscription>;