import firebase from 'firebase';
import type { NextPage } from 'next';
import Router from 'next/router';

const Home: NextPage = () => {
  const onLogOut = () => {
    firebase.auth().signOut();
    Router.push('/login');
  };

  return (
    <>
      <h1>Hellouda</h1>
      <button onClick={onLogOut}>logout</button>
    </>
  );
};

export default Home;
