import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../core/application';

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
                reducer: (state: any, action: PayloadAction<TUserState>) => void(state.currentUser = action.payload.currentUser),
                prepare: (currentUser: IUser) => {
                    return {
                        payload: {currentUser}
                    };
                }
            }
        }
    }
);

export const {authUser} = userSlicer.actions;
export default userSlicer.reducer;