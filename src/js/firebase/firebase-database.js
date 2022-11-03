import { refs } from '../refs';
import { initializeApp } from 'firebase/app';
import { createAccount } from './firebase-auth';
import {
  getDatabase,
  ref,
  set,
  child,
  push,
  update,
  connectDatabaseEmulator,
} from 'firebase/database';
import { auth, app } from './firebase-auth';

const firebaseConfig = {
  databaseURL:
    'https://filmoteka-group-11-js-project-default-rtdb.europe-west1.firebasedatabase.app',
};

const database = getDatabase(app);

// const firebaseRef = firebase.database().ref('emails');
function writeUserData(userId, email) {
  set(ref(database, 'users/' + userId), {
    email: email,
  });
}

// if (location.hostname === 'localhost') {
//   // Point to the RTDB emulator running on localhost.
//   connectDatabaseEmulator(database, 'localhost', 9000);
// }

refs.sendSignUpInfo.addEventListener('click', createAccount);
// writeUserData('k@ur.net');

// const starCountRef = ref(db, 'posts/' + postId + '/starCount');
// onValue(starCountRef, snapshot => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });
