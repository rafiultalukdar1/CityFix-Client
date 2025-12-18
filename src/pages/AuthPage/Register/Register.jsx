import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {

    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, signWithGoogle, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();

    // Form Register
    const handleRegister = (data) => {
        const profileImg = data.photo[0];
        createUser(data.email, data.password)
            .then(() => {
                const formData = new FormData();
                formData.append('image', profileImg);
                const img_Api_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_KEY}`;
                axios.post(img_Api_URL, formData)
                    .then(res => {
                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.display_url,
                        };
                        updateUserProfile(userProfile)
                            .then(() => {
                                const userInfo = {
                                    name: data.name,
                                    email: data.email,
                                    role: "citizen",
                                    photo: res.data.data.display_url,
                                    isPremium: false,
                                    status: "active",
                                    isBlocked: false,
                                    createdAt: new Date()
                                };
                                axiosSecure.post("/users", userInfo)
                                    .then(() => {
                                        navigate(location.state || '/');
                                        toast.success('Registration successful!');
                                    });

                            });
                    })
                    .catch(() => toast.error('Image upload failed!'));
            })
            .catch(() => toast.error('Email already exists or invalid!'));
    };







    // Google Register
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
                    <h2 className='text-[#141414] dark:text-white text-center text-[24px] md:text-[28px] lg:text-[32px] font-semibold'>Register your account</h2>
                    <span className='block bg-[#E7E7E7] h-px w-full my-[18px] md:my-[25px]'></span>

                    <form onSubmit={handleSubmit(handleRegister)} className='mt-5'>
                        <label className="form-label">Your Name</label>
                        <input
                            {...register('name', { required: '*Name is required' })}
                            className='form-input'
                            type="text"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        <label className="form-label">Your Profile</label>
                        <input
                            type="file"
                            {...register('photo', { required: '*Photo is required' })}
                            className="file-input w-full text-[#464545] text-[15px] outline-0 border border-[#219e648f] focus:border-[#219E64] bg-[#F3F3F3] rounded dark:text-[#F3F3F3] dark:bg-gray-900 dark:border-[#219E6480] dark:focus:border-[#219E64]"
                        />
                        {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
                        <label className="form-label">Email address</label>
                        <input
                            {...register('email', { required: '*Email is required' })}
                            className='form-input'
                            type="email"
                            placeholder="Enter your email address"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        <label className="form-label">Password</label>
                        <div className='relative'>
                            <input
                                {...register('password', {
                                    required: '*Password is required',
                                    minLength: { value: 6, message: '*Minimum length 6 characters' },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/,
                                        message: '*Must include uppercase, lowercase & special character'
                                    }
                                })}
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
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        <button type="submit" className='py-2 w-full bg-[#219E64] rounded mt-5 text-white text-[18px] font-medium'>
                            Register
                        </button>
                        
                        <p className='divider text-center py-5 text-[#71717A] font-semibold'>OR</p>
                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            className='google-button'>
                            <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="transparent"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            <span>Sign up with Google</span>
                        </button>

                        <p className='text-center text-[#464545] dark:text-white text-[16px] font-medium pt-[22px]'>
                            Already have an account?
                            <Link to='/login' state={location.state} className='text-[#219E64] font-semibold ml-1'>Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
