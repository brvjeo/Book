import {v4 as uuid} from 'uuid';
import {TFormValues} from '../components/SignupForm/SignupForm';
import {FirebaseApp, initializeApp} from "firebase/app";
import {
    collection,
    doc,
    DocumentData,
    DocumentSnapshot,
    Firestore,
    getDoc,
    getFirestore,
    setDoc
} from "firebase/firestore";
import {
    Auth,
    createUserWithEmailAndPassword,
    deleteUser,
    getAuth,
    signInWithEmailAndPassword,
    User,
    UserCredential
} from "firebase/auth";
import {firebaseConfig} from '../core/config';
import {DB_ROUTES} from "../enums";

export interface IUser {
    id: string,
    name: string,
    lastname: string,
    email: string
    articles: string[],
    viewed: string[]
}

export interface IArticle {
    id: string,
    content: string | null,
    info: {
        user: IUser,
        date: string,
        views: number,
        topics: string[],
        title: string
    }
}

export class Application {
    app: FirebaseApp;
    db: Firestore;
    auth: Auth;

    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);
        this.db = getFirestore(this.app);
    }

    static createUser(id: string, {name, lastname, email}: TFormValues): IUser {
        return {
            id: uuid(),
            name,
            lastname,
            email,
            articles: [],
            viewed: []
        };
    }

    static createArticle(user: IUser, title: string): IArticle {
        return {
            id: uuid(),
            content: null,
            info: {
                user,
                date: new Date().toLocaleDateString(),
                views: 0,
                topics: [],
                title
            }
        }
    }

    static setUserToStorage(id: string) {
        localStorage.setItem('CURRENT_USER', id);
    }

    static getUserFromStorage(): string | null {
        return localStorage.getItem('CURRENT_USER');
    }

    fetchViewed(user: IUser): Promise<Array<IArticle>> {
        return Promise.all(
            user.viewed.map(id => this.fetchArticle(id).catch(_ => null))
        ).then(
            articles => articles.filter(article => article !== null && Object.values(article).length)
        ) as Promise<Array<IArticle>>;
    }

    fetchUser(uid: string): Promise<IUser> {
        return this.readDB(DB_ROUTES.users, uid).then(doc => doc.data() as IUser);
    }

    fetchArticle(id: string): Promise<IArticle> {
        return this.readDB(DB_ROUTES.articles, id).then(doc => doc.data() as IArticle);
    }

    signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    pushUser(uid: string, user: IUser): Promise<any>{
        return this.writeDB(DB_ROUTES.users, uid, user);
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

export const initializeApplication = (() => {
    return () => {
        let app: Application | undefined;

        if (!app) {
            app = new Application();
        }

        return app;
    }
})();