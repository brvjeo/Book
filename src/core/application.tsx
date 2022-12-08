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
    User,
    UserCredential
} from "firebase/auth";
import _ from 'lodash';
import {firebaseConfig} from './config';
import {DATABASE_ERRORS, DB_ROUTES} from "../enums";
import {IArticle, IArticleContent, IUser, TArticleRecord} from '../types';
import {v4 as uuid} from 'uuid';
import {buildArticle, isArticleRecord, readSnapshot} from '../utils/utils';

export class Application {
    app: FirebaseApp;
    db: Firestore;
    auth: Auth;

    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);
        this.db = getFirestore(this.app);
    }

    static setUserToStorage(uid: string) {
        localStorage.setItem('CURRENT_USER', uid);
    }

    static getUserFromStorage(): string | null {
        return localStorage.getItem('CURRENT_USER');
    }

    pushUser(user: IUser): Promise<void> {
        return this.writeDB(DB_ROUTES.users, user.uid, user);
    }

    pushArticle(article: TArticleRecord | IArticle): Promise<void> {
        if (isArticleRecord(article)) {
            return this.writeDB(DB_ROUTES.articles, article.id, article);
        } else {
            return this.writeDB<TArticleRecord>(DB_ROUTES.articles, article.id, {
                id: article.id,
                content: article.content,
                info: {
                    user: article.info.user.uid,
                    date: article.info.date,
                    topics: article.info.topics,
                    views: article.info.views,
                    title: article.info.title
                }
            });
        }
    }

    pushContent(content: IArticleContent): Promise<void> {
        return this.writeDB(DB_ROUTES.content, content.id, content);
    }

    generateUser<T extends { name: string, lastname: string, email: string }>(uid: string, {
        name,
        lastname,
        email
    }: T): IUser {
        return {
            uid,
            id: uuid(),
            name,
            lastname,
            email,
            articles: [],
            viewed: []
        };
    }

    generateArticleWithContent<T extends { title: string, content: string }>(user: IUser, values: T): { article: TArticleRecord, content: IArticleContent } {
        const articleID = uuid();

        const content = this.generateContent(values);
        const article: TArticleRecord = {
            id: articleID,
            content: content.id,
            info: {
                user: user.uid,
                date: new Date().toLocaleDateString().split('.').join('-'),
                topics: [],
                views: 0,
                title: content.nodes[0].content
            }
        };

        return {article, content};
    }

    generateContent<T extends { title: string, content: string }>({title, content}: T): IArticleContent {
        return {
            id: uuid(),
            nodes: buildArticle(title, content)
        };
    }

    async viewArticle(user: IUser, article: IArticle): Promise<{ user: IUser, article: IArticle }> {
        const user_ = _.cloneDeep(user);
        const article_ = _.cloneDeep(article);

        if (!user_.viewed.includes(article_.id)) {
            user_.viewed.push(article_.id);
            article_.info.views++;
        }

        try {
            await this.pushUser(user_);
            await this.pushArticle(article_);

            return {user: user_, article: article_};
        } catch (e) {
            return Promise.reject(e);
        }

        return {user: user_, article: article_};
    }

    fetchArticlesByLimit(limit: number): Promise<Array<IArticle>> {
        return this.readDB(DB_ROUTES.articles, limit)
            .then(readSnapshot<TArticleRecord>)
            .then(
                records => Promise.all(
                    records.map(
                        ({id, content, info: {date, topics, user, title, views}}) => this.fetchUser(user).then(
                            (user): IArticle => {
                                return {
                                    id,
                                    content,
                                    info: {user, date, topics, title, views}
                                };
                            }
                        )
                    )
                )
            );
    }

    fetchArticles(ids: string[]): Promise<Array<IArticle>> {
        return Promise.all(ids.map(id => this.fetchArticle(id)));
    }

    fetchContent(id: string): Promise<IArticleContent> {
        return this.readDB(DB_ROUTES.content, id)
            .then(
                doc => doc.exists() ? doc.data() as IArticleContent : Promise.reject(new Error(DATABASE_ERRORS.invalidArticle))
            );
    }

    fetchArticle(id: string): Promise<IArticle> {
        return this.readDB(DB_ROUTES.articles, id)
            .then(
                async (doc): Promise<IArticle> => {
                    if (doc.exists()) {
                        try {
                            const {
                                id,
                                content,
                                info: {user: userID, date, topics, title, views}
                            } = doc.data() as TArticleRecord;

                            const user = await this.fetchUser(userID);
                            return {
                                id,
                                content,
                                info: {date, topics, title, views, user}
                            };
                        } catch (e) {
                            return Promise.reject(DATABASE_ERRORS.invalidArticle);
                        }
                    } else {
                        return Promise.reject(DATABASE_ERRORS.invalidArticle);
                    }
                }
            );
    }

    fetchUser(uid: string): Promise<IUser> {
        return this.readDB(DB_ROUTES.users, uid)
            .then(
                doc => doc.exists() ? doc.data() as IUser : Promise.reject(new Error(DATABASE_ERRORS.invalidUser))
            );
    }

    signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
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