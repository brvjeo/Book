import React from 'react';
import {ApplicationContext} from '../context/ApplicationProvider';
import {Application} from '../application';

export const useApplication = (): Application => {
    return React.useContext(ApplicationContext);
}