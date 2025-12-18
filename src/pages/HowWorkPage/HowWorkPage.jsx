import React from 'react';
import { FaUserPlus, FaCamera, FaUserCheck, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

const HowWorkPage = () => {

    const steps = [
        {
            Icon: FaUserPlus,
            title: "Create an Account",
            description: "Sign up for free to start reporting issues. Premium users get unlimited reports and priority support.",
            features: [
                "Quick registration with email",
                "Secure authentication",
                "Profile customization"
            ],
            note: "Premium upgrade available"
        },
        {
            Icon: FaCamera,
            title: "Report an Issue",
            description: "Take a photo, add the location, and describe the problem. It only takes a minute!",
            features: [
                "Upload photos of the issue",
                "Add precise location",
                "Choose issue category"
            ],
            note: "Provide detailed description"
        },
        {
            Icon: FaUserCheck,
            title: "Admin Review",
            description: "Our team reviews your report and assigns it to the appropriate department staff.",
            features: [
                "Quick review process",
                "Staff assignment",
                "Priority assessment"
            ],
            note: "Timeline tracking begins"
        },
        {
            Icon: FaSpinner,
            title: "Track Progress",
            description: "Monitor real-time updates as staff work on resolving your reported issue.",
            features: [
                "Real-time status updates",
                "Timeline of all actions",
                "Staff communication"
            ],
            note: "Estimated completion time"
        },
        {
            Icon: FaCheckCircle,
            title: "Issue Resolved",
            description: "Get notified when your issue is fixed. You can verify and close the report.",
            features: [
                "Resolution notification",
                "Before/after comparison",
                "Feedback submission",
                "Issue closure"
            ],
            note: null
        }
    ];

    return (
        <>
            <title>CityFix - How It Works</title>
            <div className='py-[55px] md:py-[70px] lg:py-[105px]'>
                <div className='container mx-auto'>
                    <h2 className='leading-[1.2] text-[30px] sm:text-[40px] lg:text-[50px] font-bold text-center'>
                        Reporting Made <span className='bg-linear-to-r from-[#10B77F] to-[#35E2A4] bg-clip-text text-transparent'>Simple</span>
                    </h2>
                    <p className='text-[16px] md:text-[18px] font-medium text-[#6D7873] text-center max-w-[620px] mx-auto pt-1.5'>
                        CityFix makes it easy to report infrastructure issues and track their resolution. Follow these simple steps to help improve your community.
                    </p>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-12'>
                        {steps.map((step, index) => {
                            const Icon = step.Icon;
                            return (
                                <div key={index} className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition'>
                                    <div className='text-[42px] text-[#219E64] mb-2.5'>
                                        <Icon />
                                    </div>
                                    <h3 className='text-xl font-semibold mb-2'>{step.title}</h3>
                                    <p className='text-gray-600 dark:text-gray-300 mb-2'>{step.description}</p>
                                    <ul className='text-gray-600 dark:text-gray-300 mb-2'>
                                        {step.features.map((feature, idx) => (
                                            <li className='flex items-center gap-1.5' key={idx}><IoCheckmarkCircleOutline className='text-[#219E64]' /> {feature}</li>
                                        ))}
                                    </ul>
                                    {step.note && <p className='text-sm font-medium text-[#219E64]'>{step.note}</p>}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HowWorkPage;
