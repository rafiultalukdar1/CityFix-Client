import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router'
import { useState } from 'react'
import { PuffLoader } from 'react-spinners';

const staffStatusOptions = ['in-progress', 'working', 'resolved', 'closed']


const AssignedIssues = () => {
    const axiosSecure = useAxiosSecure()
    const [statusFilter, setStatusFilter] = useState('')
    const [priorityFilter, setPriorityFilter] = useState('')

    const { data: issues = [], isLoading, refetch } = useQuery({
        queryKey: ['assigned-issues', statusFilter, priorityFilter],
        queryFn: async () => {
            const res = await axiosSecure.get('/assigned-issues')
            let data = res.data
            if (statusFilter) {
                data = data.filter(i => i.status === statusFilter)
            }
            if (priorityFilter) {
                data = data.filter(i =>
                    priorityFilter === 'high' ? i.isBoosted : !i.isBoosted
                )
            }
            return data
        }
    })

    const handleStatusChange = async (id, status) => {
        await axiosSecure.patch(`/issues/${id}/status`, { status })
        refetch()
    }

    if (isLoading) return <div className="flex justify-center items-center h-[60vh]"><PuffLoader color="#219E64" size={60} /></div>;

    return (
        <>
            <title>CityFix - Dashboard Assigned Issues</title>

            <div className="px-3 py-12 max-w-[1500px] mx-auto">
                <h2 className="text-[30px] md:text-[34px] lg:text-[40px] font-bold">Assigned Issues</h2>
                <p className="text-[#6D7873] dark:text-[#E7F8F2] text-[16px]">Manage and update status of your assigned tasks.</p>

                <div className="flex gap-2.5 mt-6 max-w-[650px]">
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="form-input">
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In-progress</option>
                        <option value="working">Working</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                    </select>

                    <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="form-input">
                        <option value="">All Priority</option>
                        <option value="high">High</option>
                        <option value="normal">Normal</option>
                    </select>
                </div>

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
                                            ${issue.status === 'working' && 'bg-purple-100 text-purple-700'}
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

                                    <td className="p-4">{issue.assignedStaff?.name}</td>

                                    <td className="p-4 text-center flex gap-2.5 items-center">
                                        {issue.status !== 'closed' && (
                                            <select onChange={e => handleStatusChange(issue._id, e.target.value)} defaultValue="" className="px-[15px] py-2 text-[#464545] text-[15px] outline-0 border border-[#219e648f] focus:border-[#219E64] bg-[#F3F3F3] rounded dark:text-[#F3F3F3] dark:bg-gray-900 dark:border-[#219E6480] dark:focus:border-[#219E64]" >
                                                <option value="" disabled> Change Status </option>
                                                {staffStatusOptions.map(s => (
                                                    <option key={s} value={s} disabled={s === issue.status} style={{ cursor: s === issue.status ? 'not-allowed' : 'pointer' }} >{s}</option>
                                                ))}
                                            </select>
                                        )}
                                        <Link to={`/issue-details/${issue._id}`} className="inline-flex items-center justify-center px-2.5 py-2 text-[18px] font-medium bg-[#219E64] hover:bg-[#168652] text-white transition rounded" ><FaEye /></Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {issues.length === 0 && (
                        <p className="text-center py-10 text-gray-500">
                            No assigned issues found
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default AssignedIssues;