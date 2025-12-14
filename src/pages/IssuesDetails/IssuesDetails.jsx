import React from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaArrowLeft, FaLocationDot, FaUser } from 'react-icons/fa6';
import { IoMdPricetags } from 'react-icons/io';
import useAuth from '../../hooks/useAuth';
import { BiLike } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';

const IssuesDetails = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: issue = {}, refetch } = useQuery({
        queryKey: ['issueDetails', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/${id}`);
            return res.data;
        }
    });

    const handleUpvote = async (id) => {
        if (!user?.email) {
            return navigate('/login');
        }
        await axiosSecure.patch(`/issues/upvote/${id}`, { userEmail: user.email });
        refetch();
    };

    return (
        <>
            <title>CityFix - Issues Details</title>
            <div className='py-[50px] md:py-[70px]'>
                <div className='container'>
                    <div className='max-w-[890px] mx-auto'>
                        <Link to='/all-issues' className='flex items-center gap-1.5 text-[16px] font-medium text-[#65758B] dark:text-white'><FaArrowLeft /><span>Back to All Issues</span></Link>
                        <img className='h-[310px] sm:h-[380px] md:h-[470px] w-full object-cover rounded-lg md:rounded-2xl mt-5 md:mt-[30px] shadow-sm dark:shadow-white' src={issue.images} alt="" />
                        <div className='p-3 sm:p-5 bg-white dark:bg-gray-900 border border-[#E1E7EF] dark:border-white rounded-lg md:rounded-2xl mt-5 lg:mt-7'>
                            <div className='flex items-center gap-3 mt-1 sm:mt-2'>
                                <span className={`inline-block py-1 px-5 rounded-full text-[15px] font-medium capitalize ${issue.status === 'resolved' ? 'bg-[#E7F8F2] text-[#10B77F]' : issue.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>{issue.status}</span>
                                <span className={`inline-block py-1 px-5 rounded-full text-[15px] font-medium capitalize ${issue.isBoosted ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'}`}>{issue.isBoosted ? 'High' : 'Normal'}</span>                                    
                            </div>
                            <h2 className='text-[#141414] dark:text-white text-[24px] sm:text-[28px] md:text-[32px] font-bold mt-3'>{issue.title}</h2>
                            <p className='text-[#65758B] dark:text-[#9fb8df] text-[15px] pt-3 pb-3'>{issue.description}</p>
                            <div className='flex flex-col md:flex-row justify-between md:items-center gap-3'>
                                <div className='flex flex-wrap gap-5 gap-y-1.5'>
                                    <p className='flex items-center gap-1.5 text-[16px] font-medium capitalize'><IoMdPricetags className='text-[16px] text-[#10B77F]' /><span>{issue.category}</span></p>
                                    <p className='flex items-center gap-1.5 text-[16px] font-medium'><FaLocationDot className='text-[16px] text-[#10B77F]' /><span>{issue.location}</span></p>
                                    <p className='flex items-center gap-1.5 text-[16px] font-medium'><FaUser className='text-[16px] text-[#10B77F]' /><span>{issue.organizer_name}</span></p>
                                </div>
                                <button onClick={() => handleUpvote(issue._id)} className={`inline-flex self-start items-center gap-1.5 px-3.5 py-1 rounded-md border ${issue.upvotedUsers?.includes(user?.email) ? 'bg-[#219E64] text-white border-[#219E64]' : 'bg-gray-100 text-[#141414] border-gray-300'} font-medium transition`}><BiLike className={`${issue.upvotedUsers?.includes(user?.email) ? 'text-white' : 'text-[#141414]'}`} /><span>{issue.upvotes}</span></button>
                            </div>
                        </div>
                        <div className='p-3 sm:p-5 bg-white dark:bg-gray-900 border border-[#E1E7EF] dark:border-white rounded-lg md:rounded-2xl mt-5 lg:mt-7'>
                            <h2 className='text-[24px] md:text-[28px] lg:text-[30px] font-bold'>Assigned Staff</h2>
                            <div className='mt-4 mb-3 flex items-center gap-3'>
                                <img src="https://i.ibb.co/rGTj1KFX/profile2.png" className='h-14 w-14 rounded-full object-cover' alt="" />
                                <div>
                                    <h3 className='text-[20px] font-semibold'>{issue.assignedStaff}</h3>
                                    <p className='text-[14px] font-medium'>Staff</p>
                                </div>
                            </div>
                            <p className='flex items-center gap-1.5 text-[16px] font-medium'><MdEmail className='text-[17px] text-[#10B77F]' /><span>{issue.assignedStaffEmail || 'staff@cityfix.com'}</span></p>
                        </div>

                        <div className='p-3 sm:p-5 bg-white dark:bg-gray-900 border border-[#E1E7EF] dark:border-white rounded-lg md:rounded-2xl mt-5 lg:mt-7'>
                            <h2 className='text-[24px] md:text-[28px] lg:text-[30px] font-bold mb-6'>Issue Timeline </h2>
                            <div className='relative border-l-2 border-[#10B77F] pl-6 space-y-6'>
                                {[...(issue.timeline || [])]
                                    .slice()
                                    .reverse()
                                    .map((item, index) => (
                                        <div key={index} className='relative'>
                                            <span className='absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-[#10B77F]'></span>
                                            <div className='bg-[#FBFCFB] dark:bg-gray-800 border border-[#E1E7EF] dark:border-gray-700 rounded-lg p-4'>
                                                <div className='flex flex-wrap items-center gap-3 mb-1'>
                                                    <span className={`px-3 py-0.5 rounded-full text-[14px] font-medium capitalize ${item.status === 'resolved' ? 'bg-[#E7F8F2] text-[#10B77F]' : item.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>{item.status}</span>
                                                    <span className='text-[14px] text-[#65758B] dark:text-gray-400'>{new Date(item.timestamp).toLocaleString()}</span>
                                                </div>
                                                <p className='text-[15px] font-medium text-[#141414] dark:text-white'>{item.message}</p>
                                                <p className='text-[14px] text-[#65758B] dark:text-gray-400 mt-1'>Updated by: {item.updatedBy?.name} ({item.updatedBy?.role})</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IssuesDetails;