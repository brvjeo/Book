import {AnyAction, ThunkAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {Application} from "../../../core/application";
import {authUser} from "../userSlicer";

export const authenticateUserOnReloadThunk = (application: Application) : ThunkAction<void, RootState, any, AnyAction> => dispatch => {
    const userIdFromStorage = Application.getUserFromStorage();

    if(userIdFromStorage){
        application.fetchUser(userIdFromStorage)
            .then(
                user => dispatch(authUser(user))
            )
            .catch(
                e => console.log(JSON.stringify(e))
            );
    }
}