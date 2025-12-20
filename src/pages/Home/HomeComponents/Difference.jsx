import React, { useEffect } from 'react';
import { IoArrowForwardOutline } from 'react-icons/io5';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Difference = () => {

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
                    <h2 data-aos="fade-up" className='text-center text-[30px] sm:text-[40px] lg:text-[50px] font-bold'>Ready to Make a Difference?</h2>
                    <p data-aos="fade-up" className='text-[16px] md:text-[18px] font-medium text-[#6D7873] text-center max-w-[620px] mx-auto'>Join thousands of citizens who are actively improving their communities. Report an issue today and help build a better city for everyone.</p>

                    <div data-aos="fade-up" className='flex flex-col sm:flex-row sm:items-center pt-6 lg:pt-8 justify-center gap-3'>
                        <button className='flex items-center gap-1.5 py-2.5 px-8 text-[16px] font-medium justify-center bg-linear-to-r from-[#10B77F] to-[#35E2A4] text-white rounded-sm'><span>Get Started Free</span><IoArrowForwardOutline /></button>
                        <button className='py-2.5 px-8 text-[16px] font-medium bg-[#F8F8F8] border border-[#219E64] dark:bg-gray-900 rounded-sm'>Learn More</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Difference;