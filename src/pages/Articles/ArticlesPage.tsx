import {Layout} from '../../components/Layout/Layout';
import {Header} from '../../components/Header/Header';
import React, {useEffect, useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ArticlesSwiper} from '../../components/ArticlesSwiper/ArticlesSwiper';
import {useAppSelector} from "../../store/hooks/useAppSelector";

export const ArticlesPage: React.FC = (): React.ReactElement | null => {
    const navigate = useNavigate();
    const isMounted = useRef(false);
    const {userID} = useParams();
    const {currentUser: user, viewed} = useAppSelector(state => state.user);

    useEffect(
        () => {
            if(isMounted.current && userID !== user?.id){
                navigate('/');
            }else{
                isMounted.current = true;
            }
        },
        [isMounted.current]
    )

    return (
        <Layout header={<Header/>}>
            <ArticlesSwiper articles={viewed}/>
        </Layout>
    );
}