import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../../pages/Shared/Nav';
import Footer from '../../pages/Shared/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const Root = () => {
    return (
        <>
            <ScrollToTop></ScrollToTop>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default Root;