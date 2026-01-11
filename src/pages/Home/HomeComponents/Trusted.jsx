import React, { useEffect } from 'react';
import { FaShieldAlt, FaTools } from 'react-icons/fa';
import { FaBuilding, FaCity } from 'react-icons/fa6';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Trusted = () => {


    const steps = [
        {
            Icon: FaBuilding,
            title: "City Council",
        },
        {
            Icon: FaTools,
            title: "Public Works Dept.",
        },
        {
            Icon: FaCity,
            title: "Urban Planning",
        },
        {
            Icon: FaShieldAlt,
            title: "Safety Commission",
        },
    ];

    // AOS
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
        AOS.refresh();
    }, []);


    return (
        <>
            <div className='py-[55px] md:py-[70px] lg:py-[95px]'>
                <div className='container'>
                    <h2 data-aos="fade-up" className='text-center text-[20px] uppercase tracking-[3px] [word-spacing:5px]'>Trusted by Government Departments</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-7 lg:mt-12 text-center">
                        {steps.map((item, i) => (
                            <div data-aos="fade-up" key={i} className="flex items-center text-center gap-3 mx-auto">
                                <item.Icon className='text-[26px] text-[#219E64]' />
                                <h4 className='text-[20px] text-[#141414] dark:text-[#E9F7EF]'>{item.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Trusted;