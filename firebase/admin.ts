import admin from 'firebase-admin';
var serviceAccount = require('../serviceAccountKey.json');

if (!admin.app.length)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      'https://vanguardecks-api-default-rtdb.europe-west1.firebasedatabase.app',
  });

const firestore = admin.firestore();

export default firestore;
