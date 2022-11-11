import {ACTION_TYPE} from '../store/enums';
import {IUserReducerState} from '../store/user/reducer';

export interface IState {
    user: IUserReducerState
}

export interface IStoreSubscriber {
    [id: string]: (state: IState) => void
}

export interface IAction {
    type: ACTION_TYPE,
    payload: any
}

export type RootReducer = (state?: IState, action?: IAction) => IState;