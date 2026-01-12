import React, { useEffect } from 'react';
import { IoIosMail } from 'react-icons/io';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IoArrowForwardOutline } from 'react-icons/io5';

const Stay = () => {


     useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        AOS.refresh();
    }, []);

    return (
        <>
            <div className='py-[55px] md:py-[70px] lg:py-[95px]'>
                <div className='container'>
                    <div data-aos="fade-up" className='py-3 px-5 bg-[#E7F8F2] rounded-lg w-fit mx-auto'>
                        <IoIosMail className='text-[40px] text-[#219E64]'/>
                    </div>
                    <h2 data-aos="fade-up" className='text-center text-[30px] lg:text-[40px] font-bold pt-3.5 text-[#141414] dark:text-white'>Stay Updated on City Improvements</h2>
                    <p data-aos="fade-up" className='text-[16px] md:text-[18px] font-medium text-[#6D7873] text-center'>Subscribe for weekly updates on fixes, community wins, and new features.</p>
                    <form data-aos="fade-up" className='flex flex-col sm:flex-row sm:items-center pt-6 lg:pt-8 justify-center gap-3'>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className='py-2.5 px-8 text-[16px] font-medium bg-[#F8F8F8] border border-[#219E64] dark:bg-gray-900 rounded-sm outline-none' required
                        />
                        <button className='flex items-center gap-1.5 py-2.5 px-8 text-[16px] font-medium justify-center bg-linear-to-r from-[#10B77F] to-[#35E2A4] text-white rounded-sm'><span>Subscribe</span><IoArrowForwardOutline /></button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Stay;