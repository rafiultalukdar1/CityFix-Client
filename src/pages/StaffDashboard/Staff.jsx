import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaEye, FaFileLines } from 'react-icons/fa6';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { GiProgression } from 'react-icons/gi';
import { FaCheckCircle } from 'react-icons/fa';
import { IoCalendarClear } from 'react-icons/io5';
import { Link } from 'react-router';
import { PuffLoader } from 'react-spinners';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Staff = () => {

    const axiosSecure = useAxiosSecure();

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ['assigned-issues'],
        queryFn: async () => {
            const res = await axiosSecure.get('/assigned-issues')
            return res.data
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <PuffLoader color="#219E64" size={60} />
            </div>
        );
    };

    const progressCount = issues.filter(issue => issue.status === 'in-progress').length;
    const resolvedCount = issues.filter(issue => issue.status === 'resolved').length;
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const todaysTasksCount = issues.filter(issue => {
        const createdAt = new Date(issue.createdAt);
        const updatedAt = new Date(issue.updatedAt || issue.createdAt);
        return createdAt >= yesterday || updatedAt >= yesterday;
    }).length;

    // Chart
    const pendingCount = issues.filter(issue => issue.status === 'pending').length;
    const pieData = [
        { name: 'Pending', value: pendingCount },
        { name: 'In Progress', value: progressCount },
        { name: 'Resolved', value: resolvedCount }
    ];





    return (
        <>
           <title>CityFix - Dashboard Overview</title>
           <div className="px-3 py-12 max-w-[1500px] mx-auto">
                <h2 className="text-[30px] md:text-[34px] lg:text-[40px] font-bold">Staff Dashboard</h2>
                <p className='text-[#6D7873] dark:text-[#E7F8F2] text-[16px]'>Overview of your assigned tasks and progress.</p>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 items-start mt-7 lg:mt-12 '>
                    <div className="bg-[#FBFCFB] dark:bg-gray-900 p-5 rounded-lg shadow-sm">
                        <h3 className="text-[22px] font-bold mb-4">Issue Status Overview</h3>
                        <div className="w-full h-[250px]">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label >
                                        <Cell fill="#FDBA74" />
                                        <Cell fill="#60A5FA" />
                                        <Cell fill="#34D399" />
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='flex justify-between items-center bg-[#FBFCFB] dark:bg-gray-900 shadow-sm py-4 px-5 rounded-md lg:rounded-lg'>
                            <div>
                                <p className='text-[#6D7873] dark:text-[#E7F8F2] text-[16px]'>Assigned Issues</p>
                                <h3 className='text-[24px] md:text-[26px] lg:text-[30px] font-bold'>{issues.length}</h3>
                            </div>
                            <div className='bg-[#E7F8F2] text-[#10B77F] p-3 rounded-md text-[20px] md:text-[22px]'>
                                <FaFileLines />
                            </div>
                        </div>
                        <div className='flex justify-between items-center bg-[#FBFCFB] dark:bg-gray-900 shadow-sm py-4 px-5 rounded-md lg:rounded-lg'>
                            <div>
                                <p className='text-[#6D7873] dark:text-[#E7F8F2] text-[16px]'>In Progress</p>
                                <h3 className='text-[24px] md:text-[26px] lg:text-[30px] font-bold'>{progressCount}</h3>
                            </div>
                            <div className='bg-[#E7F8F2] text-[#10B77F] p-3 rounded-md text-[20px] md:text-[22px]'>
                                <GiProgression />
                            </div>
                        </div>
                        <div className='flex justify-between items-center bg-[#FBFCFB] dark:bg-gray-900 shadow-sm py-4 px-5 rounded-md lg:rounded-lg'>
                            <div>
                                <p className='text-[#6D7873] dark:text-[#E7F8F2] text-[16px]'>Resolved</p>
                                <h3 className='text-[24px] md:text-[26px] lg:text-[30px] font-bold'>{resolvedCount}</h3>
                            </div>
                            <div className='bg-[#E7F8F2] text-[#10B77F] p-3 rounded-md text-[20px] md:text-[22px]'>
                                <FaCheckCircle />
                            </div>
                        </div>
                        <div className='flex justify-between items-center bg-[#FBFCFB] dark:bg-gray-900 shadow-sm py-4 px-5 rounded-md lg:rounded-lg'>
                            <div>
                                <p className='text-[#6D7873] dark:text-[#E7F8F2] text-[16px]'>Today's Tasks</p>
                                <h3 className='text-[24px] md:text-[26px] lg:text-[30px] font-bold'>{todaysTasksCount}</h3>
                            </div>
                            <div className='bg-[#E7F8F2] text-[#10B77F] p-3 rounded-md text-[20px] md:text-[22px]'>
                                <IoCalendarClear />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='py-3.5 lg:py-5 px-5 rounded-md lg:rounded-lg mt-5 lg:mt-10'>
                    <div className='flex flex-col md:flex-row justify-between md:items-center gap-2.5 md:gap-5'>
                        <h2 className='text-[24px] md:text-[26px] lg:text-[30px] font-bold'>Recent Assignments</h2>
                        <Link to='/dashboard/assigned-issues' className='flex items-center gap-2 px-[18px] py-2 text-[16px] font-medium bg-[#219E64] hover:bg-[#168652] text-white transition rounded justify-center'><FaEye /><span>View All</span></Link>
                    </div>
                    <div className="border border-[#219e64] rounded-xl overflow-x-scroll mt-5 md:mt-7">
                        <table className="w-full min-w-[1400px] text-sm">
                            <thead className="bg-gray-50 dark:bg-[#101828]">
                                <tr className="text-left">
                                    <th className="p-4">Issue</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {issues.map(issue => (
                                <tr key={issue._id} className="border-t border-[#219e64]">
                                    <td className="p-4 font-medium flex items-center gap-2">
                                        {issue.isBoosted && <span className="text-red-500">⚡</span>}
                                        {issue.title}
                                    </td>
                                    <td className="p-4 capitalize">{issue.category}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs capitalize
                                            ${issue.status === 'resolved' && 'bg-green-100 text-green-700'}
                                            ${issue.status === 'pending' && 'bg-orange-100 text-orange-700'}
                                            ${issue.status === 'in-progress' && 'bg-blue-100 text-blue-700'}
                                            ${issue.status === 'working' && 'bg-purple-100 text-purple-700'}
                                            ${issue.status === 'closed' && 'bg-gray-100 text-gray-600'}`}>
                                            {issue.status}
                                        </span>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
           </div>
        </>
    );
};

export default Staff;