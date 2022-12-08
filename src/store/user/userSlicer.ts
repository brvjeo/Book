import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../types';
import {RootState} from '../store';

export type TUserState = {
    currentUser: IUser | null,
};

export const userSlicer = createSlice(
    {
        name: 'user',
        initialState: {
            currentUser: null
        } as TUserState,
        reducers: {
            authUser: {
                reducer: (state: any, action: PayloadAction<TUserState>) => void (state.currentUser = action.payload.currentUser),
                prepare: (currentUser: IUser) => {
                    return {
                        payload: {currentUser}
                    };
                }
            }
        }
    }
);

export const userSelector = (state: RootState): IUser | null => state.user.currentUser;
export const {authUser} = userSlicer.actions;
export default userSlicer.reducer;