import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { IoMdPricetags } from 'react-icons/io';
import { FaLocationDot } from 'react-icons/fa6';
import { BiLike } from 'react-icons/bi';

const RecentlResolved = () => {

    const axiosSecure = useAxiosSecure();

    const { data: issues = [] } = useQuery({
        queryKey: ['recentResolvedIssues'],
        queryFn: async () => {
            const res = await axiosSecure.get('/recent-resolved-issues');
            return res.data;
        }
    });




    return (
        <>
            <div className='py-[55px] md:py-[70px] lg:py-[95px] bg-[#FBFCFB] dark:bg-gray-900'>
                <div className='container'>
                    <h2 className='text-center text-[30px] sm:text-[40px] lg:text-[50px] font-bold'>Recently Resolved Issues</h2>
                    <p className='text-[16px] md:text-[18px] font-medium text-[#6D7873] text-center max-w-[620px] mx-auto'>See how we're making a difference in our community. These issues were recently resolved thanks to citizen reports and our dedicated team.</p>


                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-[35px] md:mt-[50px]'>
                        {issues.map(issue => (
                            <div key={issue._id} className='shadow-sm dark:shadow-md rounded-lg bg-white dark:bg-[#1D232A]'>
                                <img src={issue.images} alt="" className='h-[242px] w-full object-cover rounded-t-lg' />
                                <div className='pt-3 px-4 pb-4 flex flex-col gap-3'>
                                    <div className='flex items-center gap-2'>
                                        <span className={`inline-block py-0.5 px-3 rounded-full text-[13px] font-medium capitalize ${issue.status === 'resolved' ? 'bg-[#E7F8F2] text-[#10B77F]' : issue.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>{issue.status}</span>
                                        <span className={`inline-block py-0.5 px-3 rounded-full text-[13px] font-medium capitalize ${issue.isBoosted ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'}`}>{issue.isBoosted ? 'High' : 'Normal'}</span>                                    
                                    </div>
                                    <div>
                                        <h2 className='text-[20px] font-semibold'>{issue.title}</h2>
                                        <p className='text-[#6D7873] text-[15px] overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]'>{issue.description}</p>
                                    </div>
                                    <div className='flex flex-col gap-1 border-b border-[#219e64e1] pb-3.5'>
                                        <p className='flex items-center gap-1.5 text-[16px] font-medium'><IoMdPricetags className='text-[16px] text-[#10B77F]' /><span>{issue.category}</span></p>
                                        <p className='flex items-center gap-1.5 text-[16px] font-medium'><FaLocationDot className='text-[16px] text-[#10B77F]' /><span>{issue.location}</span></p>
                                    </div>

                                    <div>
                                        <button><BiLike /><span>{issue.upvotes}</span></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecentlResolved;