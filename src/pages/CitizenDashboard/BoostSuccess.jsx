import React, { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaCheckSquare } from 'react-icons/fa';
import { toast } from 'react-toastify';

const BoostSuccess = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState(null);

    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (!sessionId || fetchedRef.current) return;

        const fetchBoostStatus = async () => {
            try {
                const res = await axiosSecure.post('/boost-success', { stripeSessionId: sessionId });

                if (res.data?.success && res.data.paymentRecord) {
                    setPaymentInfo(res.data.paymentRecord);
                    setError(null); // clear any previous error
                } else {
                    setError(res.data?.message || "Boost success failed");
                }
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Boost success failed");
            } finally {
                fetchedRef.current = true;
                setLoading(false);
            }
        };

        fetchBoostStatus();
    }, [sessionId, axiosSecure]);

    useEffect(() => {
        if (paymentInfo) toast.success("Issue boosted successfully!");
    }, [paymentInfo]);

    if (loading) return <p className='text-center py-10'>Processing boost payment...</p>;
    if (error && !paymentInfo) return <p className='text-center py-10 text-red-500'>{error}</p>;

    return (
        <div className='max-w-[1550px] mx-auto py-[30px] md:py-[55px] px-[15px]'>
            <h2 className='text-3xl font-bold mb-5 flex items-center gap-2.5'>
                Boost Success <FaCheckSquare className='text-[#219E64]'/>
            </h2>

            {paymentInfo ? (
                <div className='bg-gray-100 p-5 rounded-md space-y-2'>
                    <p><strong>Amount Paid:</strong> {paymentInfo.amount} {paymentInfo.currency?.toUpperCase()}</p>
                    <p><strong>Transaction ID:</strong> {paymentInfo.transactionId}</p>
                    <p><strong>Paid At:</strong> {new Date(paymentInfo.paidAt).toLocaleString()}</p>
                    <p><strong>Issue ID:</strong> {paymentInfo.issueId}</p>
                </div>
            ) : (
                <p className='text-center text-gray-600'>Payment info not available.</p>
            )}

            <Link to='/dashboard/my-issues' className='btn mt-5 bg-[#219E64] hover:bg-[#0c7e49] text-white'>
                Back to My Issues
            </Link>
        </div>
    );
};

export default BoostSuccess;
