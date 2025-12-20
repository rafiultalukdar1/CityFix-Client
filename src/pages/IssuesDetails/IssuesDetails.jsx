import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaArrowLeft, FaLocationDot, FaUser } from 'react-icons/fa6';
import { IoMdPricetags } from 'react-icons/io';
import useAuth from '../../hooks/useAuth';
import { BiLike } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';
import { RiDeleteBinLine, RiMoneyDollarCircleLine } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';

const IssuesDetails = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedIssueId, setSelectedIssueId] = React.useState(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { data: issue = {}, isLoading, refetch } = useQuery({
        queryKey: ['issueDetails', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/${id}`);
            return res.data;
        }
    });

    const handleUpvote = async (id) => {
        if (!user?.email) {
            return navigate('/login');
        }
        await axiosSecure.patch(`/issues/upvote/${id}`, { userEmail: user.email });
        refetch();
    };

    const isOwner = user?.email && issue?.organizer_email === user.email;


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

    // block
        const { data: dbUser, isLoading: userLoading } = useQuery({
            queryKey: ['db-user'],
            queryFn: async () => {
                const res = await axiosSecure.get('/users')
                return res.data
            }
        });
    
        const isBlocked = dbUser?.isBlocked;

    if (isLoading || userLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <PuffLoader color="#219E64" size={60} />
            </div>
        );
    };

    // Delete
    const handleDelete = async (id) => {
        if (isBlocked) {
            toast.error('Your account is blocked. You cannot delete issues.')
            return
        }
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This issue will be permanently deleted',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete'
        })
        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/issues/${id}`)
            if (res.data.deletedCount > 0) {
                toast.success('Issue deleted')
                refetch();
                return navigate('/dashboard/my-issues');
            }
        }
    };

    // handle Boost Payment
    const handleBoost = async (issueId) => {
        try {
            const res = await axiosSecure.post(`/boost-issue/${issueId}`);
            window.location.assign(res.data.url);
        } catch (err) {
            console.error(err);
            toast.error('Boost payment failed!');
        }
    };

    



    return (
        <>
            <title>CityFix - Issues Details</title>
            <div className='py-[50px] md:py-[70px]'>
                <div className='container'>
                    <div className='max-w-[890px] mx-auto'>

                        <button onClick={() => navigate(-1)} className='flex items-center gap-1.5 text-[16px] font-medium text-[#65758B] dark:text-white'><FaArrowLeft /><span>Back</span></button>

                        <img className='h-[310px] sm:h-[380px] md:h-[470px] w-full object-cover rounded-lg md:rounded-2xl mt-5 md:mt-[30px] shadow-sm dark:shadow-white' src={issue.images} alt="" />
                        <div className='p-3 sm:p-5 bg-white dark:bg-gray-900 border border-[#E1E7EF] dark:border-white rounded-lg md:rounded-2xl mt-5 lg:mt-7'>
                            <div className='flex items-center gap-3 mt-1 sm:mt-2'>
                                <span className={`inline-block py-1 px-5 rounded-full text-[15px] font-medium capitalize ${issue.status === 'resolved' ? 'bg-[#E7F8F2] text-[#10B77F]' : issue.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>{issue.status}</span>
                                <span className={`inline-block py-1 px-5 rounded-full text-[15px] font-medium capitalize ${issue.isBoosted ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'}`}>{issue.isBoosted ? 'High' : 'Normal'}</span>                                    
                            </div>
                            <h2 className='text-[#141414] dark:text-white text-[24px] sm:text-[28px] md:text-[32px] font-bold mt-3'>{issue.title}</h2>
                            <p className='text-[#65758B] dark:text-[#9fb8df] text-[15px] pt-3 pb-3'>{issue.description}</p>
                            <div className='flex flex-col md:flex-row justify-between md:items-center gap-3 pb-2.5'>
                                <div className='flex flex-wrap gap-5 gap-y-1.5'>
                                    <p className='flex items-center gap-1.5 text-[16px] font-medium capitalize'><IoMdPricetags className='text-[16px] text-[#10B77F]' /><span>{issue.category}</span></p>
                                    <p className='flex items-center gap-1.5 text-[16px] font-medium'><FaLocationDot className='text-[16px] text-[#10B77F]' /><span>{issue.location}</span></p>
                                    <p className='flex items-center gap-1.5 text-[16px] font-medium'><FaUser className='text-[16px] text-[#10B77F]' /><span>{issue.organizer_name}</span></p>
                                </div>
                                <button
                                    onClick={() => {
                                        if (isBlocked) {
                                            toast.error('Your account is blocked. You cannot upvote.')
                                            return
                                        }
                                        handleUpvote(issue._id)
                                    }}
                                    className={`inline-flex self-start items-center gap-1.5 px-3.5 py-1 rounded-md border font-medium transition
                                    ${isBlocked
                                        ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                                        : issue.upvotedUsers?.includes(user?.email)
                                            ? 'bg-[#219E64] text-white border-[#219E64]'
                                            : 'bg-gray-100 text-[#141414] border-gray-300 hover:bg-gray-200'
                                    }`}>
                                    <BiLike
                                        className={`${isBlocked
                                            ? 'text-gray-400'
                                            : issue.upvotedUsers?.includes(user?.email)
                                                ? 'text-white'
                                                : 'text-[#141414]'
                                        }`}
                                    />
                                    <span>{issue.upvotes}</span>
                                </button>

                            </div>

                            {isOwner && (
                                <div className='dark:border-white flex justify-between items-center pt-3 border-t border-[#219E64]'>
                                    <div className='hidden sm:block'></div>
                                    <div className='flex flex-wrap items-center gap-2.5'>

                                        {/* <button
                                            onClick={() => {
                                                if (isBlocked) {
                                                    toast.error('Your account is blocked. You cannot boost issues.')
                                                    return
                                                }
                                            }}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-white font-semibold transition
                                                ${isBlocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F43098] hover:bg-[#c70e71]'}
                                            `}>
                                            <RiMoneyDollarCircleLine />
                                            <span>Boost Now</span>
                                        </button> */}
                                        <button
                                            onClick={() => handleBoost(issue._id)}
                                            disabled={issue.isBoosted || isBlocked}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-white font-semibold transition
                                                ${issue.isBoosted ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F43098] hover:bg-[#c70e71]'}
                                            `}>
                                            <RiMoneyDollarCircleLine />
                                            {issue.isBoosted ? 'Boosted' : 'Boost Now'}
                                        </button>


                                        <button
                                            onClick={() => {
                                                if (isBlocked) {
                                                    toast.error('Your account is blocked. You cannot update issues.');
                                                    return;
                                                }
                                                openModal(issue);
                                            }}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 font-semibold transition
                                                ${isBlocked ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-300 text-[#141414]'}
                                            `}>
                                            <FaRegEdit size={16} />
                                            <span>Update</span>
                                        </button>


                                        <button
                                            onClick={() => {
                                                if (isBlocked) {
                                                    toast.error('Your account is blocked. You cannot delete issues.');
                                                    return;
                                                }
                                                handleDelete(issue._id);
                                            }}
                                            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4.5 py-2 rounded-md text-[15px] font-semibold transition
                                                ${isBlocked ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-red-600 hover:bg-red-500 text-white'}
                                            `}>
                                            <RiDeleteBinLine size={16} />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {issue?.assignedStaff && (
                        <div className='p-3 sm:p-5 bg-white dark:bg-gray-900 border border-[#E1E7EF] dark:border-white rounded-lg md:rounded-2xl mt-5 lg:mt-7'>
                            <h2 className='text-[24px] md:text-[28px] lg:text-[30px] font-bold'>Assigned Staff</h2>
                            <div className='mt-4 mb-3 flex items-center gap-3'>
                                <img src="https://i.ibb.co/rGTj1KFX/profile2.png" className='h-14 w-14 rounded-full object-cover' alt="" />
                                <div>
                                    <h3 className='text-[20px] font-semibold'>{issue.assignedStaff.name || 'Mr. Staff'}</h3>
                                    <p className='text-[14px] font-medium'>Staff</p>
                                </div>
                            </div>
                            <p className='flex items-center gap-1.5 text-[16px] font-medium'><MdEmail className='text-[17px] text-[#10B77F]' /><span>{issue.assignedStaff.email || 'staff@cityfix.com'}</span></p>
                        </div>
                        )}

                        <div className='p-3 sm:p-5 bg-white dark:bg-gray-900 border border-[#E1E7EF] dark:border-white rounded-lg md:rounded-2xl mt-5 lg:mt-7'>
                            <h2 className='text-[24px] md:text-[28px] lg:text-[30px] font-bold mb-6'>Issue Timeline </h2>
                            <div className='relative border-l-2 border-[#10B77F] pl-6 space-y-6'>
                                {[...(issue.timeline || [])]
                                    .slice()
                                    .reverse()
                                    .map((item, index) => (
                                        <div key={index} className='relative'>
                                            <span className='absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-[#10B77F]'></span>
                                            <div className='bg-[#FBFCFB] dark:bg-gray-800 border border-[#E1E7EF] dark:border-gray-700 rounded-lg p-4'>
                                                <div className='flex flex-wrap items-center gap-3 mb-1'>
                                                    <span className={`px-3 py-0.5 rounded-full text-[14px] font-medium capitalize ${item.status === 'resolved' ? 'bg-[#E7F8F2] text-[#10B77F]' : item.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>{item.status}</span>
                                                    <span className='text-[14px] text-[#65758B] dark:text-gray-400'>{new Date(item.timestamp).toLocaleString()}</span>
                                                </div>
                                                <p className='text-[15px] font-medium text-[#141414] dark:text-white'>{item.message}</p>
                                                <p className='text-[14px] text-[#65758B] dark:text-gray-400 mt-1'>Updated by: {item.updatedBy?.name} ({item.updatedBy?.role})</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
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

export default IssuesDetails;