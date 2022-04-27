import { Box, Center, theme } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Input } from "@chakra-ui/react";
import { GetServerSideProps } from "next/types";
import { useLogin } from "hooks/useLogin";
import { withAuth } from "lib/withAuth";

const LoginBox = styled(Box)`
  padding: ${theme.space[10]};
`;

const Login = () => {
  const { error, success, onLogin, loginWithGoogle } = useLogin();

  if (success) {
    return (
      <div>
        <h1>{success}</h1>
      </div>
    );
  }

  return (
    <Center h="100vh">
      <LoginBox boxShadow="xl" rounded="lg">
        <p data-cy="form-error">{error}</p>
        <form onSubmit={onLogin} data-cy="form-login">
          <Input placeholder="Email" id="email" />
          <Input placeholder="Password" type="password" id="password" />
          <button type="submit">send</button>
        </form>
        <button onClick={loginWithGoogle}>Login with google</button>
      </LoginBox>
    </Center>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});

export default Login;
