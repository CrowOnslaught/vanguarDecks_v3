import FirebaseAuth from 'components/FirebaseAuth';
import { AuthAction, withAuthUser } from 'next-firebase-auth';

const Login = () => {
  return <FirebaseAuth />;
};

export default withAuthUser({ whenAuthed: AuthAction.REDIRECT_TO_APP })(Login);
