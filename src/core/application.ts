import {v4 as uuid} from 'uuid';
import {Firebase} from '../firebase/firebase';

interface IUser {
    id: string,
    name: string,
    lastname: string,
    email: string
    articles: string[],
    viewed: string[]
}

type TUserIDS = Record<string, string>;
type TUsers = Record<string, IUser>

export class Application {
    createUser(
        firebaseID: string,
        name: string,
        lastname: string,
        email: string,
        callback: (userRecord: TUserIDS, user: IUser, resolve: (value: any) => void, reject: (e: any) => void) => void
    ): Promise<string> {
        const userID = uuid();
        const userRecord: TUserIDS = {
            [firebaseID]: userID
        };
        const user: IUser = {
            id: userID,
            name,
            lastname,
            email,
            articles: [],
            viewed: []
        };

        return new Promise((resolve, reject) => callback(userRecord, user, resolve, reject));
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