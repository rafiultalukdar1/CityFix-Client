import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaLocationDot } from 'react-icons/fa6';
import { BiLike } from 'react-icons/bi';
import { IoMdPricetags } from 'react-icons/io';

const AllIssuesPage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const limit = 9;

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['allIssues', page, search, statusFilter, priorityFilter, categoryFilter],
        queryFn: async () => {
            const params = new URLSearchParams({
                page,
                limit,
                search,
                status: statusFilter,
                priority: priorityFilter,
                category: categoryFilter
            });
            const res = await axiosSecure.get(`/issues?${params.toString()}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const issues = data?.issues || [];
    const totalPages = data?.totalPages || 1;

    const handleUpvote = async (id) => {
        if (!user?.email) {
            return navigate('/login');
        }
        await axiosSecure.patch(`/issues/upvote/${id}`, { userEmail: user.email });
        refetch();
    };
    const handlePrev = () => {
        if (page > 1) setPage(prev => prev - 1);
    };
    const handleNext = () => {
        if (page < totalPages) setPage(prev => prev + 1);
    };
    // handle filter/search change
    const handleSearchChange = e => {
        setSearch(e.target.value);
        setPage(1);
    };
    const handleFilterChange = (setter) => e => {
        setter(e.target.value);
        setPage(1);
    };


    return (
        <div className='py-[55px] md:py-[70px] lg:py-[105px]'>
            <div className='container mx-auto'>
                <h2 className='text-center text-[30px] sm:text-[40px] lg:text-[50px] font-bold'>
                    All Reported <span className='bg-linear-to-r from-[#10B77F] to-[#35E2A4] bg-clip-text text-transparent'>Issues</span>
                </h2>
                <p className='text-center text-[16px] md:text-[18px] font-medium text-[#6D7873] max-w-[620px] mx-auto pt-1.5'>
                    Browse and upvote issues reported by citizens in your community.
                </p>

                {/* Search & Filters */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 mt-6 lg:mt-12'>
                    <div>
                        <input type="text" placeholder="Search by title, category, location..." value={search} onChange={handleSearchChange} className='form-input'/>
                    </div>

                    <div className='flex flex-col sm:flex-row items-center justify-between gap-3'>
                        <select value={statusFilter} onChange={handleFilterChange(setStatusFilter)} className='form-input'>
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In-Progress</option>
                            <option value="resolved">Resolved</option>
                        </select>
                        <select value={priorityFilter} onChange={handleFilterChange(setPriorityFilter)} className='form-input'>
                            <option value="">All Priority</option>
                            <option value="high">High</option>
                            <option value="normal">Normal</option>
                        </select>
                        <select value={categoryFilter} onChange={handleFilterChange(setCategoryFilter)} className='form-input'>
                            <option value="">All Categories</option>
                            <option value="electricity">Electricity</option>
                            <option value="bridge">Bridge</option>
                            <option value="waste">Waste</option>
                            <option value="footpath">Footpath</option>
                            <option value="public park">Public Park</option>
                            <option value="natural">Natural</option>
                            <option value="obstruction">Obstruction</option>
                            <option value="drainage">Drainage</option>
                            <option value="water leakage">Water Leakage</option>
                            <option value="pothole">Pothole</option>
                            <option value="streetlight">Streetlight</option>
                            <option value="road">Road</option>
                            <option value="traffic sign">Traffic Sign</option>
                            <option value="garbage">Garbage</option>
                        </select>
                    </div>
                </div>

                {/* Issues Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-[35px] md:mt-[50px]'>
                    {isLoading ? (
                        <div className='w-full text-center col-span-12 py-10 lg:py-20'><span className="loading loading-bars loading-xl"></span></div>
                    ) : (
                        issues.map(issue => (
                            <div key={issue._id} className='shadow-sm dark:shadow-md rounded-lg bg-white dark:bg-[#1D232A] flex flex-col justify-between'>
                                <div>
                                    <img src={issue.images} alt="" className='h-[242px] w-full object-cover rounded-t-lg' />
                                    <div className='pt-3 px-4 flex flex-col gap-3'>
                                        <div className='flex items-center gap-2'>
                                            <span className={`inline-block py-0.5 px-3 rounded-full text-[13px] font-medium capitalize ${issue.status === 'resolved' ? 'bg-[#E7F8F2] text-[#10B77F]' : issue.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>{issue.status}</span>
                                            <span className={`inline-block py-0.5 px-3 rounded-full text-[13px] font-medium capitalize ${issue.isBoosted ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'}`}>{issue.isBoosted ? 'High' : 'Normal'}</span>                                    
                                        </div>
                                        <div>
                                            <h2 className='text-[20px] font-semibold leading-[1.3]'>{issue.title}</h2>
                                            <p className='text-[#6D7873] text-[15px] overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]'>{issue.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='pt-3 px-4 pb-4'>
                                    <div className='flex flex-col gap-1 border-b border-[#219e64e1] pb-3.5 mb-3.5'>
                                        <p className='flex items-center gap-1.5 text-[16px] font-medium'><IoMdPricetags className='text-[16px] text-[#10B77F]' /><span>{issue.category}</span></p>
                                        <p className='flex items-center gap-1.5 text-[16px] font-medium'><FaLocationDot className='text-[16px] text-[#10B77F]' /><span>{issue.location}</span></p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <button onClick={() => handleUpvote(issue._id)} className={`flex items-center gap-1.5 px-3.5 py-1 rounded-md border ${issue.upvotedUsers?.includes(user?.email) ? 'bg-[#219E64] text-white border-[#219E64]' : 'bg-gray-100 text-[#141414] border-gray-300'} font-medium transition`}>
                                            <BiLike className={`${issue.upvotedUsers?.includes(user?.email) ? 'text-white' : 'text-[#141414]'}`} />
                                            <span>{issue.upvotes}</span>
                                        </button>
                                        <Link to={`/issue-details/${issue._id}`} className='flex items-center gap-1.5 px-3.5 py-1.5 rounded-md font-medium bg-[#219E64] hover:bg-[#0c7e49] transition text-white'>
                                            <FaEye /><span>View Details</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className='flex justify-center items-center gap-3 mt-7 lg:mt-12'>
                    <button onClick={handlePrev} disabled={page === 1} className='px-4 py-2 bg-[#219E64] rounded disabled:bg-gray-100 disabled:border-gray-300 disabled:border text-white disabled:text-[#141414]'>Previous</button>
                    <span className='font-medium'>Page {page} of {totalPages}</span>
                    <button onClick={handleNext} disabled={page === totalPages} className='px-4 py-2 bg-[#219E64] rounded disabled:bg-gray-100 disabled:border-gray-300 disabled:border text-white disabled:text-[#141414]'>Next</button>
                </div>
            </div>
        </div>
    );
};

export default AllIssuesPage;