import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { PuffLoader } from 'react-spinners';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdBlock } from 'react-icons/md';

const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();

    const { data: citizens = [], isLoading, refetch } = useQuery({
        queryKey: ['citizens'],
        queryFn: async () => {
        const res = await axiosSecure.get('/admin-citizens');
        return res.data;
        }
    });

    if (isLoading) return (
        <div className="flex justify-center items-center h-[60vh]"><PuffLoader color="#219E64" size={60} /></div>
    );

    // block handlar
    const handleBlockToggle = async (id) => {
        try {
            await axiosSecure.patch(`/users-block/${id}`);
            refetch();
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <>
            <title>CityFix - Manage Users</title>
            <div className="px-3 py-12 max-w-[1600px] mx-auto">
                <h2 className="text-[30px] md:text-[34px] lg:text-[40px] font-bold">Manage Users</h2>
                <p className="text-[#6D7873] dark:text-[#E7F8F2] text-[16px] mb-5">View and manage citizen accounts.</p>
                
                <div className="border border-[#219e64] rounded-xl overflow-x-scroll mt-3 md:mt-5 bg-[#FBFCFB]">
                    <table className="w-full min-w-[1200px] text-[16px]">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr className="text-left">
                                <th className="p-4 text-[#6D7873] dark:text-[#E7F8F2]">User</th>
                                <th className="p-4 text-[#6D7873] dark:text-[#E7F8F2]">Email</th>
                                <th className="p-4 text-[#6D7873] dark:text-[#E7F8F2]">Subscription</th>
                                <th className="p-4 text-[#6D7873] dark:text-[#E7F8F2]">Status</th>
                                <th className="p-4 text-[#6D7873] dark:text-[#E7F8F2]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {citizens.map((user) => (
                            <tr key={user._id} className="border-t border-[#219e64] dark:bg-[#1D232A]">
                                <td className="p-4 flex items-center gap-2 font-medium text-[#111827] dark:text-[#E7F8F2] text-[16px]">
                                    <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full" />
                                    {user.name}
                                </td>
                                <td className="p-4 text-[#6D7873] dark:text-[#A3A3A3]">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-[14px] font-semibold
                                        ${user.isPremium 
                                        ? 'border border-[#219E64] text-[#219E64] bg-[#68eeb02a] dark:text-white dark:border-white dark:bg-transparent' 
                                        : 'bg-[#fef9c27c] text-[#D08700] border border-[#D08700] dark:text-white dark:border-white dark:bg-transparent'}`}>
                                        {user.isPremium ? 'Premium' : 'Free'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-[14px] font-semibold
                                        ${user.isBlocked 
                                        ? 'text-red-600 border border-red-600 bg-[#f08d922d] dark:text-white dark:border-white dark:bg-transparent' 
                                        : 'border border-[#219E64] text-[#219E64] bg-[#68eeb02a] dark:text-white dark:border-white dark:bg-transparent'}`}>
                                        {user.isBlocked ? 'Blocked' : 'Active'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button onClick={() => handleBlockToggle(user._id)} className={`flex items-center gap-1.5 px-3 py-1.5 text-[16px] rounded-md text-sm font-semibold transition
                                        ${user.isBlocked 
                                        ? 'bg-[#219E64] hover:bg-[#0C7E49] text-white' 
                                        : 'bg-red-600 hover:bg-red-500 text-white'}`} >
                                        {user.isBlocked ? <IoMdCheckmarkCircleOutline size={18} /> : <MdBlock size={18} />}
                                        {user.isBlocked ? 'Unblock' : 'Block'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageUsers;