import { Box, Center, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import FirebaseAuth from 'components/FirebaseAuth';
import { AuthAction, withAuthUser } from 'next-firebase-auth';

const LoginBox = styled(Box)`
  padding: ${theme.space[10]};
`;

const Login = () => {
  return (
    <Center h="100vh">
      <LoginBox bg="purple.300" boxShadow="xl" rounded="lg">
        <FirebaseAuth />
      </LoginBox>
    </Center>
  );
};

export default withAuthUser({ whenAuthed: AuthAction.REDIRECT_TO_APP })(Login);
