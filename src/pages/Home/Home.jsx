import React from 'react';
import Banner from './HomeComponents/Banner';
import RecentlResolved from './HomeComponents/RecentlResolved';
import Powerful from './HomeComponents/Powerful';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <RecentlResolved></RecentlResolved>
            <Powerful></Powerful>
        </>
    );
};

export default Home;