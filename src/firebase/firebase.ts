import {initializeApp, FirebaseApp} from "firebase/app";
import {getFirestore, Firestore} from "firebase/firestore";
import {UserCredential, getAuth, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import {firebaseConfig} from './config';

export enum DB_ROUTES{
    userIDS = 'userIDS'
}

export class Firebase {
    app: FirebaseApp;
    db: Firestore;
    auth: Auth;

    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);
        this.db = getFirestore(this.app);
    }

    signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential>{
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    writeDB(route: DB_ROUTES, data: any){
        return addDoc(collection(this.db, route), data);
    }
}

export const initializeFirebaseApp = (() => {
    return () => {
        let firebase: Firebase | undefined;

        if(!firebase){
            firebase = new Firebase();
        }
        return firebase;
    }
})();