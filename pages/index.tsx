import firebase from 'firebase';
import type { NextPage } from 'next';
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import Router from 'next/router';

const Home = () => {
  const user = useAuthUser();

  const onLogOut = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <h1>Hellouda</h1>
      <p>{JSON.stringify(user)}</p>
      {user.id && <button onClick={onLogOut}>logout</button>}
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Home);
