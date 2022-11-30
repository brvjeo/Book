import {Layout} from '../../components/Layout/Layout';
import {Header} from '../../components/Header/Header';
import React from 'react';
import {useParams} from 'react-router-dom';
import {ArticlesSwiper} from '../../components/ArticlesSwiper/ArticlesSwiper';
import styles from './ArticlesPage.module.scss';

export const ArticlesPage: React.FC = (): React.ReactElement | null => {
    const {userID: id} = useParams();

    return (
        <Layout header={<Header/>}>
            <ArticlesSwiper/>
        </Layout>
    );
}