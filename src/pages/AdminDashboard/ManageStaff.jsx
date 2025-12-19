import React, { useState } from 'react';
import { MdAddCircle } from "react-icons/md";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PuffLoader } from 'react-spinners';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import ManageStaffTable from './ManageStaffTable';

const ManageStaff = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { data: staffs = [], isLoading, refetch } = useQuery({
        queryKey: ['staffs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users-staff');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <PuffLoader color="#219E64" size={60} />
            </div>
        );
    }

    // Create Staff
    const onSubmit = async (data) => {
        try {
            if (!data.name || !data.email || !data.phone || !data.photo?.length || !data.password) {
                toast.error('All fields are required');
                return;
            }
            if (data.password.length < 6) {
                toast.error('Password must be at least 6 characters');
                return;
            }
            const formData = new FormData();
            formData.append('image', data.photo[0]);
            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_KEY}`,
                formData
            );
            const photoURL = imgRes?.data?.data?.url;
            if (!photoURL) {
                toast.error('Image upload failed');
                return;
            }
            const staffData = {
                name: data.name.trim(),
                email: data.email.trim(),
                phone: data.phone.trim(),
                password: data.password,
                photo: photoURL
            };
            const res = await axiosSecure.post('/users-staff', staffData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.data?.success) {
                toast.success('Staff created successfully');
                reset();
                document.getElementById('addStaffModal').close();
                queryClient.invalidateQueries(['staffs']);
            } else {
                toast.error(res.data?.message || 'Failed to create staff');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };


    return (
        <>
            <title>CityFix - Manage Staff</title>

            <div className="px-3 py-12 max-w-[1600px] mx-auto">
                <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-3'>
                    <div>
                        <h2 className="text-[30px] md:text-[34px] lg:text-[40px] font-bold">Manage Staff</h2>
                        <p className="text-[#6D7873] dark:text-[#E7F8F2] text-[16px]">Add and manage staff members.</p>
                    </div>
                    <button
                        onClick={() => document.getElementById('addStaffModal').showModal()}
                        className='flex items-center gap-2 px-[18px] py-2 text-[16px] font-medium bg-[#219E64] hover:bg-[#168652] text-white transition rounded justify-center max-w-[220px] sm:max-w-[150px] w-full'
                    >
                        <MdAddCircle />
                        <span>Add Staff</span>
                    </button>
                </div>

                <ManageStaffTable staffs={staffs} refetchStaffs={refetch}></ManageStaffTable>

                {/* Create Staff */}
                <dialog id="addStaffModal" className="modal modal-bottom sm:modal-middle">
                    <form onSubmit={handleSubmit(onSubmit)} className="modal-box flex flex-col gap-2.5">
                        <h3 className="font-bold text-[22px]">Add New Staff</h3>
                        <input {...register('name', { required: true })} className="form-input" placeholder="Enter name" />
                        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                        <input {...register('email', { required: true })} type="email" className="form-input" placeholder="Enter email" />
                        {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                        <input {...register('phone', { required: true })} className="form-input" placeholder="Enter phone" />
                        {errors.phone && <p className="text-red-500 text-sm">Phone is required</p>}
                        <input {...register('photo', { required: true })} type="file" className="form-input" />
                        {errors.photo && <p className="text-red-500 text-sm">Photo is required</p>}
                        <div className="relative">
                            <input {...register('password', { required: true, minLength: 6 })} type={showPass ? 'text' : 'password'} className="form-input" placeholder="Enter password"/>
                            <span onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                                {showPass ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            {errors.password && <p className="text-red-500 text-sm">Password is required & min 6 chars</p>}
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="px-4 py-2 bg-[#219E64] text-white rounded-md">Create Staff</button>
                            <button type="button" onClick={() => document.getElementById('addStaffModal').close()} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
                        </div>
                    </form>
                </dialog>
            </div>
        </>
    );
};

export default ManageStaff;
