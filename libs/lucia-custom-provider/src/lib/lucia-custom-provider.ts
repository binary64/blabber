import type { Adapter } from 'lucia';
import { GraphQLClient, gql } from 'graphql-request';
import { getSdk } from './lucia-custom-provider.generated';

export const adapter = (
  baseUrl: string,
  headers?: RequestInit['headers'],
) => {
  const sdk = getSdk(
    new GraphQLClient(baseUrl, {
      headers,
    }),
  );
  return () =>
    ({
      async deleteSession(sessionId) {
        console.log('session.deleteSession', sessionId);
        gql`
          mutation DeleteSession($sessionId: String!) {
            delete_user_session_by_pk(id: $sessionId) {
              id
            }
          }
        `;
        await sdk.DeleteSession({ sessionId });
      },
      async deleteSessionsByUserId(userId) {
        console.log('session.deleteSessionsByUserId');
        gql`
          mutation DeleteSessionsByUserId($userId: String!) {
            delete_user_session(
              where: { user_id: { _eq: $userId } }
            ) {
              affected_rows
            }
          }
        `;
        await sdk.DeleteSessionsByUserId({ userId });
      },
      async getSession(sessionId) {
        console.log('session.getSession', sessionId);
        gql`
          query GetSession($sessionId: String!) {
            user_session_by_pk(id: $sessionId) {
              id
              user_id
              active_expires
              idle_expires
            }
          }
        `;
        const ret = await sdk.GetSession({ sessionId });
        return ret.user_session_by_pk ?? null;
      },
      async getSessionsByUserId(userId) {
        console.log('session.getSessionsByUserId');
        gql`
          query GetSessionsByUserId($userId: String!) {
            user_session(where: { user_id: { _eq: $userId } }) {
              id
              user_id
              active_expires
              idle_expires
            }
          }
        `;
        const ret = await sdk.GetSessionsByUserId({ userId });
        return ret.user_session;
      },
      async updateSession(sessionId, partialSession) {
        console.log(
          'session.updateSession',
          sessionId,
          partialSession,
        );
        gql`
          mutation UpdateSession(
            $sessionId: String!
            $partialSession: user_session_set_input!
          ) {
            update_user_session_by_pk(
              pk_columns: { id: $sessionId }
              _set: $partialSession
            ) {
              id
            }
          }
        `;
        await sdk.UpdateSession({
          sessionId,
          partialSession,
        });
      },
      async setSession(session) {
        console.log('session.setSession', session);
        gql`
          mutation SetSession($session: user_session_insert_input!) {
            insert_user_session_one(object: $session) {
              id
            }
          }
        `;
        await sdk.SetSession({
          session: {
            ...session,
            active_expires: new Date(session.active_expires),
            idle_expires: new Date(session.active_expires),
          },
        });
      },
      async deleteKeysByUserId(userId) {
        console.log('user.deleteKeysByUserId', userId);
        gql`
          mutation DeleteKeysByUserId($userId: String!) {
            delete_user_key(where: { user_id: { _eq: $userId } }) {
              affected_rows
            }
          }
        `;
        await sdk.DeleteKeysByUserId({ userId });
      },
      async deleteKey(keyId) {
        console.log('user.deleteKey', keyId);
        gql`
          mutation DeleteKey($keyId: String!) {
            delete_user_key_by_pk(id: $keyId) {
              id
            }
          }
        `;
        await sdk.DeleteKey({ keyId });
      },
      async getKey(keyId) {
        console.log('user.getKey', keyId);
        gql`
          query GetKey($keyId: String!) {
            user_key_by_pk(id: $keyId) {
              id
              hashed_password
              user_id
            }
          }
        `;
        const ret = await sdk.GetKey({ keyId });
        return ret.user_key_by_pk
          ? {
              ...ret.user_key_by_pk,
              hashed_password:
                ret.user_key_by_pk?.hashed_password ?? null,
            }
          : null;
      },
      async setKey(key) {
        console.log('user.setKey', key);
        gql`
          mutation SetKey($key: user_key_insert_input!) {
            insert_user_key_one(object: $key) {
              id
            }
          }
        `;
        await sdk.SetKey({ key: {} });
      },
      async deleteUser(userId) {
        console.log('user.deleteUser', userId);
        gql`
          mutation DeleteUser($userId: String!) {
            delete_user_by_pk(id: $userId) {
              id
            }
          }
        `;
        await sdk.DeleteUser({ userId });
      },
      async getUser(userId) {
        console.log('user.getUser', userId);
        gql`
          query GetUser($userId: String!) {
            user_by_pk(id: $userId) {
              id
              fullName
            }
          }
        `;
        const ret = await sdk.GetUser({ userId });
        console.log('RETURNING', ret.user_by_pk);
        return ret.user_by_pk;
      },
      async getKeysByUserId(userId) {
        console.log('user.getKeysByUserId', userId);
        console.log('RETURNING', []);
        return [];
      },
      async setUser(user, key) {
        console.log('user.setUser', user, key);
        if (!key) {
          throw new Error('No key provided');
        }
        gql`
          mutation SetUser($user: user_insert_input!) {
            insert_user_one(object: $user) {
              id
            }
          }
        `;
        const setUser = await sdk.SetUser({ user });
        if (!setUser.insert_user_one) {
          throw new Error('Could not create user');
        }
        await sdk.SetKey({
          key: {
            ...key,
            hashed_password: key.hashed_password ?? undefined,
          },
        });
      },
      async updateUser(userId, partialUser) {
        console.log('user.updateUser', userId, partialUser);
      },
      async updateKey(keyId, partialKey) {
        console.log('user.updateKey', keyId, partialKey);
      },
    }) satisfies Adapter;
};
