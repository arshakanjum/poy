import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyD2oF8YhJiHBH-NqGrvZfjah5zpRcHNW20",
    authDomain: "koyilandykootam.firebaseapp.com",
    databaseURL: "https://koyilandykootam.firebaseio.com",
    projectId: "koyilandykootam",
    storageBucket: "koyilandykootam.appspot.com",
    messagingSenderId: "1069898706390"

};
var fire = firebase.initializeApp(config);
export default fire;
export const database = firebase.database()
export const auth = firebase.auth
export const provider = new firebase.auth.FacebookAuthProvider();
