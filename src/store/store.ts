import {createStore} from '../StoreManager/store';
import {IAction, IState, RootReducer} from '../StoreManager/types';
import {userReducer} from './user/reducer';


const rootReducer: RootReducer = (state: IState = {} as IState, action: IAction = {} as IAction): IState => {
    return {
        user: userReducer(state.user, action)
    };
}

export const store = createStore(rootReducer);