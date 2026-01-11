import React from 'react';
import Banner from './HomeComponents/Banner';
import RecentlResolved from './HomeComponents/RecentlResolved';
import Powerful from './HomeComponents/Powerful';
import HowItWorks from './HomeComponents/HowItWorks';
import Difference from './HomeComponents/Difference';
import Testimonials from './HomeComponents/Testimonials';
import Trusted from './HomeComponents/Trusted';
import Faq from './HomeComponents/Faq';

const Home = () => {
    return (
        <>
            <title>CityFix - Home</title>
            <Banner></Banner>
            <RecentlResolved></RecentlResolved>
            <Powerful></Powerful>
            <HowItWorks></HowItWorks>
            <Difference></Difference>
            <Testimonials></Testimonials>
            <Trusted></Trusted>
            <Faq></Faq>
        </>
    );
};

export default Home;