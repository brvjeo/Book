import {createStore} from '../StateManager/store';
import {ACTIONS} from '../enums';

export interface IAction {
    type: ACTIONS,
    payload: any
}

export interface IState {}

export interface IRootReducer {
    (state?: IState, action?: IAction): IState
}

export const rootReducer: IRootReducer = (state = {} as IState, action = {} as IAction): IState => {
    return {};
}

export const store = createStore(rootReducer);