import React from 'react';
import Banner from './HomeComponents/Banner';
import RecentlResolved from './HomeComponents/RecentlResolved';
import Powerful from './HomeComponents/Powerful';
import HowItWorks from './HomeComponents/HowItWorks';
import Difference from './HomeComponents/Difference';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <RecentlResolved></RecentlResolved>
            <Powerful></Powerful>
            <HowItWorks></HowItWorks>
            <Difference></Difference>
        </>
    );
};

export default Home;