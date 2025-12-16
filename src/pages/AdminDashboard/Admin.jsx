import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { PuffLoader } from 'react-spinners';
import { FaCheckCircle, FaUsers, FaFileAlt, FaUsersCog } from 'react-icons/fa';
import { MdOutlineAccessTimeFilled, MdOutlinePayments } from 'react-icons/md';
import { GiProgression } from 'react-icons/gi';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { IoMdCloseCircle } from 'react-icons/io';

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all issues
    const { data: issuesData = [], isLoading: issuesLoading } = useQuery({
        queryKey: ['admin-issues'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-all-issues');
            return res.data;
        }
    });
    const issues = issuesData;

    // Fetch all users
    const { data: usersData = [], isLoading: usersLoading } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-all-users');
            return res.data;
        }
    });
    const users = Array.isArray(usersData) ? usersData : [usersData];

    if (issuesLoading || usersLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <PuffLoader color="#219E64" size={60} />
            </div>
        );
    }

    // Issue counts
    const resolvedCount = issues.filter(issue => issue.status === 'resolved').length;
    const pendingCount = issues.filter(issue => issue.status === 'pending').length;
    const inProgressCount = issues.filter(issue => issue.status === 'in-progress').length;
    const staffCount = (Array.isArray(usersData) ? usersData : []).filter(user => user.role === 'staff').length;


    // Stats cards
    const stats = [
        { label: 'Total Issues', value: issues.length, icon: FaFileAlt },
        { label: 'Pending', value: pendingCount, icon: MdOutlineAccessTimeFilled },
        { label: 'In-Progress', value: inProgressCount, icon: GiProgression },
        { label: 'Resolved', value: resolvedCount, icon: FaCheckCircle },
        { label: 'Rejected issue', value: '0', icon: IoMdCloseCircle },
        { label: 'Total Payments', value: '0', icon: MdOutlinePayments },
        { label: 'Total Users', value: users.length, icon: FaUsers },
        { label: 'Staff Members', value: staffCount, icon: FaUsersCog },
    ];

    // Pie chart data
    const pieData = [
        { name: 'Resolved', value: resolvedCount },
        { name: 'Pending', value: pendingCount },
        { name: 'In-Progress', value: inProgressCount },
    ];
    const COLORS = ['#10B77F', '#F59E0B', '#3B82F6'];

    // Recent issues (top 5)
    const latestIssues = issues.slice(0, 5);
    // Latest users (top 5)
    const latestUsers = users.slice(0, 5);

    return (
        <>
            <title>CityFix - Admin Dashboard</title>
            <div className="px-3 py-12 max-w-[1500px] mx-auto">
                <h2 className="text-[30px] md:text-[34px] lg:text-[40px] font-bold">Admin Dashboard</h2>
                <p className="text-[#6D7873] dark:text-[#E7F8F2] text-[16px] mb-5">
                    Overview of system performance and statistics.
                </p>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((item, i) => (
                        <div key={i} className="flex justify-between items-center bg-[#FBFCFB] dark:bg-gray-900 shadow-sm hover:shadow-md transition py-4 px-5 rounded-md lg:rounded-lg">
                            <div>
                                <p className="text-[#6D7873] dark:text-[#E7F8F2] text-[16px]">{item.label}</p>
                                <h3 className="text-[24px] md:text-[26px] lg:text-[30px] font-bold">{item.value}</h3>
                            </div>
                            <div className="bg-[#E7F8F2] text-[#10B77F] p-3 rounded-md text-[20px] md:text-[22px]">
                                <item.icon />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts & Latest Issues */}
                <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="bg-[#FBFCFB] dark:bg-gray-900 shadow-sm p-5 rounded-md">
                        <h3 className="font-bold text-[20px] mb-3">Issue Distribution</h3>
                        <PieChart width={320} height={300} className='mx-auto'>
                            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                    <div>
                        <h3 className="font-bold text-[20px] mb-3">Latest Issues</h3>
                        <div className="border border-[#219e64] rounded-xl overflow-x-scroll mt-3 md:mt-5 bg-[#FBFCFB] dark:bg-gray-900 shadow-sm">
                            <table className="w-full min-w-[700px] text-[15px]">
                                <thead className="bg-gray-50 dark:bg-[#101828]">
                                    <tr className="text-left">
                                        <th className="p-4 text-[#6D7873] dark:text-[#E7F8F2]">Issue</th>
                                        <th className="p-4 text-[#6D7873] dark:text-[#E7F8F2]">Status</th>
                                        <th className="p-4 text-[#6D7873] dark:text-[#E7F8F2]">Submitted By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {latestIssues.map(issue => (
                                        <tr key={issue._id} className="border-t border-[#219e64] hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                                            <td className="p-4 font-medium text-[#111827] dark:text-[#E7F8F2] flex items-center text-sm gap-2">
                                                {issue.isBoosted && <span className="text-red-500">⚡</span>}
                                                {issue.title}
                                            </td>
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
                                            <td className="p-4 text-[#6D7873] dark:text-[#A3A3A3]">{issue.submittedBy}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Latest Users */}
                <div className="mt-10 lg:mt-12">
                    <h3 className="font-bold text-[20px] mb-3">Latest Users</h3>
                    <div className="border border-[#219e64] rounded-xl overflow-x-scroll mt-3 md:mt-5 bg-[#FBFCFB] dark:bg-gray-900 shadow-sm">
                        <table className="w-full min-w-[800px] text-[16px]">
                            <thead className="bg-gray-50 dark:bg-[#101828]">
                                <tr className="text-left">
                                    <th className="p-4 text-[#6D7873] dark:text-[#E7F8F2]">Name</th>
                                    <th className="p-4 text-[#6D7873] dark:text-[#E7F8F2]">Email</th>
                                    <th className="p-4 text-[#6D7873] dark:text-[#E7F8F2]">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {latestUsers.map(user => (
                                    <tr key={user._id} className="border-t border-[#219e64] hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                                        <td className="p-4 font-medium text-[#111827] dark:text-[#E7F8F2]">{user.name}</td>
                                        <td className="p-4 text-[#6D7873] dark:text-[#A3A3A3]">{user.email}</td>
                                        <td className="p-4 capitalize">
                                            <span className={`px-3 py-1 rounded-full text-xs
                                                ${user.role === 'admin' && 'bg-green-100 text-green-700'}
                                                ${user.role === 'staff' && 'bg-blue-100 text-blue-700'}
                                                ${user.role === 'citizen' && 'bg-gray-100 text-gray-800'}`}>
                                                {user.role}
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

export default AdminDashboard;
