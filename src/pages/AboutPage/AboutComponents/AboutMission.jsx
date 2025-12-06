import React from 'react';
import aboutImg from '../../../assets/images/about.jpg';

const AboutMission = () => {
    return (
        <>
            <div className='py-[55px] md:py-[70px] lg:py-[105px]'>
                <div className='container'>
                    <h2 className='leading-[1.2] text-[30px] sm:text-[40px] lg:text-[50px] font-bold text-center'>About <span className='bg-linear-to-r from-[#10B77F] to-[#35E2A4] bg-clip-text text-transparent'>CityFix</span></h2>
                    <p className='text-[16px] md:text-[18px] font-medium text-[#6D7873] text-center max-w-[620px] mx-auto pt-1.5'>CityFix is a citizen-focused platform connecting communities with efficient, transparent, and responsive municipal services.</p>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pt-7 lg:pt-11'>
                        <div className='order-2 lg:order-1'>
                            <h4 className='text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#141414] dark:text-white pb-2 lg:pb-4.5'>Our Mission</h4>
                            <div className='flex flex-col gap-2.5'>
                                <p className='text-[#6D7873] text-[16px] font-light'>Municipal services often suffer from delayed response times and lack of transparency. Citizens have traditionally had no centralized platform to report problems and track their resolution.</p>
                                <p className='text-[#6D7873] text-[16px] font-light'>CityFix was created to solve this problem. Our platform enables citizens to report real-world public issues such as broken streetlights, potholes, water leakage, garbage overflow, and damaged footpaths.</p>
                                <p className='text-[#6D7873] text-[16px] font-light'>Government staff and administrators can efficiently manage, verify, assign, and resolve reported issues, creating a transparent and accountable system that benefits everyone.</p>
                            </div>
                        </div>
                        <div className='order-1 lg:order-2'>
                            <img src={aboutImg} className='rounded-2xl' alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutMission;