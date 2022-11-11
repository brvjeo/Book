import {IAction, IState, IStoreSubscriber, RootReducer} from './types';

export class Store {
    state: IState | undefined;
    subscribers: IStoreSubscriber = {};
    rootReducer: RootReducer

    constructor(rootReducer: RootReducer) {
        this.rootReducer = rootReducer;
        this.state = rootReducer();
    }

    subscribe(id: string, callback: (state: IState) => void): () => void {
        this.subscribers[id] = callback;
        if(this.state){
            this.subscribers[id](this.state);
        }

        const unsubscribe = () => delete this.subscribers[id];
        return unsubscribe.bind(this);
    }

    dispatch(action: IAction){
        if(this.state){
            this.state = this.rootReducer(this.state, action);
        }
        Object.values(this.subscribers).forEach(callback => {
            if(this.state){
                callback(this.state);
            }
        });
    }
}

export const createStore = (() => {
    let store: Store;

    return (rootReducer: RootReducer) => {
        if(!store){
            store = new Store(rootReducer);
        }

        return store;
    }
})();