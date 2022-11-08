import React from 'react';
import {Layout} from './components/Layout/Layout';
import {Header} from './components/Header/Header';
import {Footer} from './components/Footer/Footer';
import {Swiper} from './components/Swiper/Swiper';

export const App: React.FC = () : React.ReactElement | null => {
    return (
        <Layout
            header={<Header/>}
            footer={<Footer/>}
        >
            <Swiper/>
        </Layout>
    );
};