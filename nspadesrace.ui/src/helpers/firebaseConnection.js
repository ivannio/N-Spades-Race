import firebase from 'firebase/app';
import { firebaseKeys } from '../helpers/constants.json';

const firebaseInit = () => {
    firebase.initializeApp(firebaseKeys);
}

export default { firebaseInit };
