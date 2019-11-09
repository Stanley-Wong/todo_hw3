import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyDrLlQisDG7OgJgizzQqXiY-TN5-bKJD28",
authDomain: "todo-rrf-316-541f1.firebaseapp.com",
databaseURL: "https://todo-rrf-316-541f1.firebaseio.com",
projectId: "todo-rrf-316-541f1",
storageBucket: "todo-rrf-316-541f1.appspot.com",
messagingSenderId: "564072298094",
appId: "1:564072298094:web:ad0cd7c4978f10a48ed87f",
measurementId: "G-E9FT48QLL1"
};
firebase.initializeApp(firebaseConfig);


// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;