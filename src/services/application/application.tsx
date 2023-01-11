import {FirebaseApp, initializeApp} from "firebase/app";
import {
    collection,
    doc,
    DocumentSnapshot,
    Firestore,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    query,
    QuerySnapshot,
    setDoc
} from "firebase/firestore";
import {
    Auth,
    createUserWithEmailAndPassword,
    deleteUser,
    getAuth,
    signInWithEmailAndPassword,
    User as FirebaseUser,
    UserCredential
} from "firebase/auth";
import config from '../../data/constants/config';
import {DATABASE_ERRORS, DB_ROUTES} from "../../types/enums";
import {User} from '../user/user';
import {TID} from '../../types/types';

export class Application {
    app: FirebaseApp;
    db: Firestore;
    auth: Auth;

    constructor() {
        this.app = initializeApp(config);
        this.auth = getAuth(this.app);
        this.db = getFirestore(this.app);
    }

    static setUserToStorage(id: string) {
        localStorage.setItem('CURRENT_USER', id);
    }

    static getUserFromStorage(): string | null {
        return localStorage.getItem('CURRENT_USER');
    }

    writeUser(user: User) {
        return this.writeDB(DB_ROUTES.users, user.id, user);
    }

    getUser(id: TID): Promise<User> {
        return this.readDB(DB_ROUTES.users, id)
            .then(
                doc => doc.exists() ? doc.data() as User : Promise.reject(new Error(DATABASE_ERRORS.invalidUser))
            );
    }

    login(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    signup(email: string, password: string): Promise<UserCredential> {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    writeDB<T extends { [x: string]: any }>(route: DB_ROUTES, segment: string, data: T) {
        const collection_ = collection(this.db, route);
        return setDoc(doc(collection_, segment), data, {merge: true});
    }

    readDB(route: DB_ROUTES, limit: number): Promise<QuerySnapshot>;
    readDB(route: DB_ROUTES, segment: string): Promise<DocumentSnapshot>;
    readDB(route: DB_ROUTES, option: number | string): Promise<DocumentSnapshot> | Promise<QuerySnapshot> {
        const collection_ = collection(this.db, route);
        if (typeof option === 'string') {
            return getDoc(doc(collection_, option));
        } else {
            const q = query(collection_, limit(option));
            return getDocs(q);
        }
    }

    deleteUser(user: FirebaseUser): Promise<void> {
        return deleteUser(user);
    }
}

export const initializeApplication = (() => {
    return () => {
        let app: Application | undefined;

        if (!app) {
            app = new Application();
        }

        return app;
    }
})();