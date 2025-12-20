import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { PuffLoader } from 'react-spinners';
import { FiDownload } from 'react-icons/fi';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from '../InvoicePDF/InvoicePDF';

const Payments = () => {
    const axiosSecure = useAxiosSecure();
    const [typeFilter, setTypeFilter] = useState("");

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['adminAllPayments', typeFilter],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin-all-payments${typeFilter ? `?type=${typeFilter}` : ''}`);
            return res.data;
        },
        keepPreviousData: true
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <PuffLoader size={60} />
            </div>
        );
    }

    return (
        <>
            <title>CityFix - Payments</title>
            <div className="px-3 py-12 max-w-[1600px] mx-auto">
                <h2 className="text-[30px] md:text-[34px] lg:text-[40px] font-bold">Payments</h2>
                <p className="text-[#6D7873] dark:text-[#E7F8F2] text-[16px]">View all payment transactions.</p>

                <div className="mt-6 lg:mt-9 max-w-[370px]">
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="form-input border rounded px-3 py-2" >
                        <option value="">All Payments</option>
                        <option value="Boost Payment">Boost Payment</option>
                        <option value="Premium Subscription">Premium Subscription</option>
                    </select>
                </div>

                <div className='border border-[#219e64] rounded-xl overflow-x-scroll mt-3 md:mt-5 bg-[#FBFCFB]'>
                    <table className="w-full min-w-[1400px] text-[16px]">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr className="text-left">
                                <th className="p-4">User Email</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className='text-[14px]'>
                            {payments.map((payment) => (
                                <tr
                                    key={payment._id} className="border-t border-[#219e64] dark:bg-[#1D232A]" >
                                    <td className="p-4">{payment.userEmail}</td>
                                    <td className={`p-4 font-medium ${payment.type === "Boost Payment" ? "text-purple-600" : payment.type === "Premium Subscription" ? "text-orange-500" : "text-gray-600"}`}>{payment.type}</td>
                                    <td className="p-4 text-[#219E64] capitalize font-medium">{payment.payment_status}</td>
                                    <td className="p-4">{new Date(payment.paidAt).toLocaleDateString()}</td>
                                    <td className="p-4">৳ {(payment.amount * 127.15).toFixed(1)}</td>
                                    {/* <td className="p-4"><button className='flex items-center gap-2 uppercase font-medium bg-gray-100 hover:bg-gray-300 text-[#141414] border border-gray-300 py-0.5 px-2.5 rounded'><FiDownload /><span>pdf</span></button></td> */}
                                    <td className="p-4">
                                    <PDFDownloadLink
                                        document={<InvoicePDF payment={payment} />}
                                        fileName={`invoice_${payment.transactionId}.pdf`}
                                        className='inline-flex items-center gap-2 uppercase font-medium bg-gray-100 hover:bg-gray-300 text-[#141414] border border-gray-300 py-0.5 px-2.5 rounded cursor-pointer'
                                    >
                                        {({ loading }) => (loading ? 'Loading...' : <><FiDownload /><span>PDF</span></>)}
                                    </PDFDownloadLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Payments;