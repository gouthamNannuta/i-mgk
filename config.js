// import { firebase } from '@firebase/app';
import * as firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfnrjmj_jzJ4RPRNBmT4Z0oFATaVf13ng",
  authDomain: "booksanta-819fc.firebaseapp.com",
  projectId: "booksanta-819fc",
  storageBucket: "booksanta-819fc.appspot.com",
  messagingSenderId: "689074840198",
  appId: "1:689074840198:web:430175b0bd8926e576e707"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase.firestore();
