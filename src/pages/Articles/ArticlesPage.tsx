import {Layout} from '../../components/Layout/Layout';
import {Header} from '../../components/Header/Header';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {ArticlesSwiper} from '../../components/ArticlesSwiper/ArticlesSwiper';
import {useAppSelector} from "../../store/hooks/useAppSelector";
import {ArticlesList} from '../../components/ArticlesList/ArticlesList';
import {ApplicationContext} from "../../App";
import {Application} from "../../core/application";
import styles from './ArticlesPage.module.scss';
import {Button} from "../../components/Button/Button";
import {BUTTON_SIZE} from "../../enums";
import {IArticle, IUser} from '../../types';

export const ArticlesPage: React.FC = (): React.ReactElement | null => {
    const application = useContext(ApplicationContext);

    const ref = useRef(false)
    const navigate = useNavigate();
    const {userID} = useParams();
    const {currentUser} = useAppSelector(state => state.user);
    const [state, setState] = useState<
        {
            viewed: IArticle[] | null,
            articles: IArticle[] | null
        }
    >({viewed: null, articles: null})

    const fetchArticles = async (user: IUser) => {
        try {
            const viewed = await application.fetchArticles(user.viewed);
            const articles = await application.fetchArticlesByLimit(10);

            setState({articles, viewed});
        } catch (e) {
            console.log("DISPLAY ERROR IN ARTICLES");
        }
    }

    useEffect(
        () => {
            if (userID !== Application.getUserFromStorage()) {
                navigate('/*');
            }

            if (ref.current && currentUser === null) {
                navigate('/');
            } else {
                ref.current = true;
            }

            if (currentUser) {
                void fetchArticles(currentUser);
            }
        },
        [userID, ref.current]
    )

    return (
        <Layout header={(
            <Header>
                {
                    (route) => (
                        <Link to={`/${route}/editor`}>
                            <Button size={BUTTON_SIZE.M}>Create</Button>
                        </Link>
                    )
                }
            </Header>
        )}>
            <div className={styles.wrapper}>
                <ArticlesSwiper articles={state.viewed}/>
                <ArticlesList articles={state.articles}/>
            </div>
        </Layout>
    );
}