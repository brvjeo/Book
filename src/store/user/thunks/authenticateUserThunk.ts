import {authUser, pullViewed} from '../userSlicer';
import {AnyAction, ThunkAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {IArticle, IUser} from "../../../core/application";

export const authenticateUserThunk = (user: IUser, articles: IArticle[]) : ThunkAction<void, RootState, any, AnyAction> => dispatch => {
    dispatch(authUser(user));
    dispatch(pullViewed(articles));
}