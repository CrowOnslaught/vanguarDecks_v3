import styled from '@emotion/styled';
import firebase from 'firebase';
import { Button, theme, Switch } from '@chakra-ui/react';
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';

const TestButton = styled(Button)`
  margin: ${() => theme.space[2]};
`;

const Home = () => {
  const user = useAuthUser();

  const onLogOut = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <h1>Hellouda</h1>
      <p>{JSON.stringify(user.id)}</p>
      <Switch colorScheme="purple" />
      {user.id && (
        <TestButton colorScheme="purple" onClick={onLogOut}>
          logout
        </TestButton>
      )}
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Home);
