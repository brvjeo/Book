import {createSlice} from '@reduxjs/toolkit';
import {IUser} from '../../core/application';

export type TUserState = IUser | null;
const initialState: TUserState = null;

export const userSlicer = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            authUser: (state, action) => action.payload
        }
    }
);

export const {authUser} = userSlicer.actions;
export default userSlicer.reducer;