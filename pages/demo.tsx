import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';

const Demo = () => {
  const authUser = useAuthUser();
  return (
    <div>
      <p>Your email is {authUser.email ? authUser.email : 'unknown'}.</p>
    </div>
  );
};

// Note that this is a higher-order function.
export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser()(Demo);
