import gql from 'graphql-tag';
import styled from '@emotion/styled';
import {
  NumberOfSiteUsersDocument,
  NumberOfSiteUsersQuery,
  useNumberOfSiteUsersQuery,
} from './numberOfSiteUsers.generated';
import {
  DemoActionMutation,
  useDemoActionMutation,
} from './index.generated';
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import packageJson from '../../../../package.json';

const { version } = packageJson;
const nxVersion = packageJson.devDependencies['@nx/react'];

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 4rem;
`;

export function Index() {
  const { data } = useNumberOfSiteUsersQuery();
  const [handleAction] = useMutation(
    gql`
      mutation DemoAction {
        insert_user_one(object: {}) {
          id
        }
      }
    `,
    {
      optimisticResponse: { insert_user_one: { id: 'optimistic' } },
      update: (cache) => {
        cache.updateQuery<NumberOfSiteUsersQuery>(
          { query: NumberOfSiteUsersDocument, optimistic: true },
          (e) =>
            e?.user_aggregate?.aggregate
              ? {
                  user_aggregate: {
                    aggregate: {
                      count: e.user_aggregate.aggregate.count + 1,
                    },
                  },
                }
              : undefined
        );
      },
    }
  );
  const handleClick = useCallback(
    () => void handleAction(),
    [handleAction]
  );

  function functionNotImplemented(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <StyledPage>
      Optimistic 👋{data?.user_aggregate.aggregate?.count}👋
      <button
        className="btn btn-wide btn-primary glass"
        onClick={handleClick}
      >
        Hit me!
      </button>
      <button
        className="btn btn-wide btn-primary glass"
        onClick={() => functionNotImplemented()}
      >
        Function not implemented
      </button>
      <button
        className="btn btn-wide btn-primary glass"
        onClick={() =>
          // @ts-expect-error This is a fake error to test Sentry
          methodDoesNotExist()
        }
      >
        methodDoesNotExist
      </button>
      <div>
        <p>Version: {version}</p>
        <p>NX Version: {nxVersion}</p>
      </div>
    </StyledPage>
  );
}

export default Index;
