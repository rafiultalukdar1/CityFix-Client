import React, { useState } from 'react';
import { MdAddCircle } from "react-icons/md";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PuffLoader } from 'react-spinners';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaEye, FaEyeSlash, FaRegEdit } from 'react-icons/fa';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const ManageStaff = () => {

    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [showPass, setShowPass] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);

    // separate forms
    const addForm = useForm();
    const editForm = useForm();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = addForm;

    const {
        register: editRegister,
        handleSubmit: handleEditSubmit,
        reset: editReset,
        formState: { errors: editErrors }
    } = editForm;

    const { data: staffs = [], isLoading } = useQuery({
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
            const formData = new FormData();
            formData.append('image', data.photo[0]);

            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_KEY}`,
                formData
            );

            await axiosSecure.post('/users-staff', {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
                photo: imgRes.data.data.display_url
            });

            document.getElementById('addStaffModal').close();
            reset();
            queryClient.invalidateQueries(['staffs']);
        } catch (err) {
            console.error(err.response?.data?.message || err.message);
        }
    };

    // Update Staff
    const onUpdate = async (data) => {
        try {
            let photoURL = editingStaff.photo;

            if (data.photo && data.photo.length > 0) {
                const formData = new FormData();
                formData.append('image', data.photo[0]);

                const imgRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_KEY}`,
                    formData
                );
                photoURL = imgRes.data.data.display_url;
            }

            const payload = {
                name: data.name,
                phone: data.phone,
                photo: photoURL
            };

            if (data.password) payload.password = data.password;

            await axiosSecure.patch(`/users-staff/${editingStaff._id}`, payload);

            document.getElementById('editStaffModal').close();
            editReset();
            setEditingStaff(null);
            queryClient.invalidateQueries(['staffs']);
        } catch (err) {
            console.error(err.response?.data?.message || err.message);
        }
    };

    // Open Edit Modal
    const handleEditClick = (staff) => {
        setEditingStaff(staff);
        editReset({
            name: staff.name,
            phone: staff.phone,
            photo: null,
            password: ''
        });
        document.getElementById('editStaffModal').showModal();
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

                <div className='border border-[#219e64] rounded-xl overflow-x-scroll mt-3 md:mt-5 bg-[#FBFCFB]'>
                    <table className="w-full min-w-[1200px] text-[16px]">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr className="text-left">
                                <th className="p-4">Staff</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Joined</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffs.map((staff) => (
                                <tr key={staff._id} className="border-t border-[#219e64] dark:bg-[#1D232A]">
                                    <td className="p-4 flex items-center gap-2">
                                        <img src={staff.photo} alt={staff.name} className="w-10 h-10 rounded-full" />
                                        {staff.name}
                                    </td>
                                    <td className="p-4">{staff.email}</td>
                                    <td className="p-4">{staff.phone}</td>
                                    <td className="p-4">
                                        {staff.createdAt
                                            ? new Date(staff.createdAt).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })
                                            : '—'}
                                    </td>
                                    <td className='p-4'>
                                        <button
                                            onClick={() => handleEditClick(staff)}
                                            className='py-2 px-2.5 rounded-md bg-gray-100 hover:bg-gray-300 border border-gray-300'
                                        >
                                            <FaRegEdit size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add Staff Modal */}
                <dialog id="addStaffModal" className="modal modal-bottom sm:modal-middle">
                    <form onSubmit={handleSubmit(onSubmit)} className="modal-box flex flex-col gap-2.5">
                        <h3 className="font-bold text-[22px]">Add New Staff</h3>

                        <input {...register('name', { required: 'Name is required' })} className="form-input" placeholder="Enter name" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                        <input {...register('email', { required: 'Email is required' })} type="email" className="form-input" placeholder="Enter email" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                        <input {...register('phone', { required: 'Phone is required' })} className="form-input" placeholder="Enter phone" />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

                        <input {...register('photo', { required: 'Photo is required' })} type="file" className="form-input" />
                        {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}

                        <div className="relative">
                            <input {...register('password', { required: 'Password is required' })} type={showPass ? 'text' : 'password'} className="form-input" placeholder="Enter password" />
                            <span onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                                {showPass ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <div className="modal-action">
                            <button type="submit" className="px-4 py-2 bg-[#219E64] text-white rounded-md">Create Staff</button>
                            <button type="button" onClick={() => document.getElementById('addStaffModal').close()} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
                        </div>
                    </form>
                </dialog>

                {/* Edit Staff Modal */}
                <dialog id="editStaffModal" className="modal modal-bottom sm:modal-middle">
                    <form onSubmit={handleEditSubmit(onUpdate)} className="modal-box flex flex-col gap-2.5">
                        <h3 className="font-bold text-[22px]">Update Staff</h3>

                        {editingStaff?.photo && (
                            <img src={editingStaff.photo} alt="staff" className="w-12 h-12 rounded-full" />
                        )}

                        <input {...editRegister('name', { required: 'Name is required' })} className="form-input" />
                        {editErrors.name && <p className="text-red-500 text-sm">{editErrors.name.message}</p>}

                        <input {...editRegister('phone', { required: 'Phone is required' })} className="form-input" />
                        {editErrors.phone && <p className="text-red-500 text-sm">{editErrors.phone.message}</p>}

                        <input {...editRegister('photo')} type="file" className="form-input" />

                        <input {...editRegister('password')} type="password" className="form-input" placeholder="New password (optional)" />

                        <div className="modal-action">
                            <button type="submit" className="px-4 py-2 bg-[#219E64] text-white rounded-md">Update Staff</button>
                            <button
                                type="button"
                                onClick={() => {
                                    document.getElementById('editStaffModal').close();
                                    setEditingStaff(null);
                                    editReset();
                                }}
                                className="px-4 py-2 bg-gray-200 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </dialog>

            </div>
        </>
    );
};

export default ManageStaff;
