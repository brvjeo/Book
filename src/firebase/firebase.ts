import {FirebaseApp, initializeApp} from 'firebase/app';
import {getAuth, signInWithEmailAndPassword, UserCredential, Auth} from 'firebase/auth';
import {firebaseConfig} from './config';
import {LoginFormValues} from '../types';

class Firebase {
    app: FirebaseApp;
    auth: Auth;

    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);
    }

    signin({email, password}: LoginFormValues): Promise<UserCredential> {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    signup() {
    }
}

export const deployFirebase = (() => {
    let firebase: Firebase;

    return () => {
        if (!firebase) {
            firebase = new Firebase();
        }

        return firebase;
    }
})();