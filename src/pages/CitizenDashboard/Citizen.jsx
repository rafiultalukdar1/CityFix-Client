import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { PuffLoader } from 'react-spinners';
import { FaFileLines } from 'react-icons/fa6';
import { IoTime } from 'react-icons/io5';
import { GiProgression } from 'react-icons/gi';
import { FaCheckCircle, FaPlusCircle } from 'react-icons/fa';
import { MdOutlinePayments } from 'react-icons/md';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router';
import { CgEye } from 'react-icons/cg';


const Citizen = () => {

    const axiosSecure = useAxiosSecure();

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ['my-issues'],
        queryFn: async () => {
            const res = await axiosSecure.get('/my-issues');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <PuffLoader color="#219E64" size={60} />
            </div>
        );
    };

    const pendingCount = issues.filter(issue => issue.status === 'pending').length;
    const progressCount = issues.filter(issue => issue.status === 'in-progress').length;
    const resolvedCount = issues.filter(issue => issue.status === 'resolved').length;

    const chartData = [
        { name: 'Pending', value: pendingCount },
        { name: 'In Progress', value: progressCount },
        { name: 'Resolved', value: resolvedCount }
    ];
    const barData = [
        { status: 'Pending', count: pendingCount },
        { status: 'In Progress', count: progressCount },
        { status: 'Resolved', count: resolvedCount }
    ];
    const COLORS = ['#FACC15', '#3B82F6', '#22C55E'];

    const recentIssues = [...issues].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,1);


    return (
        <>
            <title>CityFix - Dashboard</title>
            <div className='px-3 py-12 max-w-[1500px] mx-auto'>
                <div className='flex flex-col md:flex-row justify-between md:items-center gap-5'>
                    <div>
                        <h2 className='text-[30px] md:text-[34px] lg:text-[40px] font-bold'>Dashboard</h2>
                        <p className='text-[#6D7873] dark:text-[#E7F8F2] text-[16px]'>Welcome back! Here's your activity overview.</p>
                    </div>
                    <div>
                        <Link to='/dashboard/report-issue' className='flex items-center gap-2 px-[18px] py-2 text-[16px] font-medium bg-[#219E64] hover:bg-[#168652] text-white transition rounded'><FaPlusCircle /><span>Report Issue</span></Link>
                    </div>
                </div>

                <div className='mt-7 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5'>
                    <div className='flex justify-between items-center bg-[#FBFCFB] dark:bg-gray-900 shadow-sm py-3.5 px-4 rounded-md lg:rounded-lg'>
                        <div>
                            <p className='text-[#6D7873] dark:text-[#E7F8F2] text-[16px]'>Total Issues</p>
                            <h3 className='text-[24px] md:text-[26px] lg:text-[30px] font-bold'>{issues.length}</h3>
                        </div>
                        <div className='bg-[#E7F8F2] text-[#10B77F] p-3 rounded-md text-[20px] md:text-[22px]'>
                            <FaFileLines />
                        </div>
                    </div>
                    <div className='flex justify-between items-center bg-[#FBFCFB] dark:bg-gray-900 shadow-sm py-3.5 px-4 rounded-md lg:rounded-lg'>
                        <div>
                            <p className='text-[#6D7873] dark:text-[#E7F8F2] text-[16px]'>Pending</p>
                            <h3 className='text-[24px] md:text-[26px] lg:text-[30px] font-bold'>{pendingCount}</h3>
                        </div>
                        <div className='bg-[#E7F8F2] text-[#10B77F] p-3 rounded-md text-[20px] md:text-[22px]'>
                            <IoTime />
                        </div>
                    </div>
                    <div className='flex justify-between items-center bg-[#FBFCFB] dark:bg-gray-900 shadow-sm py-3.5 px-4 rounded-md lg:rounded-lg'>
                        <div>
                            <p className='text-[#6D7873] dark:text-[#E7F8F2] text-[16px]'>In Progress</p>
                            <h3 className='text-[24px] md:text-[26px] lg:text-[30px] font-bold'>{progressCount}</h3>
                        </div>
                        <div className='bg-[#E7F8F2] text-[#10B77F] p-3 rounded-md text-[20px] md:text-[22px]'>
                            <GiProgression />
                        </div>
                    </div>
                    <div className='flex justify-between items-center bg-[#FBFCFB] dark:bg-gray-900 shadow-sm py-3.5 px-4 rounded-md lg:rounded-lg'>
                        <div>
                            <p className='text-[#6D7873] dark:text-[#E7F8F2] text-[16px]'>Resolved</p>
                            <h3 className='text-[24px] md:text-[26px] lg:text-[30px] font-bold'>{resolvedCount}</h3>
                        </div>
                        <div className='bg-[#E7F8F2] text-[#10B77F] p-3 rounded-md text-[20px] md:text-[22px]'>
                            <FaCheckCircle />
                        </div>
                    </div>
                    <div className='flex justify-between items-center bg-[#FBFCFB] dark:bg-gray-900 shadow-sm py-3.5 px-4 rounded-md lg:rounded-lg'>
                        <div>
                            <p className='text-[#6D7873] dark:text-[#E7F8F2] text-[16px]'>Total Payments</p>
                            <h3 className='text-[24px] md:text-[26px] lg:text-[30px] font-bold'>Payments</h3>
                        </div>
                        <div className='bg-[#E7F8F2] text-[#10B77F] p-3 rounded-md text-[20px] md:text-[22px]'>
                            <MdOutlinePayments />
                        </div>
                    </div>
                </div>

                <div className='mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <div className='bg-[#FBFCFB] dark:bg-gray-900 shadow-sm rounded-lg p-6'>
                        <h3 className='text-[22px] font-semibold mb-4'>Issue Status Distribution</h3>
                        <div className='h-80'>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={chartData} cx="50%" cy="50%" outerRadius={110} dataKey="value" label >
                                        {chartData.map((_, index) => (
                                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className='bg-[#FBFCFB] dark:bg-gray-900 shadow-sm rounded-lg p-6'>
                        <h3 className='text-[22px] font-semibold mb-4'>Issues by Status</h3>
                        <div className='h-80'>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData}>
                                    <XAxis dataKey="status" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" fill="#219E64" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="mt-12 bg-[#FBFCFB] dark:bg-gray-900 shadow-sm rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-[22px] font-semibold">Recent Issues</h3>
                        <Link to="/dashboard/my-issues" className="flex items-center gap-2 px-[18px] py-2 text-[16px] font-medium bg-[#219E64] hover:bg-[#168652] text-white transition rounded"><CgEye></CgEye><span>View All</span></Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[950px] text-left">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Title</th>
                                    <th className="px-4 py-2">Category</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Date</th>
                                </tr>
                            </thead>
                            <tbody> 
                                {recentIssues.map(issue => ( <tr key={issue._id} className="border-t border-[#219e64]">
                                    <td className="px-4 py-2">{issue.title}</td>
                                    <td className="px-4 py-2">{issue.category}</td>
                                    <td className="px-4 py-2 capitalize">{issue.status}</td>
                                    <td className="px-4 py-2">{new Date(issue.createdAt).toLocaleDateString()}</td>
                                </tr> ))} 
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Citizen;