import {IAction} from '../../StoreManager/types';
import {IUser} from '../../types';
import {ACTION_TYPE} from '../enums';

export interface IUserReducerState{
    currentUser: IUser | undefined
}

const initialState: IUserReducerState = {
    currentUser: undefined
}

export function userReducer(state = initialState, action: IAction): IUserReducerState{
    switch (action.type){
        case ACTION_TYPE.addUser:
            return {
                ...state,
                currentUser: action.payload.user
            }
        default:
            return state;
    }
}

