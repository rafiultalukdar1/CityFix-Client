import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaRegChessQueen } from 'react-icons/fa6';
import { IoIosCalendar } from 'react-icons/io';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PaymentInvoice from './PaymentInvoice';

const MyProfile = () => {
    
    const axiosSecure = useAxiosSecure();
    const { updateUserProfile, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [upgrading, setUpgrading] = useState(false);

    // Fetch profile data from server
    const { data: profile, isLoading, refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    if (isLoading) return <div className='text-center py-20'><span className="loading loading-bars loading-xl"></span></div>;

    const handleUpdate = async (data) => {
        setLoading(true);
        try {
            let photoURL = profile.photo;
            if (data.photo && data.photo[0]) {
                const formData = new FormData();
                formData.append('image', data.photo[0]);
                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_KEY}`,
                    formData
                );
                photoURL = res.data.data.display_url;
            }
            const updatedUser = {
                name: data.name || profile.name,
                email: profile.email,
                photo: photoURL
            };
            await axiosSecure.put(`/users/${profile.email}`, updatedUser);
            updateUserProfile({ displayName: updatedUser.name, photoURL: updatedUser.photo });
            toast.success('Profile updated successfully!');
            refetch();
        } catch (err) {
            console.error(err);
            toast.error('Profile update failed!');
        } finally {
            setLoading(false);
        }
    };

    // Subscription
    const handleUpgrade = async () => {
        if (upgrading) return;
        setUpgrading(true);
        try {
            const res = await axiosSecure.post('/create-checkout-session', { email: profile.email });
            if (res.data?.url) window.location.href = res.data.url;
            else toast.error("Failed to initiate payment!");
        } catch (err) {
            console.error(err);
            toast.error("Upgrade failed!");
        } finally {
            setUpgrading(false);
        }
    };


    return (
        <>
            <title>CityFix - My Profile</title>
            <div className='px-3 py-12'>
                <div className='max-w-[700px] mx-auto flex flex-col gap-8'>
                    <div>
                        <h2 className='text-[32px] md:text-[38px] lg:text-[48px] text-[#141414] dark:text-white font-bold'>My Profile</h2>
                        <p className='text-[#6D7873] dark:text-[#E7F8F2] text-[16px]'>Manage your account settings and subscription.</p>
                    </div>

                    {!profile.isPremium && (
                        <div className='bg-[#FBFCFB] dark:bg-gray-900 shadow-sm py-3.5 md:py-8 px-4 md:px-8 rounded-lg lg:rounded-xl flex justify-between items-center'>
                            <div className='flex items-center gap-3.5'>
                                <div className='bg-[#E7F8F2] text-[#10B77F] p-2 md:p-4 rounded-md text-[22px] md:text-[28px]'>
                                    <FaRegChessQueen />
                                </div>
                                <div>
                                    <h3 className='text-[20px] md:text-[24px] font-bold'>Free Plan</h3>
                                    <p className='text-[16px] text-[#6D7873] dark:text-[#E7F8F2]'>Limited to 3 issue reports</p>
                                </div>
                            </div>
                            <button onClick={handleUpgrade} className='px-3.5 py-1.5 rounded-md font-medium bg-[#219E64] hover:bg-[#0c7e49] transition text-white'>Upgrade</button>
                        </div>
                    )}


                    <div className='bg-[#FBFCFB] dark:bg-gray-900 shadow-sm py-3.5 md:py-8 px-4 md:px-8 rounded-lg lg:rounded-xl flex flex-col gap-2.5'>
                        <div className='flex flex-col sm:flex-row sm:items-center gap-3 justify-between'>
                            <div className='flex items-center gap-5'>
                                <div>
                                    <img src={user?.photoURL || "/default-avatar.png" } alt="Profile" className="w-15 sm:w-18 h-15 sm:h-18 rounded-full object-cover p-0.5 border border-[#219E64]" />
                                </div>
                                <div>
                                    {profile.isPremium && (
                                        <div>
                                            <p className='text-[12px] font-semibold uppercase bg-[#E7F8F2] text-[#10B77F] py-0.5 px-2.5 rounded-2xl border border-[#10B77F] inline'>Premium</p>
                                        </div>
                                    )}
                                    <h4 className='text-[20px] font-semibold text-[#141414] dark:text-white'>{profile.name}</h4>
                                    <p className='text-[#6D7873] text-[15px]'>{profile.email}</p>
                                </div>
                            </div>
                            <div>
                                {/* <button className='inline-flex items-center gap-2 font-medium bg-gray-100 hover:bg-gray-300 text-[#141414] border border-gray-300 py-0.5 px-2.5 rounded'><FiDownload /><span>Invoice PDF</span></button> */}
                                {/* <PDFDownloadLink document={<PaymentInvoice payment={profile.latestPayment} />} fileName={`invoice_${profile.latestPayment?.transactionId || 'payment'}.pdf`} className='inline-flex items-center gap-2 font-medium bg-gray-100 hover:bg-gray-300 text-[#141414] border border-gray-300 py-0.5 px-2.5 rounded'>
                                {({ loading }) => (loading ? 'Loading...' : <><FiDownload /><span>Invoice PDF</span></>)}
                                </PDFDownloadLink> */}
                                {profile.latestPayment ? (
                                    <PDFDownloadLink
                                        document={<PaymentInvoice payment={profile.latestPayment} />}
                                        fileName={`invoice_${profile.latestPayment.transactionId}.pdf`}
                                        className='inline-flex items-center gap-2 font-medium bg-gray-100 hover:bg-gray-300 text-[#141414] border border-gray-300 py-0.5 px-2.5 rounded'>
                                        {({ loading }) => (loading ? 'Loading...' : <><FiDownload /><span>Invoice PDF</span></>)}
                                    </PDFDownloadLink>
                                ) : (
                                    <button disabled className='inline-flex items-center gap-2 ...'>No Payment</button>
                                )}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(handleUpdate)} className='flex flex-col gap-2.5'>
                            <div>
                                <label className='form-label'>Name</label>
                                <input type="text" defaultValue={profile.name} {...register('name', { required: 'Name is required' })} className='form-input' /> {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className='form-label'>Profile Photo</label>
                                <input type="file" {...register('photo')} className='file-input w-full text-[#464545] text-[15px] outline-0 border border-[#219e648f] focus:border-[#219E64] bg-[#F3F3F3] rounded dark:text-[#F3F3F3] dark:bg-gray-900 dark:border-[#219E6480] dark:focus:border-[#219E64]' /> {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white dark:bg-[#1D232A] shadow-sm rounded-lg py-5 px-4 mt-3'>
                                <div>
                                    <p className='text-[16px] text-[#6D7873] dark:text-[#E7F8F2]'>Member Since:</p>
                                    <p className='flex items-center gap-1.5 text-[16px] text-[#6D7873] dark:text-[#E7F8F2]'><IoIosCalendar /><span>{new Date(profile.createdAt).toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'})}</span></p>
                                </div>
                                <div>
                                    <p className='text-[16px] text-[#6D7873] dark:text-[#E7F8F2]'>Designation:</p>
                                    <p className='text-[16px] text-[#6D7873] dark:text-[#E7F8F2] flex items-center gap-1.5 capitalize'><FaRegUserCircle /><span>{profile.role}</span></p>
                                </div>
                            </div>
                            <button type='submit' disabled={loading} className='py-1.5 w-full bg-[#219E64] hover:bg-[#0c7e49] transition rounded mt-3 text-white text-[18px] font-medium disabled:opacity-50'> {loading ? 'Updating...' : 'Update Profile'} </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyProfile;