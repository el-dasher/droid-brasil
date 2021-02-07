import firebase from 'firebase';

const firebaseConfig = {
  projectId: 'inaba-tewi'
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const FIREBASE = firebase.app();
const FIRESTORE = FIREBASE.firestore();

export default FIREBASE;
export { FIRESTORE };
