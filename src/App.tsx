import React, {useEffect, useState} from 'react';
import {NotFoundPage} from './pages/Not found/NotFoundPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoginPage} from './pages/Login/LoginPage';
import {ArticlesPage} from './pages/Articles/ArticlesPage';
import {useAppDispatch} from './store/hooks/useAppDispatch';
import {authenticateUserOnReloadThunk} from "./store/user/thunks/authenticateUserOnReloadThunk";
import {initializeApplication} from "./core/application";
import {EditorPage} from './pages/Editor/EditorPage';

export const application = initializeApplication();
export const ApplicationContext = React.createContext(application);

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(
        () => {
            setTimeout(
                () => dispatch(authenticateUserOnReloadThunk(application)),
                2000
            );
        },
        []
    );

    return (
        <ApplicationContext.Provider value={application}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<LoginPage/>}/>
                    <Route path={'*'} element={<NotFoundPage/>}/>
                    <Route path={'/:userID/articles'} element={<ArticlesPage/>}/>
                    <Route path={'/:userID/editor'} element={<EditorPage/>}/>
                </Routes>
            </BrowserRouter>
        </ApplicationContext.Provider>
    );
}
