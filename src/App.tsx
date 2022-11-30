import React, {useEffect, useState} from 'react';
import {NotFoundPage} from './pages/Not found/NotFoundPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoginPage} from './pages/Login/LoginPage';
import {ArticlesPage} from './pages/Articles/ArticlesPage';
import {useAppDispatch} from './store/hooks/useAppDispatch';
import {authenticateUserThunk} from "./store/user/thunks/authenticateUserThunk";
import {initializeApplication} from "./core/application";
import {authUser, pullViewed} from "./store/user/userSlicer";


export const application = initializeApplication();
export const ApplicationContext = React.createContext(application);

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(
        () => {
            const userIdFromStorage = application.getUserFromStorage();

            if (userIdFromStorage !== null) {
                application.fetchUser(userIdFromStorage)
                    .then(
                        async user => {
                            try{
                                const viewed = await application.fetchViewed(user);
                                dispatch(authenticateUserThunk(user, viewed));
                            }catch (e) {
                                return e;
                            }
                        }
                    )
                    .catch(e => console.log(JSON.stringify(e)))
            }
        },
        []
    )

    return (
        <ApplicationContext.Provider value={application}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<LoginPage/>}/>
                    <Route path={'*'} element={<NotFoundPage/>}/>
                    <Route path={'/:userID/articles'} element={<ArticlesPage/>}/>
                </Routes>
            </BrowserRouter>
        </ApplicationContext.Provider>
    );
}
