import {Layout} from '../../components/Layout/Layout';
import {Header} from '../../components/Header/Header';
import React, {useEffect, useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ArticlesSwiper} from '../../components/ArticlesSwiper/ArticlesSwiper';
import styles from './ArticlesPage.module.scss';
import {useAppSelector} from "../../store/hooks/useAppSelector";

export const ArticlesPage: React.FC = (): React.ReactElement | null => {
    const {currentUser: user, viewed} = useAppSelector(state => state.user);

    return (
        <Layout header={<Header/>}>
            <ArticlesSwiper articles={viewed}/>
        </Layout>
    );
}