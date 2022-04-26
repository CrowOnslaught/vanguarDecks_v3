import { Box, Center, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Input } from '@chakra-ui/react'
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from 'next/types';
import { useLogin } from 'hooks/useLogin';
import { sessionConfig } from 'config/sessionConfig';

const LoginBox = styled(Box)`
  padding: ${theme.space[10]};
`;

const SignUp = () => {
  const { error, success, onSingUp, loginWithGoogle } = useLogin();

  if (success) {
    return <div>
      <h1>{success}</h1>
    </div>
  }


  return (
    <Center h="100vh">
      <LoginBox boxShadow="xl" rounded="lg">
        <p data-cy="form-error">{error}</p>
        <form onSubmit={onSingUp} data-cy="form-signup">
          <Input placeholder='Name' id="name"/>
          <Input placeholder='Email' id="email"/>
          <Input placeholder='Password' type="password" id="password" />
          <button type='submit'>send</button>
        </form>
        <button onClick={loginWithGoogle}>Sign up with google</button>
      </LoginBox>
    </Center>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  if (req.session.tokens) {
    res.writeHead(307, { Location: '/' })
    res.end()
  }

  return {
    props: {}
  }
}, sessionConfig)

export default SignUp;
