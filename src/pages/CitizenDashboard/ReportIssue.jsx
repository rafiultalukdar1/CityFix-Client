import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const ReportIssue = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            let imageURL = null;
            if (data.photo && data.photo[0]) {
                const formData = new FormData();
                formData.append('image', data.photo[0]);
                const imgRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_KEY}`,
                    formData
                );
                imageURL = imgRes.data.data.display_url;
            }
            const issueData = {
                title: data.title,
                description: data.description,
                category: data.category,
                location: data.location,
                images: imageURL,
                priority: "normal",
                isBoosted: false,
                status: "pending",
                submittedBy: user?.uid || user?.email,
                assignedStaff: null,
                upvotes: 0,
                organizer_name: user?.displayName,
                organizer_email: user?.email,
                organizer_photo: user?.photoURL || null,
                timeline: [
                    {
                        status: "pending",
                        message: "Citizen reported an issue.",
                        updatedBy: {
                            name: user?.displayName,
                            role: "citizen"
                        },
                        timestamp: new Date().toISOString()
                    }
                ],
                createdAt: new Date().toISOString()
            };
            const res = await axiosSecure.post('/issues', issueData);
            if (res.data.insertedId) {
                toast.success('Issue reported successfully!');
                reset();
                navigate('/dashboard/my-issues');
            }
        } catch (error) {
            toast.error('Failed to submit report. Please try again.', error);
        }
    };

    return (
        <>
            <title>CityFix - Report Issue</title>
            <div className='px-3 pt-12'>
                <div className='max-w-[820px] mx-auto'>
                    <h2 className='text-center text-[32px] sm:text-[40px] lg:text-[50px] font-bold'> Create a new report </h2>
                    <p className='text-[#6D7873] dark:text-[#E7F8F2] text-[15px] text-center'> Report a public issue with details so it can be reviewed and resolved promptly. </p>

                    <div className='py-7 px-5 border border-[#CCCCCC] dark:bg-gray-900 rounded-2xl mt-5 lg:mt-8'>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <input {...register('title', { required: 'Title is required' })} placeholder="Title" className="form-input w-full" /> {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                            </div>
                            <div>
                                <textarea {...register('description', { required: 'Description is required' })} placeholder="Description" rows="5" className="form-input w-full" /> {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                            </div>
                            <div>
                                <select {...register('category', { required: 'Please select a category' })} className="form-input w-full">
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
                                </select> {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                            </div>
                            <div>
                                <input {...register('location', { required: 'Location is required' })} placeholder="Location" className="form-input w-full" /> {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                            </div>
                            <div>
                                <input type="file" accept="image/*" {...register('photo', { required: 'Image is required' })} className="form-input w-full" /> {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input value={user?.displayName || '' } disabled className="form-input w-full bg-gray-100 dark:bg-gray-800" />
                                <input value={user?.email || '' } disabled className="form-input w-full bg-gray-100 dark:bg-gray-800" />
                            </div>
                            <button type="submit" className="w-full bg-[#219E64] hover:bg-[#0c7e49] text-white py-3 rounded font-semibold"> Submit Report </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportIssue;
