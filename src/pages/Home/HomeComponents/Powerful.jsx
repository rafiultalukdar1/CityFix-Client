import React from 'react';
import { FaFileAlt, FaSearch, FaBell, FaChartBar, FaBolt, FaAward } from 'react-icons/fa';

const Powerful = () => {

    const stats = [
        { icon: <FaFileAlt className="text-[#0DA2E7] w-4.5 h-4.5" />, title: 'Easy Reporting', description: 'Submit issues in seconds with photos and location details.' },
        { icon: <FaSearch className="text-[#0DA2E7] w-4.5 h-4.5" />, title: 'Real-time Tracking', description: 'Track your reported issues from submission to resolution.' },
        { icon: <FaBell className="text-[#0DA2E7] w-4.5 h-4.5" />, title: 'Instant Updates', description: 'Get notified when your issue status changes.' },
        { icon: <FaChartBar className="text-[#0DA2E7] w-4.5 h-4.5" />, title: 'Analytics Dashboard', description: 'View detailed statistics and reports on city issues.' },
        { icon: <FaBolt className="text-[#0DA2E7] w-4.5 h-4.5" />, title: 'Priority Boost', description: 'Boost your issue priority for faster resolution.' },
        { icon: <FaAward className="text-[#0DA2E7] w-4.5 h-4.5" />, title: 'Premium Support', description: 'Get unlimited reports and priority support with premium.' },
    ];

    return (
        <>
            <div className='py-[55px] md:py-[70px] lg:py-[105px]'>
                <div className='container'>
                    <h2 className='text-center text-[30px] sm:text-[40px] lg:text-[50px] font-bold'>Powerful Features</h2>
                    <p className='text-[16px] md:text-[18px] font-medium text-[#6D7873] text-center'>Everything you need to report and track infrastructure issues efficiently.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 lg:mt-10">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white dark:bg-[#1D232A] shadow-sm border border-gray-200 rounded-2xl py-7 px-6 hover:shadow-lg transition">
                                <div className="inline-block bg-[#E6F6FD] rounded-lg p-3">
                                    {stat.icon}
                                </div>
                                <div>
                                    <h3 className="text-md font-semibold text-[#141414] dark:text-white mt-2">{stat.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Powerful;