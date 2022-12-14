import React, {useEffect} from 'react';
import {NotFoundPage} from './pages/Not found/NotFoundPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoginPage} from './pages/Login/LoginPage';
import {ArticlesPage} from './pages/Articles/ArticlesPage';
import {useAppDispatch} from './store/hooks/useAppDispatch';
import {authenticateUserOnReloadThunk} from "./store/user/thunks/authenticateUserOnReloadThunk";
import {initializeApplication} from "./core/application";
import {EditorPage} from './pages/Editor/EditorPage';
import {ReaderPage} from './pages/Reader/ReaderPage';

export const application = initializeApplication();
export const ApplicationContext = React.createContext(application);

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(
        () => {
            dispatch(authenticateUserOnReloadThunk(application));
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
                    <Route path={`/:userID/articles/:articleID`} element={<ReaderPage/>}/>
                </Routes>
            </BrowserRouter>
        </ApplicationContext.Provider>
    );
}
