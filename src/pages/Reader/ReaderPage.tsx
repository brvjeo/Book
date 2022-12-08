import React, {useCallback, useContext, useEffect, useState} from 'react';
import _ from 'lodash';
import {Layout} from '../../components/Layout/Layout';
import {Button} from '../../components/Button/Button';
import {Header} from '../../components/Header/Header';
import {useNavigate, useParams} from 'react-router-dom';
import {BUTTON_SIZE} from '../../enums';
import {ApplicationContext} from '../../App';
import {IArticle, IArticleContent, IUser, TArticleRecord} from '../../types';
import styles from './ReaderPage.module.scss';
import {useAppSelector} from '../../store/hooks/useAppSelector';
import {parseArticle} from '../../utils/utils';
import {UserBadge} from '../../components/UserBadge/UserBadge';
import {useAppDispatch} from '../../store/hooks/useAppDispatch';
import {authUser, userSelector} from '../../store/user/userSlicer';


type TProps = {}
export const ReaderPage: React.FC<TProps> = (): React.ReactElement | null => {
    const application = useContext(ApplicationContext);
    const {articleID} = useParams();

    const navigate = useNavigate();

    const currentUser = useAppSelector(userSelector);
    const dispatch = useAppDispatch();

    const [state, setState] = useState<
        {
            article: IArticle,
            content: IArticleContent,
            user: IUser
        } | null
    >(null);

    const viewArticle = useCallback(
        async (user: IUser) => {
            try {
                const article = await application.fetchArticle(articleID as string);
                const content = await application.fetchContent(article.content);

                await application.viewArticle(user, article)
                    .then(
                        ({user, article}) => {
                            dispatch(authUser(user));
                            setState({user, article, content});
                        }
                    );
            } catch (e) {
                console.log(e);
                navigate('/');
            }
        },
        [application, articleID]
    );

    useEffect(
        () => {
            if (currentUser) {
                void viewArticle(currentUser);
            }
        },
        [currentUser]
    );

    return (
        <Layout header={
            <Header>
                {
                    route => <Button onClick={() => navigate('/')} size={BUTTON_SIZE.M}>Close</Button>
                }
            </Header>
        }>
            <div className={styles.container}>
                {
                    !!state && parseArticle(state.content).map((e, i) => <div key={i}
                                                                              className='article-block'>{e}</div>)
                }
                {
                    !!state && <UserBadge className={styles.badge} user={state.article.info.user}/>
                }
            </div>
        </Layout>
    );
}