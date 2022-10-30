import { refs } from '../refs';
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  child,
  push,
  update,
  connectDatabaseEmulator,
} from 'firebase/database';
import { firebaseConfig, auth, app } from './firebase-auth';
import { initializeApp } from 'firebase-admin/app';

const database = getDatabase(app);

const admin = require('firebase-admin');

const serviceAccount = require('path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://filmoteka-group-11-js-project-default-rtdb.europe-west1.firebasedatabase.app',
});

function writeUserData(userId, email) {
  const db = getDatabase(app);
  set(ref(db, 'users/' + userId), {
    email: email,
  });
}

if (location.hostname === 'localhost') {
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(database, 'localhost', 9000);
}

writeUserData('k@ur.net');

// const starCountRef = ref(db, 'posts/' + postId + '/starCount');
// onValue(starCountRef, snapshot => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });
