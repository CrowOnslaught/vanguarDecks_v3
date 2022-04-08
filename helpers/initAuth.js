import { init } from 'next-firebase-auth';

const initAuth = () => {
  init({
    authPageURL: '/login',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login', // required
    logoutAPIEndpoint: '/api/logout', // required
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
          : undefined,
      },
    },
    firebaseClientInitConfig: {
      apiKey: 'AIzaSyArABjMRDxzWrThMGJppFPEm-mqUzWPc2Y',
      authDomain: 'vanguardecks-api.firebaseapp.com',
      projectId: 'vanguardecks-api',
      storageBucket: 'vanguardecks-api.appspot.com',
      messagingSenderId: '121203494392',
      appId: '1:121203494392:web:451677a435e4d7503d1a0d',
      measurementId: 'G-R1K82P9RTH',
    },
    cookies: {
      name: 'vanguardecks-cookie-api', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // 12 days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    },
    onVerifyTokenError: err => {
      console.error(err);
    },
    onTokenRefreshError: err => {
      console.error(err);
    },
  });
};

export default initAuth;
