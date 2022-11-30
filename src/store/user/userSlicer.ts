import {createSlice} from '@reduxjs/toolkit';
import {IArticle, IUser} from '../../core/application';

export type TUserState = {
    currentUser: IUser | null,
    viewed: IArticle[] | null,

};
const initialState: TUserState = {
    currentUser: null,
    viewed: null
}

export const userSlicer = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            authUser: (state, action) => void(state.currentUser = action.payload),
            pullViewed: (state, action) => void(state.viewed = action.payload)
        }
    }
);

export const {authUser, pullViewed} = userSlicer.actions;
export default userSlicer.reducer;