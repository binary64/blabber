import gql from 'graphql-tag';
import styled from '@emotion/styled';
import { useNumberOfSiteUsersSubscription } from '../modules/user/numberOfSiteUsers.generated';
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
  mutation demoAction {
    insert_user_one(object: {}) {
      id
    }
  }
`;

export function Index() {
  const { data } = useNumberOfSiteUsersSubscription();
  const [handleAction] = useDemoActionMutation();
  const handleClick = useCallback(() => void handleAction(), [handleAction]);
  return (
    <StyledPage>
      👋{data?.user_aggregate.aggregate.count}👋
      <button onClick={handleClick}>Hit me</button>
    </StyledPage>
  );
}

export default Index;
