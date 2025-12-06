import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCamera, FaSpinner, FaUserCheck } from 'react-icons/fa6';

const HowItWorks = () => {

    const steps = [
        {
            Icon: FaCamera,
            title: "Report an Issue",
            description: "Take a photo, add location and description of the problem.",
        },
        {
            Icon: FaUserCheck,
            title: "Admin Reviews",
            description: "City staff reviews and assigns the issue to relevant department.",
        },
        {
            Icon: FaSpinner,
            title: "Track Progress",
            description: "Monitor real-time updates as the issue gets resolved.",
        },
        {
            Icon: FaCheckCircle,
            title: "Issue Resolved",
            description: "Get notified when the issue is fixed and closed.",
        },
    ];
    
    return (
        <>
            <div className='py-[55px] md:py-[70px] lg:py-[95px] bg-[#FBFCFB] dark:bg-gray-900'>
                <div className='container'>
                    <h2 className='text-center text-[30px] sm:text-[40px] lg:text-[50px] font-bold'>How It Works</h2>
                    <p className='text-[16px] md:text-[18px] font-medium text-[#6D7873] text-center'>Reporting an issue is simple. Follow these four easy steps to help improve your city.</p>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 lg:mt-12 text-center'>
                        {steps.map((step, index) => {
                            const Icon = step.Icon;
                            return (
                                <div key={index} className=''>
                                    <div className='text-5xl text-[#219E64] mb-4'>
                                        <Icon className='mx-auto'/>
                                    </div>
                                    <h3 className='text-xl font-semibold mb-2'>{step.title}</h3>
                                    <p className='text-gray-600 dark:text-gray-300 max-w-[280px] mx-auto'>{step.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HowItWorks;