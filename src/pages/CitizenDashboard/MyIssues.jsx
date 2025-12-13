import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { PuffLoader } from 'react-spinners';
import { IoMdPricetags } from 'react-icons/io';
import { FaEye, FaLocationDot } from 'react-icons/fa6';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const MyIssues = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [selectedIssueId, setSelectedIssueId] = React.useState(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const { data: issues = [], isLoading, refetch } = useQuery({
        queryKey: ['my-issues'],
        queryFn: async () => {
            const res = await axiosSecure.get('/my-issues');
            return res.data;
        }
    });

    // modal
    const openModal = (issue) => {
        setSelectedIssueId(issue._id);
        reset({
            title: issue.title,
            description: issue.description,
            category: issue.category,
            location: issue.location,
            photo: null
        });
        document.getElementById('update_modal').showModal();
    };

    // update handler
    const onSubmit = async (data) => {
        try {
            let imageUrl;
            if (data.photo && data.photo[0]) {
                const formData = new FormData();
                formData.append('image', data.photo[0]);
                const imgRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_KEY}`,
                    formData
                );
                imageUrl = imgRes.data.data.url;
            }
            const updatedIssue = {
                title: data.title,
                description: data.description,
                category: data.category,
                location: data.location
            };

            if (imageUrl) {
                updatedIssue.images = [imageUrl];
            }
            await axiosSecure.patch(`/issues/${selectedIssueId}`, updatedIssue);
            document.getElementById('update_modal').close();
            refetch();
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <PuffLoader color="#219E64" size={60} />
            </div>
        );
    };

    const handleFilterChange = (setter) => (e) => {
        setter(e.target.value);
    };

    // Filtered issues
    const filteredIssues = issues.filter(issue => {
        const statusMatch = statusFilter ? issue.status === statusFilter : true;
        const categoryMatch = categoryFilter ? issue.category === categoryFilter : true;
        return statusMatch && categoryMatch;
    });

    // Delete
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This issue will be permanently deleted',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete'
        });

        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/issues/${id}`);
            if (res.data.deletedCount > 0) {
                toast.success('Issue deleted');
                refetch();
            }
        }
    };




    return (
        <>
            <title>CityFix - My Issues</title>
            <div className="px-3 py-12 max-w-[890px] mx-auto">
                <h2 className="text-[30px] md:text-[34px] lg:text-[40px] font-bold">My Issues ({issues.length})</h2>
                <p className="text-[#6D7873] text-[16px]">Manage and track all your reported issues.</p>

                <div className='flex flex-col sm:flex-row items-center justify-between gap-3 my-6'>
                    <select value={statusFilter} onChange={handleFilterChange(setStatusFilter)} className='form-input'>
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                    <select value={categoryFilter} onChange={handleFilterChange(setCategoryFilter)} className='form-input'>
                        <option value="">All Categories</option>
                        <option value="electricity">Electricity</option>
                        <option value="bridge">Bridge</option>
                        <option value="waste">Waste</option>
                        <option value="footpath">Footpath</option>
                        <option value="public park">Public Park</option>
                        <option value="natural">Natural</option>
                        <option value="obstruction">Obstruction</option>
                        <option value="drainage">Drainage</option>
                        <option value="water leakage">Water Leakage</option>
                        <option value="pothole">Pothole</option>
                        <option value="streetlight">Streetlight</option>
                        <option value="road">Road</option>
                        <option value="traffic sign">Traffic Sign</option>
                        <option value="garbage">Garbage</option>
                    </select>
                </div>

                <div className="flex flex-col gap-5 mt-5">
                    {
                        filteredIssues.map(issue => <div key={issue._id} className="flex flex-col md:flex-row md:items-center border border-[#E1E7EF] dark:border-white rounded-lg lg:rounded-2xl p-4 md:pr-7 lg:items-center gap-5 dark:bg-[#101828]">
                            <img src={issue.images} alt="" className='h-62 w-full md:w-70 object-cover rounded-lg' />
                            <div>
                                <div className='flex items-center gap-2'>
                                    <span className={`inline-block py-0.5 px-3 rounded-full text-[13px] font-medium capitalize ${issue.status === 'resolved' ? 'bg-[#E7F8F2] text-[#10B77F]' : issue.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>{issue.status}</span>
                                    <span className={`inline-block py-0.5 px-3 rounded-full text-[13px] font-medium capitalize ${issue.isBoosted ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'}`}>{issue.isBoosted ? 'High' : 'Normal'}</span>                                    
                                </div>
                                <h2 className='text-[20px] md:text-[22px] font-bold text-[#141414] dark:text-white pt-2'>{issue.title}</h2>
                                <p className=' text-[#6D7873] text-[15px] overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]'>{issue.description}</p>
                                <div className='flex flex-col gap-1 border-b border-[#219e64e1] py-2 mb-1'>
                                    <p className='flex items-center gap-1.5 text-[16px] font-medium capitalize'><IoMdPricetags className='text-[16px] text-[#10B77F]' /><span>{issue.category}</span></p>
                                    <p className='flex items-center gap-1.5 text-[16px] font-medium'><FaLocationDot className='text-[16px] text-[#10B77F]' /><span>{issue.location}</span></p>
                                </div>

                                <div className='pt-2 dark:border-white flex justify-between items-center'>
                                    <div className='hidden sm:block'></div>
                                    <div className='flex flex-wrap items-center gap-2.5'>
                                        <Link to={`/issue-details/${issue._id}`} className='flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4.5 py-2 rounded-md bg-[#219E64] hover:bg-[#0c7e49] transition text-[15px] text-white font-semibold'><FaEye /><span>View Details</span></Link>

                                        <button onClick={() => openModal(issue)} className='flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4.5 py-2 rounded-md border border-gray-300 text-[#141414] font-semibold bg-gray-100 hover:bg-gray-300 transition text-[15px]'><FaRegEdit size={16} /><span>Update</span></button>

                                        <button onClick={() => handleDelete(issue._id)} className='flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4.5 py-2 rounded-md bg-red-600 hover:bg-red-500 text-[15px] text-white font-semibold transition'><RiDeleteBinLine size={16} /><span>Delete</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>


            {/* Update Modal */}
            <dialog id="update_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Issue</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-4">
                        <div>
                            <input {...register('title', { required: 'Title is required' })} placeholder="Title" className="form-input w-full" /> {errors.title && ( <p className="text-red-500 text-sm mt-1"> {errors.title.message} </p> )}
                        </div>
                        <div>
                            <textarea {...register('description', { required: 'Description is required' })} placeholder="Description" className="form-input w-full" rows="5" /> {errors.description && ( <p className="text-red-500 text-sm mt-1"> {errors.description.message} </p> )}
                        </div>
                        <div>
                            <select {...register('category', { required: 'Category is required' })} className="form-input w-full">
                                <option value="">Select Category</option>
                                <option value="electricity">Electricity</option>
                                <option value="bridge">Bridge</option>
                                <option value="waste">Waste</option>
                                <option value="footpath">Footpath</option>
                                <option value="public park">Public Park</option>
                                <option value="natural">Natural</option>
                                <option value="obstruction">Obstruction</option>
                                <option value="drainage">Drainage</option>
                                <option value="water leakage">Water Leakage</option>
                                <option value="pothole">Pothole</option>
                                <option value="streetlight">Streetlight</option>
                                <option value="road">Road</option>
                                <option value="traffic sign">Traffic Sign</option>
                                <option value="garbage">Garbage</option>
                            </select> {errors.category && ( <p className="text-red-500 text-sm mt-1"> {errors.category.message} </p> )}
                        </div>
                        <div>
                            <input {...register('location', { required: 'Location is required' })} placeholder="Location" className="form-input w-full" /> {errors.location && ( <p className="text-red-500 text-sm mt-1"> {errors.location.message} </p> )}
                        </div>
                        {/* <div>
                            <input type="file" accept="image/*" {...register('photo')} className="form-input w-full" />
                        </div> */}
                        <div className="modal-action">
                            <button type="submit" className="px-3.5 sm:px-4.5 py-2 rounded-md bg-[#219E64] hover:bg-[#0c7e49] transition text-[15px] text-white font-semibold"> Update </button>
                            <button type="button" onClick={()=> document.getElementById('update_modal').close()} className="px-3.5 sm:px-4.5 py-2 rounded-md border border-gray-300 text-[#141414] font-semibold bg-gray-100 hover:bg-gray-300 transition text-[15px]" >Close</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default MyIssues;