import {IAction, IRootReducer, IState} from '../store/store';

export class Store{
    state;
    rootReducer;

    subscribers: Record<string,(state: IState) => void> = {};

    constructor(rootReducer: IRootReducer) {
        this.rootReducer = rootReducer;
        this.state = this.rootReducer();
    }

    subscribe(id: string, callback: (state: IState) => void){
        this.subscribers[id] = callback;
        this.subscribers[id](this.state);

        const unsubscribe = () => delete this.subscribers[id];

        return unsubscribe.bind(this);
    }

    dispatch(action: IAction){
        this.state = this.rootReducer(this.state, action);

        Object.values(this.subscribers).forEach(callback => callback(this.state));
    }
}

export const createStore = (() => {
    let store: Store;

    return (rootReducer: IRootReducer) => {
        if(!store){
            store = new Store(rootReducer);
        }
        return store;
    }
})();