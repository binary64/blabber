import gql from 'graphql-tag';
import styled from '@emotion/styled';
import { useNumberOfSiteUsersSubscription } from './numberOfSiteUsers.generated';
import { useDemoActionMutation } from './index.generated';
import { useCallback } from 'react';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 4rem;
`;

gql`
  mutation DemoAction {
    insert_user_one(object: {}) {
      id
    }
  }
`;

export function Index() {
  const { data } = useNumberOfSiteUsersSubscription();
  const [handleAction] = useDemoActionMutation();
  const handleClick = useCallback(
    () => void handleAction(),
    [handleAction]
  );

  function functionNotImplemented(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <StyledPage>
      👋{data?.user_aggregate.aggregate?.count}👋
      <button
        className="btn btn-wide btn-primary glass"
        onClick={handleClick}
      >
        Hit me!
      </button>
      <button onClick={() => functionNotImplemented()}>
        Function not implemented
      </button>
      <button
        onClick={() =>
          // @ts-expect-error This is a fake error to test Sentry
          methodDoesNotExist()
        }
      >
        methodDoesNotExist
      </button>
    </StyledPage>
  );
}

export default Index;
