import {initializeApp} from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyCuYnpH2hZ68qBZ6fgd5m5W-9z6p5_Gjjo",
    authDomain: "kinosearch-429c2.firebaseapp.com",
    projectId: "kinosearch-429c2",
    storageBucket: "kinosearch-429c2.appspot.com",
    messagingSenderId: "770932724924",
    appId: "1:770932724924:web:7286ed110f520872996cb9",
    databaseURL: "https://kinosearch-429c2-default-rtdb.europe-west1.firebasedatabase.app/"
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;