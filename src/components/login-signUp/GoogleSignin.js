import firebase  from 'firebase/app';

export const googleSignin = async () => {

    var provider = new firebase.auth.GoogleAuthProvider();
    await  firebase.auth().signInWithPopup(provider)
}