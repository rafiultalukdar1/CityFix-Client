import React from 'react';
import { FaAward } from 'react-icons/fa6';
import { IoArrowForwardOutline } from 'react-icons/io5';
import bannerImg from '../../../assets/images/banner.jpg';

const Banner = () => {

    const stats = [
        { value: '10,000+', label: 'Issues Reported' },
        { value: '8,500+', label: 'Issues Resolved' },
        { value: '50,000+', label: 'Active Citizens' },
        { value: '48h', label: 'Avg Response Time' },
    ];


    return (
        <>
            <div className='py-[55px] md:py-[70px] lg:py-[105px]'>
                <div className='container'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
                        <div className='order-2 lg:order-1'>
                            <p className='inline-flex items-center gap-1.5 py-1.5 px-4 bg-[#E7F8F2] text-[12px] sm:text-[14px] text-[#10B77F] font-medium rounded-full'><FaAward /><span>Trusted by 50,000+ citizens</span></p>
                            <h2 className='font-extrabold leading-[1.2] py-4 lg:py-6 sm:py-5 text-[32px] sm:text-[38px] md:text-[46px] lg:text-[56px]'>Report City Issues, <span className='bg-linear-to-r from-[#10B77F] to-[#35E2A4] bg-clip-text text-transparent'>Build<br className='hidden sm:block' /> Better</span> Communities</h2>
                            <p className='max-w-[520px] text-[16px] md:text-[18px] font-medium text-[#6D7873]'>CityFix connects citizens with municipal services. Report potholes, broken streetlights, and other infrastructure issues easily. Track progress in real-time.</p>
                            <div className='flex flex-col sm:flex-row sm:items-center pt-6 pb-7 gap-3 border-b border-[#219E64]'>
                                <button className='flex items-center gap-1.5 py-2.5 px-8 text-[16px] font-medium justify-center bg-linear-to-r from-[#10B77F] to-[#35E2A4] text-white rounded-sm'><span>Report Issue</span><IoArrowForwardOutline /></button>
                                <button className='py-2.5 px-8 text-[16px] font-medium bg-[#F8F8F8] border border-[#219E64] dark:bg-gray-900 rounded-sm'>View All Issues</button>
                            </div>

                            <div className='grid grid-cols-2 md:grid-cols-4 gap-3.5 text-center mt-6'>
                                {
                                    stats.map((item, i) => (
                                    <div key={i}>
                                        <h2 className="text-3xl font-bold bg-linear-to-r from-[#10B77F] to-[#35E2A4] bg-clip-text text-transparent">{item.value}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.label}</p>
                                    </div>))
                                }
                            </div>
                        </div>

                        <div className='order-1 lg:order-2'>
                            <img src={bannerImg} className='rounded-2xl' alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;