import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Login = () => {

    const [showPass, setShowPass] = useState(false);
    const { signInUser, signWithGoogle } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();

    // Navigate for user
    const { data: dbUser, isLoading } = useQuery({
        queryKey: ['db-user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/loggedin');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <PuffLoader color="#219E64" size={60} />
            </div>
        )
    };

    // Form Login
    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(() => {
                // navigate(location.state || '/');
                toast.success('Login successful!');
                if (dbUser.role === 'admin') navigate('/dashboard/admin');
                else if (dbUser.role === 'staff') navigate('/dashboard/staff');
                else navigate(location.state || '/');

            })
            .catch(() => {
                toast.error('Invalid email or password!');
            });
    };

    // Google Login
    const handleGoogleSignIn = () => {
            signWithGoogle()
                .then((result) => {
                    const loggedUser = result.user;
                    const userInfo = {
                        name: loggedUser.displayName,
                        email: loggedUser.email,
                        role: "citizen",
                        photo: loggedUser.photoURL,
                        isPremium: false,
                        status: "active",
                        isBlocked: false,
                        createdAt: new Date()
                    };
                    axiosSecure.post("/users", userInfo)
                        .then(() => {
                            navigate(location.state || '/');
                            toast.success('Google login successful!');
                        })
                        .catch(() => toast.error("Saving user failed!"));
                })
                .catch(() => {
                    toast.error('Google login failed!');
                });
        };

    return (
        <div className='py-[65px] lg:py-[95px]'>
            <div className='container'>
                <div className='max-w-[510px] mx-auto px-[25px] md:px-10 py-[30px] md:py-12 bg-white dark:bg-gray-900 shadow-xl rounded-md border border-[#e7e7e798]'>
                    <h2 className='text-[#141414] dark:text-white text-center text-[24px] md:text-[28px] lg:text-[32px] font-semibold'>Login your account</h2>
                    <span className='block bg-[#E7E7E7] h-px w-full my-[18px] md:my-[25px]'></span>

                    <form onSubmit={handleSubmit(handleLogin)} className='mt-5'>

                        <label className="form-label">Email address</label>
                        <input
                            {...register('email', { required: '*Email is required' })}
                            className='form-input'
                            type="email"
                            placeholder="Enter your email address"
                        />
                        {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}

                        <label className="form-label">Password</label>
                        <div className='relative'>
                            <input
                                {...register('password', { required: '*Password is required' })}
                                className='form-input'
                                type={showPass ? 'text' : 'password'}
                                placeholder="Enter your password"
                            />
                            <span
                                onClick={() => setShowPass(!showPass)}
                                className='absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer text-[#141414] dark:text-white'
                            >
                                {showPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </span>
                        </div>
                        {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}

                        <Link to='/reset-password' className='text-sm text-[#141414] dark:text-white cursor-pointer inline-block mt-1'>Forget Password?</Link>
                        <button className='py-2 w-full bg-[#219E64] rounded mt-5 text-white text-[18px] font-medium'>Login</button>
                        <div className='divider my-[22px] text-[#141414] dark:text-white'>OR</div>
                        <button type="button" onClick={handleGoogleSignIn} className='google-button'>
                            <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="transparent"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            <span>Sign up with Google</span>
                        </button>
                        <p className='text-center text-[#464545] dark:text-white text-[16px] font-medium pt-[22px]'>
                            Don't have any account?
                            <Link state={location.state} to='/register' className='text-[#219E64] font-semibold ml-1'>Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
