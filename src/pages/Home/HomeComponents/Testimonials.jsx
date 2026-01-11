import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from 'react-icons/fa6';
import { TbQuote } from "react-icons/tb";

const Testimonials = () => {
    const testimonials = [
        {
            quote: "I reported a dangerous pothole on my street and it was fixed within 3 days! The tracking feature kept me informed throughout the process. Amazing civic tool!",
            name: "Sarah Mitchell",
            title: "Resident, Downtown District",
            image: "https://i.ibb.co.com/849z5S40/profile.png"
        },
        {
            quote: "The broken street light outside my shop was affecting customer safety. CityFix made it so easy to report, and the city responded quickly. Great platform!",
            name: "James Rodriguez",
            title: "Small Business Owner",
            image: "https://i.ibb.co.com/cKzTBPkP/profile5.png"
        },
        {
            quote: "Finally, a platform that gives citizens a real voice! I've reported multiple issues in our neighborhood and seen real improvements. Transparency at its best.",
            name: "Emily Chen",
            title: "Community Activist",
            image: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
        },
        {
            quote: "CityFix transformed the way we interact with our local government. Reporting issues is now quick, easy, and effective. Highly recommend to all citizens!",
            name: "Michael Thompson",
            title: "Neighborhood Coordinator",
            image: "https://cdn-icons-png.flaticon.com/512/4715/4715330.png"
        }
    ];

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        AOS.refresh();
    }, []);

    return (
        <div className='py-[55px] md:py-[70px] lg:py-[95px] bg-[#FBFCFB] dark:bg-gray-900'>
            <div className='container'>
                <h2 data-aos="fade-up" className='text-center text-[30px] sm:text-[40px] lg:text-[50px] font-bold'>
                    What Citizens Are Saying
                </h2>
                <p data-aos="fade-up" className='text-[16px] md:text-[18px] font-medium text-[#6D7873] text-center'>
                    Real stories from real people who are making a difference in their communities through CityFix.
                </p>

                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index} className='py-3'>
                            <div data-aos="fade-up" className='mt-10 bg-white dark:bg-[#1D232A] py-7 px-5 rounded-lg shadow'>
                                <div className='flex justify-between items-center pb-1.5'>
                                    <div className='flex items-center gap-0.5 text-[#F59F0A] text-[20px]'>
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                    </div>
                                    <div className='text-[#34E0A2] text-[35px]'>
                                        <TbQuote />
                                    </div>
                                </div>
                                <p className='text-sm'>{item.quote}</p>
                                <div className='pt-4 flex items-center gap-2.5'>
                                    <img src={item.image} alt="" className='h-11 w-11 rounded-full object-cover'/>
                                    <div>
                                        <h4 className='font-semibold'>{item.name}</h4>
                                        <h4 className='text-sm'>{item.title}</h4>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;
