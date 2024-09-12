import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: `AIzaSyCiQ5SGxtTp6iNnkFzD9OC9klOEKvibOPg`,
    authDomain: `react-news-app-535ba.firebaseapp.com`,
    projectId: `react-news-app-535ba`,
    storageBucket: `react-news-app-535ba.appspot.com`,
    messagingSenderId: `109446647300`,
    appId: `1:109446647300:web:d44dd1b5b43d268abd2f51`,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const db = getFirestore(app);

const storage = getStorage();

export {
    auth,
    provider,
    db,
    storage,
};
