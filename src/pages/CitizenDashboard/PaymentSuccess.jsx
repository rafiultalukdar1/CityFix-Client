import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaCheckSquare } from 'react-icons/fa';

const PaymentSuccess = ({ refetchProfile }) => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!sessionId) return;

        const fetchPayment = async () => {
            try {
                const res = await axiosSecure.post('/payment-success', { stripeSessionId: sessionId });

                if (res.data.success && res.data.paymentRecord) {
                    const payment = res.data.paymentRecord;
                    setPaymentInfo({
                        transactionId: payment.transactionId,
                        amount: payment.amount,
                        currency: payment.currency,
                        paidAt: payment.paidAt
                    });
                    if (refetchProfile) refetchProfile();
                } else {
                    setError(res.data.message || "Payment not successful.");
                }
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchPayment();
    }, [sessionId, axiosSecure, refetchProfile]);

    if (loading) return <p className='text-center py-10'>Loading payment details...</p>;
    if (error) return <p className='text-center py-10 text-red-500'>{error}</p>;

    return (
        <div className='max-w-[1550px] mx-auto py-[30px] md:py-[55px] px-[15px]'>
            <h2 className='text-3xl font-bold mb-5 flex items-center gap-2.5'>Payment Success <FaCheckSquare className='text-[#219E64]'/></h2>

            {paymentInfo && (
                <div className='bg-gray-100 p-5 rounded-md space-y-2'>
                    <p><strong>Amount Paid:</strong> {paymentInfo.amount} {paymentInfo.currency?.toUpperCase()}</p>
                    <p><strong>Transaction ID:</strong> {paymentInfo.transactionId}</p>
                    <p><strong>Paid At:</strong> {new Date(paymentInfo.paidAt).toLocaleString()}</p>
                </div>
            )}

            <Link to='/dashboard/my-profile' className='btn mt-5 bg-[#219E64] hover:bg-[#0c7e49] text-white'>Back to Profile</Link>
        </div>
    );
};

export default PaymentSuccess;
