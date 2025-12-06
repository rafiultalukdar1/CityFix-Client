import React from 'react';
import { FaEye, FaBolt, FaUsers, FaClipboardCheck } from "react-icons/fa";

const AboutValues = () => {

    const values = [
        {
            Icon: FaEye,
            title: "Transparency",
            description: "We believe in complete transparency. Every action on a reported issue is tracked and visible to citizens.",
        },
        {
            Icon: FaBolt,
            title: "Efficiency",
            description: "Our platform streamlines the reporting and resolution process, reducing bureaucratic delays.",
        },
        {
            Icon: FaUsers,
            title: "Community",
            description: "We empower citizens to take an active role in improving their neighborhoods and cities.",
        },
        {
            Icon: FaClipboardCheck,
            title: "Accountability",
            description: "Municipal staff are accountable for their assigned tasks with full tracking and reporting.",
        },
    ];

    return (
        <>
            <div className='pb-[55px] md:pb-[75px]'>
                <div className='container'>
                    <h2 className='text-center text-[30px] sm:text-[40px] lg:text-[50px] font-bold'>Our Core Values</h2>
                    <p className='text-[16px] md:text-[18px] font-medium text-[#6D7873] text-center'>These principles guide everything we do at CityFix.</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 lg:mt-10'>
                        {
                            values.map((value, index) => {
                                const Icon = value.Icon;
                                return (
                                    <div key={index} className='bg-white dark:bg-[#1D232A] shadow-sm border border-gray-200 rounded-2xl py-7 px-6 hover:shadow-lg transition'>
                                        <div className="inline-block bg-[#E9F7EF] rounded-lg p-3">
                                            <Icon className='text-[#219E64] w-4.5 h-4.5' />
                                        </div>
                                        <h3 className='text-md font-semibold text-[#141414] dark:text-white mt-2'>{value.title}</h3>
                                        <p className='text-sm text-gray-500 mt-1'>{value.description}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutValues;