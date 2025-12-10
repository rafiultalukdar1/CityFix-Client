import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { IoMdPricetags } from 'react-icons/io';
import { FaArrowRight, FaEye, FaLocationDot } from 'react-icons/fa6';
import { BiLike } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const RecentlResolved = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const navigate = useNavigate();

    const { data: issues = [], refetch } = useQuery({
        queryKey: ['recentResolvedIssues'],
        queryFn: async () => {
            const res = await axiosSecure.get('/recent-resolved-issues');
            return res.data;
        }
    });

    // upvoted 
    const handleUpvote = async (id) => {
        if (!user?.email) {
            return navigate('/login');
        }
        await axiosSecure.patch(`/issues/upvote/${id}`, {
            userEmail: user.email
        });
        refetch();
    };






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
                                        <h2 className='text-[20px] font-semibold leading-[1.3]'>{issue.title}</h2>
                                        <p className='text-[#6D7873] text-[15px] overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]'>{issue.description}</p>
                                    </div>
                                    <div className='flex flex-col gap-1 border-b border-[#219e64e1] pb-3.5 mb-1'>
                                        <p className='flex items-center gap-1.5 text-[16px] font-medium'><IoMdPricetags className='text-[16px] text-[#10B77F]' /><span>{issue.category}</span></p>
                                        <p className='flex items-center gap-1.5 text-[16px] font-medium'><FaLocationDot className='text-[16px] text-[#10B77F]' /><span>{issue.location}</span></p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        {/* <button onClick={() => handleUpvote(issue._id)} className='flex items-center gap-1.5 px-3.5 py-1 rounded-md border border-gray-300 text-[#141414] bg-gray-100 font-medium'><BiLike /><span>{issue.upvotes}</span></button> */}
                                        <button onClick={() => handleUpvote(issue._id)} className={`flex items-center gap-1.5 px-3.5 py-1 rounded-md border ${issue.upvotedUsers?.includes(user?.email) ? 'bg-[#219E64] text-white border-[#219E64]' : 'bg-gray-100 text-[#141414] border-gray-300'} font-medium transition`}><BiLike className={`${issue.upvotedUsers?.includes(user?.email) ? 'text-white' : 'text-[#141414]'}`} /><span>{issue.upvotes}</span></button>

                                        <Link to={`/issue-details/${issue._id}`} className='flex items-center gap-1.5 px-3.5 py-1.5 rounded-md font-medium bg-[#219E64] hover:bg-[#0c7e49] transition text-white'><FaEye /><span>View Details</span></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='text-center'>
                        <Link to='/all-issues' className='bg-linear-to-r from-[#05885c] to-[#1fbe84] text-white hover:bg-[linear-gradient(90deg,#1fbe84,#05885c)] transition-all duration-300 inline-flex items-center gap-1.5 py-2.5 px-8 text-[16px] font-medium mt-6 lg:mt-12 text-center justify-center rounded-sm'><span>View All Issues</span><FaArrowRight /></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecentlResolved;