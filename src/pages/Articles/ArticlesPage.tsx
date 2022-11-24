import {Layout} from '../../components/Layout/Layout';
import {Header} from '../../components/Header/Header';
import React from 'react';

export const ArticlesPage: React.FC = (): React.ReactElement | null => {
    return (
        <Layout header={<Header/>}>
        </Layout>
    );
}