import {TID} from '../../types/types';

export interface IUser {
    id: TID,
    username: string,
    articles: TID[],
    viewed: TID[]
}

export class User implements IUser {
    articles: TID[];
    id: TID;
    username: string;
    viewed: TID[];

    constructor(id: string, username: string) {
        this.id = id;
        this.username = username;
        this.viewed = [];
        this.articles = [];
    }
}

console.log(new User('djand', "Arseniy"));