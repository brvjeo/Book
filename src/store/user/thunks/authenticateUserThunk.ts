import {authUser} from '../userSlicer';
import {AnyAction, ThunkAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';

export const authenticateUserThunk = (user: any) : ThunkAction<void, RootState, any, AnyAction> => dispatch => {
    dispatch(authUser(user));
}