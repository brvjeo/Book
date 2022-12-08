import React, {BaseSyntheticEvent, useCallback, useContext, useState} from 'react';
import _ from 'lodash';
import {Layout} from '../../components/Layout/Layout';
import {Header} from '../../components/Header/Header';
import styles from './EditorPage.module.scss';
import {Button} from "../../components/Button/Button";
import {BUTTON_SIZE} from "../../enums";
import {Input} from "../../components/Input/Input";
import {ApplicationContext} from "../../App";
import {useAppSelector} from "../../store/hooks/useAppSelector";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store/hooks/useAppDispatch";
import {authUser} from "../../store/user/userSlicer";
import {IUser, TArticleRecord} from '../../types';

type TProps = {}
export const EditorPage: React.FC<TProps> = (): React.ReactElement | null => {
    const navigate = useNavigate();
    const application = useContext(ApplicationContext);
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.currentUser);
    const [state, setState] = useState<{ title: string, content: string }>(
        {
            title: '',
            content: ''
        }
    );

    const creatingHandler = useCallback(
        async () => {
            if (!user) return;
            if (!state.content.length || !state.title.length) return;

            const {article, content} = application.generateArticleWithContent(user, state);

            try {
                await application.pushArticle(article);
                await application.pushContent(content);

                const userCopy: IUser = _.cloneDeep(user);

                userCopy.articles.push(article.id);

                await application.pushUser(userCopy);
                dispatch(authUser(userCopy));
            } catch (e) {
                console.log(e);
            } finally {
                navigate('/');
            }
        },
        [user, state, application]
    );

    const titleHandler = useCallback(
        (e: BaseSyntheticEvent) => {
            setState(
                state => {
                    state.title = e.target.value;
                    return state;
                }
            )
        },
        []
    );

    const contentHandler = useCallback(
        (e: BaseSyntheticEvent) => {
            setState(
                state => {
                    state.content = e.target.value;
                    return state;
                }
            )
        },
        []
    )

    return (
        <Layout header={(
            <Header>
                {
                    route => <Button onClick={creatingHandler} size={BUTTON_SIZE.M}>Save</Button>
                }
            </Header>
        )}>
            <div className={styles.container}>
                <div className={styles.editor}>
                    <Input onChange={titleHandler} className={styles.input} type={'text'}/>
                    <Input onChange={contentHandler} className={styles.textarea} type={'text'} isMultiline={true}/>
                </div>
            </div>
        </Layout>
    );
}