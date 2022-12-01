import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle, IUser} from '../../core/application';

export type TUserState = {
    currentUser: IUser | null,
    viewed: IArticle[] | null
};

const userAuthorizeReducer = (state: any, action: PayloadAction<TUserState>) => {
    state.currentUser = action.payload.currentUser;
    state.viewed = action.payload.viewed;
}

const initialState: TUserState = {
    currentUser: null,
    viewed: null,
};

export const userSlicer = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            authUser: {
                reducer: userAuthorizeReducer,
                prepare: (currentUser: IUser, viewed: IArticle[]) => {
                    return {
                        payload: {currentUser, viewed}
                    };
                }
            }
        }
    }
);

export const {authUser} = userSlicer.actions;
export default userSlicer.reducer;