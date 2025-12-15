import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { Link } from 'react-router';
import { IoMdCloseCircle } from 'react-icons/io';
import { useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllIssues = () => {
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const limit = 9;

    const [selectedIssue, setSelectedIssue] = useState(null)
    const [selectedStaff, setSelectedStaff] = useState('')

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allIssues', page],
        queryFn: async () => {
            const res = await axiosSecure.get('/issues', {
                params: { page, limit }
            });
            return res.data;
        },
        keepPreviousData: true
    });

    const { data: staffs = [] } = useQuery({
        queryKey: ['staffs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/staff')
            return res.data
        },
        enabled: !!selectedIssue
    })

    const handleAssignStaff = async () => {
        if (!selectedStaff) return

        try {
            await axiosSecure.patch(
                `/issues/${selectedIssue._id}/assign-staff`,
                { staffId: selectedStaff }
            )

            toast.success('Staff assigned successfully!')

            setSelectedStaff('')
            setSelectedIssue(null)
            refetch()
            document.getElementById('assign_modal').close()
        } catch (error) {
            toast.error('Failed to assign staff')
            console.error(error)
        }
    }

    if (isLoading) {
        return <div className="flex justify-center items-center h-[60vh]">
                <PuffLoader color="#219E64" size={60} />
            </div>;
    }

    const { issues = [], totalPages = 1, total = 0 } = data;

    return (
        <>
            <title>CityFix - Dashboard All Issues</title>

            <div className="px-3 py-12 max-w-[1500px] mx-auto">
                <h2 className='text-[30px] md:text-[34px] lg:text-[40px] font-bold'>All Issues ({total})</h2>
                <p className='text-[#6D7873] dark:text-[#E7F8F2] text-[16px]'>Manage and assign reported issues to staff.</p>

                <div className="border border-[#219e64] rounded-xl overflow-x-scroll mt-5 md:mt-8">
                    <table className="w-full min-w-[1450px] text-sm">
                        <thead className="bg-gray-50 dark:bg-[#101828]">
                            <tr className="text-left">
                                <th className="p-4">Issue</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Priority</th>
                                <th className="p-4">Assigned To</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {issues.map(issue => (
                                <tr key={issue._id} className="border-t border-[#219e64]">
                                    <td className="p-4 font-medium flex items-center gap-2">
                                        {issue.isBoosted && <span className="text-red-500">⚡</span>}
                                        {issue.title}
                                    </td>
                                    <td className="p-4 capitalize">{issue.category}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs capitalize
                                            ${issue.status === 'resolved' && 'bg-green-100 text-green-700'}
                                            ${issue.status === 'pending' && 'bg-orange-100 text-orange-700'}
                                            ${issue.status === 'in-progress' && 'bg-blue-100 text-blue-700'}
                                            ${issue.status === 'closed' && 'bg-gray-100 text-gray-600'}`}>
                                            {issue.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 capitalize rounded-full text-xs
                                            ${issue.isBoosted ? 'bg-red-100 text-red-600' : 'bg-sky-100 text-sky-600'}`}>
                                            {issue.isBoosted ? 'high' : 'normal'}
                                        </span>
                                    </td>
                                    <td className="p-4">{issue.assignedStaff?.name || issue.assignedStaff}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Link to={`/issue-details/${issue._id}`} className="px-2.5 py-1.5 text-[16px] font-medium bg-[#219E64] hover:bg-[#168652] text-white transition rounded">
                                                <FaEye />
                                            </Link>

                                            {!issue.assignedStaff && issue.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => { setSelectedIssue(issue); document.getElementById('assign_modal').showModal() }}
                                                        className="px-2.5 py-1.5 text-[15px] rounded-md border border-gray-300 text-[#141414] font-semibold bg-gray-100 hover:bg-gray-300 transition"
                                                    >
                                                        <FaUserCheck />
                                                    </button>
                                                    <button className="px-2.5 py-1.5 text-[16px] rounded-md bg-red-600 hover:bg-red-500 text-white font-semibold transition">
                                                        <IoMdCloseCircle />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className='flex justify-center items-center gap-3 mt-7 lg:mt-12'>
                    <button onClick={() => setPage(p => p - 1)} disabled={page === 1} className='px-4 py-2 bg-[#219E64] rounded disabled:bg-gray-100 disabled:border-gray-300 disabled:border text-white disabled:text-[#141414]'>Previous</button>
                    <span className='font-medium'>Page {page} of {totalPages}</span>
                    <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages} className='px-4 py-2 bg-[#219E64] rounded disabled:bg-gray-100 disabled:border-gray-300 disabled:border text-white disabled:text-[#141414]'>Next</button>
                </div>
            </div>

            {/* DaisyUI <dialog> modal */}
            <dialog id="assign_modal" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box flex flex-col gap-4">
                    <h3 className="font-bold text-lg">Assign Staff</h3>
                    <select
                        value={selectedStaff}
                        onChange={e => setSelectedStaff(e.target.value)}
                        className="w-full form-input"
                    >
                        <option value="">Select staff</option>
                        {staffs.map(staff => (
                            <option key={staff._id} value={staff._id}>{staff.name}</option>
                        ))}
                    </select>
                    <div className="modal-action">
                        <button
                            type="button"
                            onClick={() => document.getElementById('assign_modal').close()}
                            className="btn"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleAssignStaff}
                            className="btn btn-primary"
                            disabled={!selectedStaff}
                        >
                            Assign
                        </button>
                    </div>
                </form>
            </dialog>
        </>
    );
};

export default AllIssues;