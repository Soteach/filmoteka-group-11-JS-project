import { refs } from '../refs';
import Notiflix from 'notiflix';
import {
  showLoginError,
  showLoginSuccess,
  showCreateLoginSuccess,
  logOutNotification,
} from './firebaseNotifications';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  useDeviceLanguage,
  confirmPasswordReset,
} from 'firebase/auth';
import { onLogIn, onLogOut } from './firebaseFunc';

const firebaseConfig = {
  apiKey: 'AIzaSyDjaGoAoE49tic7CdNDFHBbf0MZHhhOqjw',
  authDomain: 'filmoteka-group-11-js-project.firebaseapp.com',
  projectId: 'filmoteka-group-11-js-project',
  storageBucket: 'filmoteka-group-11-js-project.appspot.com',
  messagingSenderId: '407642864469',
  appId: '1:407642864469:web:92aa1b08e9002568a8cddc',
  measurementId: 'G-GPZ3VGXDLX',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// firebase.auth().useDeviceLanguage();

// connectAuthEmulator(auth, 'http://localhost:9099');

const loginEmailPassword = async () => {
  const loginEmail = email.value;
  const loginPassword = password.value;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    // console.log(userCredential.user);
    showLoginSuccess();
    onLogIn();
  } catch (error) {
    console.log(error);
    showLoginError(error);
  }
};

export const createAccount = async () => {
  const loginEmail = email.value;
  const loginPassword = password.value;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    // showCreateLoginSuccess();
    // console.log(userCredential.user);
    Notiflix.Loading.standard({
      clickToClose: true,
      svgSize: '30px',
    });
    Notiflix.Loading.remove(1923);
    showCreateLoginSuccess();
    onLogIn();
  } catch (error) {
    console.log(error);
    showLoginError(error);
  }
};

const signInGoogle = async () => {
  await signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      showCreateLoginSuccess();
      onLogIn();
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // console.log(user);
      onLogIn();
      // ...
    } else {
      // console.log('Logged out!');
      onLogOut();
      // User is signed out
      // ...
    }
  });
};

monitorAuthState();
// useDeviceLanguage();
// setPersistence(auth, browserSessionPersistence)
//   .then(() => {
//     // Existing and future Auth states are now persisted in the current
//     // session only. Closing the window would clear any existing state even
//     // if a user forgets to sign out.
//     // ...
//     // New sign-in will be persisted with session persistence.
//     return signInWithEmailAndPassword(auth, email, password);
//   })
//   .catch(error => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

const logout = async () => {
  await signOut(auth);
  logOutNotification();
  onLogOut();
};

const onForgetPass = async () => {
  const loginEmail = email.value;

  try {
    await sendPasswordResetEmail(auth, loginEmail).then(result => {
      console.log('success', loginEmail);
      // confirmPasswordReset(result);
    });
  } catch (error) {
    console.log(error);
  }
};

// const onForgetPass = () => {
//   const loginEmail = email.value;
//  auth.sendPasswordResetEmail(loginEmail).then(() => {
//       console.log('success');
//     })
//  .catch {
//     error => console.log(error);
//   }
// };

refs.sendSignUpInfo.addEventListener('click', createAccount);
refs.sendSignInInfo.addEventListener('click', loginEmailPassword);
refs.btnLogout.addEventListener('click', logout);
refs.btnGoogle.addEventListener('click', signInGoogle);
refs.forgotBtn.addEventListener('click', onForgetPass);
