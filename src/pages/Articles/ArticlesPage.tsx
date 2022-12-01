import {Layout} from '../../components/Layout/Layout';
import {Header} from '../../components/Header/Header';
import React, {useEffect, useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ArticlesSwiper} from '../../components/ArticlesSwiper/ArticlesSwiper';
import {useAppSelector} from "../../store/hooks/useAppSelector";
import {Application} from "../../core/application";

export const ArticlesPage: React.FC = (): React.ReactElement | null => {
    const ref = useRef(false)
    const navigate = useNavigate();
    const {userID} = useParams();
    const {currentUser: user, viewed} = useAppSelector(state => state.user);

    useEffect(
        () => {
            if(userID !== Application.getUserFromStorage()){
                navigate('/*');
            }
            if(ref.current && user === null){
                navigate('/');
            }else{
                ref.current = true;
            }
        },
        [userID]
    )

    return (
        <Layout header={<Header/>}>
            <ArticlesSwiper articles={viewed}/>
        </Layout>
    );
}