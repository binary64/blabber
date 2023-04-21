import styled from '@emotion/styled';
import { useNumberOfSiteUsersSubscription } from '../modules/user/numberOfSiteUsers.generated';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 4rem;
`;

export function Index() {
  const { data } = useNumberOfSiteUsersSubscription();

  return <StyledPage>👋{data?.user_aggregate.aggregate.count}👋</StyledPage>;
}

export default Index;
