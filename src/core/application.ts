import {v4 as uuid} from 'uuid';
import {TFormValues} from '../components/SignupForm/SignupForm';
import {DocumentSnapshot, DocumentData} from "firebase/firestore";

export interface IUser {
    id: string,
    name: string,
    lastname: string,
    email: string
    articles: string[],
    viewed: string[]
}

export interface IArticle{
    id: string,
    content: string | null,
    info:{
        user: IUser,
        date: string,
        views: number,
        topics: string[],
        title: string
    }
}

export type TUserRecord = {
    uid: string,
    user: IUser
}

export class Application {
    createUser(id: string, {name, lastname, email}: TFormValues): IUser {
        return {
            id: uuid(),
            name,
            lastname,
            email,
            articles: [],
            viewed: []
        };
    }

    setUserToStorage(id: string){
        localStorage.setItem('CURRENT_USER', id);
    }

    getUserFromStorage(): string | null{
        return localStorage.getItem('CURRENT_USER');
    }

    createArticle(user: IUser, title: string): IArticle{
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

    fetchViewed(user: IUser, callback: (id: string) => Promise<DocumentSnapshot<DocumentData>>): Promise<any[]>{
        return Promise.all(
            user.viewed.map(
                id => callback(id)
                    .then(doc => doc.exists() ? doc.data(): null)
                    .catch(_ => null)
            )
        ).then(articles => articles.filter(article => article && Object.values(article).length));
    }

    fetchUser(uid: string, callback: (id: string) => Promise<DocumentSnapshot<DocumentData>>): Promise<TUserRecord | null>{
        return callback(uid)
            .then(
                doc => {
                    if(doc.exists()){
                        return {
                            uid,
                            user: doc.data()
                        } as TUserRecord
                    }else{
                        return null;
                    }
                }
            )
            .catch(_ => null);
    }
}

export const initializeApp = (() => {
    return () => {
        let app: Application | undefined;

        if (!app) {
            app = new Application();
        }

        return app;
    }
})();