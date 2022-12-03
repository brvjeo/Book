import {Layout} from '../../components/Layout/Layout';
import {Header} from '../../components/Header/Header';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ArticlesSwiper} from '../../components/ArticlesSwiper/ArticlesSwiper';
import {useAppSelector} from "../../store/hooks/useAppSelector";
import {ArticlesList} from '../../components/ArticlesList/ArticlesList';
import {ApplicationContext} from "../../App";
import {Application, IArticle, IUser} from "../../core/application";
import styles from './ArticlesPage.module.scss';

type TArticlesState = {
    viewed: IArticle[] | null,
    articles: IArticle[] | null
}

export const ArticlesPage: React.FC = (): React.ReactElement | null => {
    const application = useContext(ApplicationContext);
    const ref = useRef(false)
    const navigate = useNavigate();
    const {userID} = useParams();
    const {currentUser} = useAppSelector(state => state.user);
    const [articlesState, setArticlesState] = useState<TArticlesState>({viewed: null, articles: null})
    const [articlesLimit, setArticlesLimit] = useState(10);

    const fetchArticles = async (user: IUser) => {
        const viewed = await application.fetchViewed(user);
        const articles = await application.fetchArticlesByLimit(articlesLimit);

        setArticlesState({viewed, articles});
    }

    useEffect(
        () => {
            if(userID !== Application.getUserFromStorage()){
                navigate('/*');
            }

            if(ref.current && currentUser === null){
                navigate('/');
            }else{
                ref.current = true;
            }

            if (currentUser) {
                void fetchArticles(currentUser);
            }
        },
        [userID, ref.current]
    )

    return (
        <Layout header={<Header/>}>
            <div className={styles.wrapper}>
                <ArticlesSwiper articles={articlesState.viewed}/>
                <ArticlesList articles={articlesState.articles}/>
            </div>
        </Layout>
    );
}