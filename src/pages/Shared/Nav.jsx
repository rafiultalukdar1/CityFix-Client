import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { FaMountainCity } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Nav = () => {

    const { user, logOut } = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [open, setOpen] = useState(false);
    const axiosSecure = useAxiosSecure();

    const links = (
        <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/all-issues">All Issues</NavLink>
            <NavLink to="/how-it-works">How It Works</NavLink>
            <NavLink to="/about-us">About Us</NavLink>
        </>
    );

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

    // for dynamic rout
    const { data: newUsers } = useQuery({
        queryKey: ['newUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const dashboardRoute = newUsers?.role === 'citizen' ? '/dashboard/citizen' : newUsers?.role === 'staff' ? '/dashboard/staff' : newUsers?.role === 'admin' ? '/dashboard/admin' : '/dashboard';
    const profileRoute = newUsers?.role === 'citizen' ? '/dashboard/my-profile' : newUsers?.role === 'staff' ? '/dashboard/staff-profile' : newUsers?.role === 'admin' ? '/dashboard/admin-profile' : '/dashboard';


    return (
        <>
            <div className='bg-[#F8F8F8] dark:bg-gray-900 shadow-sm dark:shadow-md py-2.5 sticky top-0 z-99'>
                <div className=''>
                    <div className='navbar container'>
                        <div className='navbar-start'>
                            <div className='dropdown'>
                                <div tabIndex={0} role='button' className='lg:hidden cursor-pointer mr-3.5'>
                                    <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-10' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' /> </svg>
                                </div>
                                <nav tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-2 mt-3 w-52 p-2 shadow px-5 py-3 space-y-1.5">
                                    {links}
                                </nav>
                            </div>
                            <NavLink to='/' className='flex items-center gap-1.5 text-[20px] sm:text-[22px] lg:text-[22px] font-bold text-[#219E64]'><FaMountainCity /><span>CityFix</span></NavLink>
                        </div>
                        <div className='navbar-center hidden lg:flex'>
                            <nav className='flex items-center gap-[22px]'>
                                {links}
                            </nav>
                        </div>
                        <div className='navbar-end gap-3'>
                            <div>
                                <input onChange={(e) => handleTheme(e.target.checked)} type="checkbox" defaultChecked={localStorage.getItem('theme') === "dark"} className="toggle"/>
                            </div>
                            <div>
                                {
                                    user ? 
                                    <>
                                        <div className='relative'>
                                            <img onClick={() => setOpen(!open)} src={user.photoURL} className='w-11 h-11 object-cover rounded-full cursor-pointer p-0.5 border border-[#219e64a8]' alt="" />
                                            {
                                                open && (
                                                    <div className='absolute menu right-0 w-[235px] pt-[18px] pb-2 rounded-lg space-y-3 bg-[#F8F8F8] dark:bg-gray-900 shadow-sm dark:shadow-md'>
                                                        <div className='px-[15px]'>
                                                            <h3 className='text-[#141414] dark:text-white text-[20px] font-semibold'>{user.displayName}</h3>
                                                            <p className='text-sm '>{user.email}</p>
                                                        </div>
                                                        <div onClick={() => setOpen(false)} className='border-t border-b border-[#DADADA] py-4 dark:border-[#464646] flex flex-col'>
                                                            <Link to={dashboardRoute} className='flex items-center gap-2 px-[15px] py-2 text-[15px] font-medium text-[#141414] dark:text-white hover:bg-[#219E64] hover:text-white transition rounded w-full'><LuLayoutDashboard /><span>Dashboard</span></Link>
                                                            <Link to={profileRoute} className='flex items-center gap-2 px-[15px] py-2 text-[15px] font-medium text-[#141414] dark:text-white hover:bg-[#219E64] hover:text-white transition rounded w-full'><CgProfile /><span>Profile</span></Link>
                                                        </div>
                                                        <div onClick={() => setOpen(false)} className='dropdown-link'>
                                                            <button onClick={() => handleLogOut()} className='flex items-center gap-2 px-[15px] py-1.5 text-[16px] font-medium text-red-500 hover:bg-[#219E64] hover:text-white transition rounded w-full'><AiOutlineLogout /><span>LogOut</span></button>
                                                        </div>
                                                    </div>)
                                            }
                                        </div>
                                    </>
                                    :
                                    <div className='login-nav flex items-center gap-2'>
                                        <NavLink to='/login' className='py-1.5 px-5 bg-white rounded-lg text-[#219E64] border border-[#219E64] text-[18px] font-semibold'>Login</NavLink>
                                        <NavLink to='/register' className='py-1.5 px-5 bg-white rounded-lg text-[#219E64] border border-[#219E64] text-[18px] font-semibold hidden sm:block'>Register</NavLink>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Nav;