import React from 'react';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaArrowLeft } from 'react-icons/fa6';

const IssuesDetails = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: issue = {} } = useQuery({
        queryKey: ['issueDetails', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/${id}`);
            return res.data;
        }
    });

    return (
        <>
            <div className='py-[50px] md:py-[70px]'>
                <div className='container'>
                    <div className='max-w-[890px] mx-auto'>
                        <Link to='/all-issues' className='flex items-center gap-1.5 text-[16px] font-medium text-[#65758B] dark:text-white'><FaArrowLeft /><span>Back to All Issues</span></Link>
                        <img className='h-[310px] sm:h-[380px] md:h-[470px] w-full object-cover rounded-lg md:rounded-2xl mt-5 md:mt-[30px] shadow-sm dark:shadow-white' src={issue.images} alt="" />
                        <div className='flex items-center gap-3 mt-5'>
                            <span className={`inline-block py-1 px-5 rounded-full text-[15px] font-medium capitalize ${issue.status === 'resolved' ? 'bg-[#E7F8F2] text-[#10B77F]' : issue.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>{issue.status}</span>
                            <span className={`inline-block py-1 px-5 rounded-full text-[15px] font-medium capitalize ${issue.isBoosted ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'}`}>{issue.isBoosted ? 'High' : 'Normal'}</span>                                    
                        </div>
                        <h2 className='text-[#141414] dark:text-white text-[24px] sm:text-[28px] md:text-[32px] font-bold mt-3'>{issue.title}</h2>
                        <p className='text-[#65758B] dark:text-[#9fb8df] text-[15px] pt-3 pb-5'>{issue.description}</p>

                    </div>
                </div>
            </div>
        </>
    );
};

export default IssuesDetails;