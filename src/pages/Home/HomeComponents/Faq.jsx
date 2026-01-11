import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa6';

const Faq = () => {


    const faqs = [
        {
            question: "How do I report an issue?",
            answer:
            "Simply click the 'Report Issue' button, select the issue category, drop a pin on the map or use your current location, add photos and a description, then submit. You'll receive a tracking number instantly.",
        },
        {
            question: "How long does it take for issues to be resolved?",
            answer:
            "Resolution time depends on the type and priority of the issue. Most reports are addressed within a few working days.",
        },
        {
            question: "Can I report issues anonymously?",
            answer:
            "Yes, you can submit reports anonymously. However, creating an account helps you track progress and receive updates.",
        },
        {
            question: "How do I track the status of my report?",
            answer:
            "You can track your report status from your dashboard using the tracking number you receive after submitting an issue.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(0);

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
            <div className='py-[55px] md:py-[70px] lg:py-[95px] bg-[#FBFCFB] dark:bg-gray-900'>
                <div className='container'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-7'>
                        <div>
                            <h2 data-aos="fade-up" className='leading-[1.2] text-[30px] sm:text-[40px] lg:text-[45px] font-bold'>Frequently Asked <span className='bg-linear-to-r from-[#10B77F] to-[#35E2A4] bg-clip-text text-transparent'>Questions</span></h2>
                            <p data-aos="fade-up" className='text-[20px] font-medium text-[#627084] mt-2 lg:mt-5'>Have questions about using CityFix? Find answers to the most common questions below. Can't find what you're looking for? Contact our support team.</p>
                            <div className='mt-5 bg-[#F3FCFA] py-3 px-5 border border-[#22581aa4] rounded-lg'>
                                <h4 className='font-medium text-[#141414] dark:text-white text-[18px]'>Still have questions?</h4>
                                <p className='text-sm py-2'>Our support team is here to help you with any inquiries.</p>
                                <button className='flex items-center gap-2 text-[#16BC84]'><span>Contact Support</span><FaArrowRight /></button>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            {faqs.map((item, i) => (
                                <div
                                    key={i}
                                    className="rounded-lg bg-white dark:bg-[#1D232A] shadow overflow-hidden"
                                >
                                    <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex justify-between items-center px-5 pt-4 pb-2 text-left"
                                    >
                                    <span className="font-medium text-[#141414] dark:text-white">
                                        {item.question}
                                    </span>
                                    <FaChevronDown
                                        className={`transition-transform duration-300 ${
                                        openIndex === i ? "rotate-180" : ""
                                        }`}
                                    />
                                    </button>

                                    <div
                                        className={`grid transition-all duration-500 ease-in-out ${
                                            openIndex === i
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                        }`}
                                        >
                                        <div className="overflow-hidden px-5 pb-5 text-gray-600">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Faq;