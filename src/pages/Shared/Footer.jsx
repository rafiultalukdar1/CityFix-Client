import React from 'react';
import { FaMountainCity } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaFacebookSquare, FaInstagram, FaPhoneVolume } from 'react-icons/fa';
import { IoLocation } from 'react-icons/io5';
import { BsTwitterX } from 'react-icons/bs';

const Footer = () => {
    return (
        <>
            <div className='bg-[#FBFCFB] dark:bg-gray-900 shadow-[0_-3px_6px_rgba(0,0,0,0.1)]'>
                <div className='container'>
                    <div className='py-[35px] grid grid-cols-12 gap-5 gap-y-[30px] border-b border-[#219E64]'>
                        <div className='col-span-12 sm:col-span-6 lg:col-span-4 max-w-[320px]'>
                            <button className='flex items-center gap-1.5 text-[20px] sm:text-[22px] font-bold text-[#219E64]'><FaMountainCity /><span>CityFix</span></button>
                            <p className='text-[18px] text-black pt-5 dark:text-[#E9F7EF]'>CityFix brings energy, elegance, and unforgettable moments to every celebration, making each event truly special and memorable.</p>
                        </div>

                        <div className='col-span-12 sm:col-span-6 lg:col-span-3'>
                            <h4 className='text-[21px] text-black dark:text-white font-semibold pb-[15px]'>Quick Links</h4>
                            <ul className='flex flex-col gap-3'>
                                <li className='text-[18px] text-[#141414] dark:text-[#E9F7EF] font-medium'>Services</li>
                                <li className='text-[18px] text-[#141414] dark:text-[#E9F7EF] font-medium'>Contact Us</li>
                                <li className='text-[18px] text-[#141414] dark:text-[#E9F7EF] font-medium'>Privacy Policy</li>
                            </ul>
                        </div>

                        <div className='col-span-12 sm:col-span-6 lg:col-span-3'>
                            <h4 className='text-[21px] text-black dark:text-white font-semibold pb-[15px]'>Contact Us</h4>
                            <ul className='flex flex-col gap-3'>
                                <li className='text-[18px] text-[#141414] dark:text-[#E9F7EF] font-medium flex items-center gap-[7px]'><IoIosMail /><span>info@cityfix.com</span></li>
                                <li className='text-[18px] text-[#141414] dark:text-[#E9F7EF] font-medium flex items-center gap-[7px]'><FaPhoneVolume /><span>+880 1XXX-XXXXXX</span></li>
                                <li className='text-[18px] text-[#141414] dark:text-[#E9F7EF] font-medium flex items-center gap-[7px]'><IoLocation /><span>Dhaka, Bangladesh</span></li>
                            </ul>
                        </div>

                        <div className='col-span-12 sm:col-span-6 lg:col-span-2'>
                            <h4 className='text-[21px] text-black dark:text-white font-semibold pb-[15px]'>Follow Us</h4>
                            <ul className='flex items-center gap-6'>
                                <li className='text-[#219E64] hover:text-[#069251] duration-300 cursor-pointer'><FaInstagram size={30} /></li>
                                <li className='text-[#219E64] hover:text-[#069251] duration-300 cursor-pointer'><FaFacebookSquare size={30} /></li>
                                <li className='text-[#219E64] hover:text-[#069251] duration-300 cursor-pointer'><BsTwitterX size={28} /></li>
                            </ul>
                        </div>
                    </div>
                    <div className='py-7 text-center'>
                        <p className='text-[#141414] text-[16px] dark:text-[#E9F7EF]'>© 2025 CityFix. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
