import {initializeApp, FirebaseApp} from "firebase/app";
import {getFirestore, Firestore} from "firebase/firestore";
import {
    UserCredential,
    getAuth,
    Auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    User,
    deleteUser
} from "firebase/auth";
import {setDoc, getDoc, doc, collection, DocumentSnapshot, DocumentData} from "firebase/firestore";
import {firebaseConfig} from './config';

export enum DB_ROUTES {
    users = 'users',
    articles = 'articles'
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

    createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    writeDB(route: DB_ROUTES, segment: string, data: any) {
        const collection_ = collection(this.db, route);
        return setDoc(doc(collection_, segment), data, {merge: true});
    }

    readDB(route: DB_ROUTES, segment: string): Promise<DocumentSnapshot<DocumentData>> {
        const collection_ = collection(this.db, route);
        return getDoc(doc(collection_, segment));
    }

    deleteUser(user: User): Promise<void> {
        return deleteUser(user);
    }
}

export const initializeFirebaseApp = (() => {
    return () => {
        let firebase: Firebase | undefined;

        if (!firebase) {
            firebase = new Firebase();
        }
        return firebase;
    }
})();