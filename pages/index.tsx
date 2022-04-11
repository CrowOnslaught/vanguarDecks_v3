import styled from '@emotion/styled';
import firebase from 'firebase';
import { Text, theme, Switch } from '@chakra-ui/react';
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import useCards from 'services/useCards';
import InfiniteScroll from 'components/layout/InfiniteScroll';

const Title = styled(Text)`
  font-family: 'Lobster';
  font-size: 40px;
`;

const Home = () => {
  const { cards } = useCards();

  if (!cards) return <>b</>;

  return (
    <>
      <Title>Cards</Title>
      <InfiniteScroll data={cards} />
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Home);
