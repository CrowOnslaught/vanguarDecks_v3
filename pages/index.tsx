import styled from '@emotion/styled';
import firebase from 'firebase';
import { Text, theme, Switch } from '@chakra-ui/react';
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';

const Title = styled(Text)`
  font-family: 'Lobster';
  font-size: 40px;
`;

const Home = () => {
  const user = useAuthUser();

  return (
    <>
      <Title>Cards</Title>
      <p>{JSON.stringify(user.id)}</p>
      <Switch colorScheme="purple" />
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Home);
