import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { PuffLoader } from 'react-spinners';

const ReportIssue = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showSubscribe, setShowSubscribe] = useState(false);

  const { data: userInfo, isLoading: userLoading } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
    enabled: !!user
  });

  const { data: userIssues = [], isLoading: issuesLoading } = useQuery({
    queryKey: ['userIssues', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues?submittedBy=${user?.email}`);
      return res.data.issues || [];
    },
    enabled: !!user && !!userInfo
  });

  const loading = userLoading || issuesLoading;
  const userIssuesCount = Array.isArray(userIssues) ? userIssues.length : 0;
  const isPremium = userInfo?.isPremium || false;
  const isBlocked = userInfo?.isBlocked || false;
  const formDisabled = isBlocked || (!isPremium && userIssuesCount >= 3);

  const onSubmit = async (data) => {
    if (formDisabled) return;

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
        submittedBy: user.email,
        assignedStaff: null,
        upvotes: 0,
        organizer_name: user.displayName,
        organizer_email: user.email,
        organizer_photo: user.photoURL || null,
        timeline: [
          {
            status: "pending",
            message: "Citizen reported an issue.",
            updatedBy: {
              name: user.displayName,
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
      if (error.response?.status === 403) {
        toast.error(error.response.data.message);
        setShowSubscribe(true);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to submit report. Please try again.');
      }
      console.log(error);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-[60vh]"><PuffLoader color="#219E64" size={60} /></div>;

  return (
    <>
        <title>CityFix - Report Issue</title>
        <div className='px-3 py-12'>
            <div className='max-w-[820px] mx-auto'>
                <h2 className='text-center text-[32px] sm:text-[40px] lg:text-[50px] font-bold'>Create a new report</h2>
                <p className='text-[#6D7873] dark:text-[#E7F8F2] text-[16px] text-center'>
                Report a public issue with details so it can be reviewed and resolved promptly.
                </p>

                {isBlocked && <p className="text-red-500 text-center font-semibold my-4">Your account is blocked. Contact authorities for support.</p>}

                {(!isPremium && userIssuesCount >= 3) && (
                  <div className="text-center my-4">
                      <p className="text-red-500 font-semibold mb-2">Free users can submit only 3 issues.</p>
                      <button className="bg-orange-600 hover:bg-orange-500 font-semibold text-white py-2 px-4 rounded" onClick={() => navigate('/dashboard/my-profile')}>Subscribe Now</button>
                  </div>
                )}

                {showSubscribe && (
                <div className="text-center my-4">
                    <p className="text-red-500 font-semibold mb-2">Free users can submit only 3 issues.</p>
                    <button className="bg-orange-600 hover:bg-orange-500 font-semibold text-white py-2 px-4 rounded" onClick={() => navigate('/dashboard/my-profile')}>Subscribe Now</button>
                </div>
                )}

                <div className='py-7 px-5 border border-[#CCCCCC] dark:bg-gray-900 rounded-2xl mt-5 lg:mt-8'>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input {...register('title', { required: 'Title is required' })} placeholder="Title" className="form-input w-full" disabled={formDisabled} />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

                    <textarea {...register('description', { required: 'Description is required' })} placeholder="Description" rows="5" className="form-input w-full" disabled={formDisabled} />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

                    <select {...register('category', { required: 'Please select a category' })} className="form-input w-full" disabled={formDisabled}>
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
                    </select>
                    {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

                    <input {...register('location', { required: 'Location is required' })} placeholder="Location" className="form-input w-full" disabled={formDisabled} />
                    {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

                    <input type="file" accept="image/*" {...register('photo', { required: 'Image is required' })} className="form-input w-full cursor-pointer" disabled={formDisabled} />
                    {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input value={user?.displayName || ''} disabled className="form-input w-full bg-gray-100 dark:bg-gray-800" />
                      <input value={user?.email || ''} disabled className="form-input w-full bg-gray-100 dark:bg-gray-800" />
                    </div>

                    <button type="submit" className="w-full bg-[#219E64] hover:bg-[#0c7e49] text-white py-3 rounded font-semibold" disabled={formDisabled}>
                    Submit Report
                    </button>
                </form>
                </div>
            </div>
        </div>
    </>
  );
};

export default ReportIssue;
