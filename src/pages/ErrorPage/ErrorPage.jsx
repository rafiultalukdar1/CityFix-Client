import React from 'react';
import { NavLink } from 'react-router';
import errorImg from '../../assets/images/error-page.png'

const ErrorPage = () => {
    return (
        <>
            <title>CityFix - Error</title>
            <div className='py-[50px] md:py-20'>
                <div className='container text-center'>
                    <img className='mx-auto' src={errorImg} alt="" />
                    <h2 className='text-[#001931] text-center text-[32px] md:text-[40px] lg:text-[48px] font-bold'>PAGE NOT FOUND!!</h2>
                    <NavLink to='/'><button className='rounded bg-[linear-gradient(125deg,#632EE3_5.68%,#9F62F2_88.38%)] py-3 px-[38px] text-[#FFF] text-[16px] font-semibold mt-4'>Back to Home!</button></NavLink>
                </div>
           </div>
        </>
    );
};

export default ErrorPage;