import React, { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaPlusCircle } from 'react-icons/fa';
import { FaBarsStaggered, FaFileLines, FaMountainCity } from 'react-icons/fa6';
import { LuLayoutDashboard, LuUsers } from 'react-icons/lu';
import { Link, NavLink, Outlet } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { AiOutlineLogout } from 'react-icons/ai';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { RiUserSettingsLine } from 'react-icons/ri';
import { MdOutlinePayments } from 'react-icons/md';

const DashboardLayouts = () => {

    const { logOut, user } = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const axiosSecure = useAxiosSecure();

    // Log Out
    const handleLogOut = () => {
        logOut()
            .then(() => {
                
            })
            .catch(error => {
                console.log(error)
            });
    };

    // Dark mood
    useEffect(() => {
        const html = document.querySelector("html");
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light");
    };

    const { data: profile = {} } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    return (
        <>
            <div className="drawer xl:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <nav className="navbar w-full bg-[#FBFCFB] dark:bg-gray-900 shadow-sm flex justify-between items-center sticky top-0 z-99">
                        {/* Small screen button */}
                        <label htmlFor="my-drawer-4" className="xl:hidden">
                            <div className='pl-2 md:pl-5 cursor-pointer text-black text-[20px]'><FaBarsStaggered /></div>
                        </label>
                        <div></div>
                        <div className='pr-2 md:pr-5 flex items-center gap-3'>
                            <div>
                                <input onChange={(e) => handleTheme(e.target.checked)} type="checkbox" defaultChecked={localStorage.getItem('theme') === "dark"} className="toggle"/>
                            </div>
                            <div>
                                <img src={user.photoURL} className='w-10 h-10 object-cover rounded-full cursor-pointer p-0.5 border border-[#219e64a8]' alt="" />
                            </div>
                        </div>
                    </nav>
                    <Outlet />
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                    <div className="min-h-full w-64 bg-[#f2faf2] dark:bg-gray-900 shadow-[0_-3px_6px_rgba(0,0,0,0.1)] flex flex-col justify-between">
                        <div>
                            <div className='shadow-[0_1px_2px_rgba(0,0,0,0.15)] dark:shadow-[#219E64] px-7 pt-[15px] pb-4'>
                                <Link to='/' className='flex items-center gap-1.5 text-[20px] sm:text-[22px] lg:text-[22px] font-bold text-[#219E64]'><FaMountainCity /><span>CityFix</span></Link>
                            </div>

                            {/* side bar profile */}
                            <div className='pt-7 pb-6 px-7 flex items-center gap-2 border-b border-[#219E64]'>
                                <img src={user?.photoURL || "/default-avatar.png" } alt="Profile" className="w-13 h-13 rounded-full object-cover p-0.5 border border-[#219E64]" />
                                <div>
                                    <h4 className='text-[17px] font-semibold text-[#141414] dark:text-white'>{user.displayName}</h4>
                                    <p className='py-0.5 px-2.5 rounded-full text-[12px] font-medium capitalize bg-[#219E64] text-white inline-block'>{profile.role}</p>
                                </div>
                            </div>

                            {/* Citizen Dashboard Menu */}
                            {profile?.role === 'citizen' && (
                                <div className='dashboard-active mt-8 flex flex-col gap-1.5 px-4'>
                                    <NavLink to='/dashboard/citizen'><LuLayoutDashboard /><span>Dashboard</span></NavLink>
                                    <NavLink to='/dashboard/report-issue'><FaPlusCircle /><span>Report Issue</span></NavLink>
                                    <NavLink to='/dashboard/my-issues'><FaFileLines /><span>My Issues</span></NavLink>
                                    <NavLink to='/dashboard/my-profile'><CgProfile /><span>My Profile</span></NavLink>
                                </div>
                            )}

                            {/* Staff Dashboard Menu */}
                            {profile?.role === 'staff' && (
                                <div className='staff-dashboard mt-8 flex flex-col gap-1.5 px-4'>
                                    <NavLink to='/dashboard/staff'><LuLayoutDashboard /><span>Dashboard</span></NavLink>
                                    <NavLink to='/dashboard/assigned-issues'><FaFileLines /><span>Assigned Issues</span></NavLink>
                                    <NavLink to='/dashboard/staff-profile'><CgProfile /><span>My Profile</span></NavLink>
                                </div>
                            )}

                            {/* Admin Dashboard Menu */}
                            {profile?.role === 'admin' && (
                                <div className='admin-dashboard mt-8 flex flex-col gap-1.5 px-4'>
                                    <NavLink to='/dashboard/admin'><LuLayoutDashboard /><span>Dashboard</span></NavLink>
                                    <NavLink to='/dashboard/all-issues'><FaFileLines /><span>All Issues</span></NavLink>
                                    <NavLink to='/dashboard/manage-users'><LuUsers /><span>Manage Users</span></NavLink>
                                    <NavLink to='/dashboard/manage-staff'><RiUserSettingsLine /><span>Manage Staff</span></NavLink>
                                    <NavLink to='/dashboard/payments'><MdOutlinePayments /><span>Payments</span></NavLink>
                                    <NavLink to='/dashboard/admin-profile'><CgProfile /><span>My Profile</span></NavLink>
                                </div>
                            )}
                            
                        </div>
                        <div className='dashboard-active mb-12 flex flex-col gap-1.5 px-4 border-t border-[#219E64] pt-5'>
                            <Link to='/'><FaMountainCity /><span>Back to Home</span></Link>
                            <button onClick={() => handleLogOut()} className='flex items-center gap-2 px-[15px] py-1.5 text-[16px] font-medium text-red-500 hover:bg-[#219E64] hover:text-white transition rounded w-full'><AiOutlineLogout /><span>LogOut</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardLayouts;