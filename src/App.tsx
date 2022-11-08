import React from 'react';
import {Layout} from './components/Layout/Layout';
import {Header} from './components/Header/Header';
import {Footer} from './components/Footer/Footer';
import {Swiper} from './components/Swiper/Swiper';
import {Workspace} from './components/Workspace/Workspace';
import {Articles} from './components/Articles/Articles';
import {data} from './mock/mock';
import {ArticleStripe} from './components/ArticleStripe/ArticleStripe';

export const App: React.FC = () : React.ReactElement | null => {
    return (
        <Layout
            header={<Header/>}
            footer={<Footer/>}
        >
            <Swiper/>
            <Workspace>
                <Articles>
                    {
                        data.map(article => <ArticleStripe key={article.user.id} article={article}/>)
                    }
                </Articles>
            </Workspace>
        </Layout>
    );
};