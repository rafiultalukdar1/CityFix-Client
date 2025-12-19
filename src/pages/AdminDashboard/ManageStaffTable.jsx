import React, { useState, useRef } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageStaffTable = ({ staffs, refetchStaffs }) => {
    const axiosSecure = useAxiosSecure();
    const [editStaff, setEditStaff] = useState(null);
    const [loading, setLoading] = useState(false);
    const dialogRef = useRef(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const openEditModal = (staff) => {
        setEditStaff(staff);
        reset({
            name: staff.name,
            phone: staff.phone
        });
        dialogRef.current.showModal();
    };

    // Delete staff
    const handleDelete = async (staffId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        if (!result.isConfirmed) return;
        try {
            const res = await axiosSecure.delete(`/users-staff/${staffId}`);
            if (res.data?.success) {
                Swal.fire(
                    'Deleted!',
                    'Staff has been deleted.',
                    'success'
                );
                refetchStaffs();
            } else {
                Swal.fire(
                    'Failed!',
                    res.data?.message || 'Failed to delete staff!',
                    'error'
                );
            }
        } catch (err) {
            console.error(err);
            Swal.fire(
                'Error!',
                err.response?.data?.message || 'Failed to delete staff!',
                'error'
            );
        }
    };



    // Update form
    const handleFormSubmit = async (data) => {
        if (!editStaff) {
            toast.error("No staff selected to update!");
            return;
        }
        setLoading(true);
        try {
            let photoURL = editStaff.photo || '';
            if (data.photo && data.photo[0]) {
                const formData = new FormData();
                formData.append('image', data.photo[0]);
                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_KEY}`,
                    formData
                );
                if (!res.data?.data?.display_url) throw new Error("Image upload failed");
                photoURL = res.data.data.display_url;
            }
            const res = await axiosSecure.put(`/users-staff/${editStaff._id}`, {
                name: data.name.trim(),
                phone: data.phone.trim(),
                photo: photoURL
            });
            if (res.data?.success) {
                toast.success("Staff updated successfully!");
                refetchStaffs();
                dialogRef.current.close();
            } else {
                toast.error(res.data?.message || "Update failed!");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || err.message || "Action failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                                    <div className='flex items-center gap-2.5'>
                                        <button onClick={() => openEditModal(staff)} className='py-2 px-2.5 rounded-md bg-gray-100 hover:bg-gray-300 border border-gray-300'><FaRegEdit size={16} /></button>
                                        <button onClick={() => handleDelete(staff._id)} className='py-2 px-2.5 rounded-md bg-red-600 hover:bg-red-500 text-white'><RiDeleteBinLine size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="modal-box flex flex-col gap-2.5">
                    <h3 className="font-bold text-[22px]">Update Staff</h3>
                    <input {...register('name', { required: true })} className="form-input" placeholder="Enter name" defaultValue={editStaff?.name || ''}/>
                    {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                    <input {...register('phone', { required: true })} className="form-input" placeholder="Enter phone" defaultValue={editStaff?.phone || ''}/>
                    {errors.phone && <p className="text-red-500 text-sm">Phone is required</p>}
                    <input {...register('photo')} type="file" className="form-input"/>
                    <div className="modal-action">
                        <button type="submit" className="px-4 py-2 bg-[#219E64] text-white rounded-md">{loading ? 'Processing...' : 'Update Staff'}</button>
                        <button type="button" onClick={() => dialogRef.current.close()} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
                    </div>
                </form>
            </dialog>
        </>
    );
};

export default ManageStaffTable;