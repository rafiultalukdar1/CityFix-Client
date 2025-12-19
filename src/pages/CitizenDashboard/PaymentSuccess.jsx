import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentSuccess = ({ refetchProfile }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState(null);

    useEffect(() => {
        if (!sessionId) return;

        const fetchPayment = async () => {
            try {
                const res = await axiosSecure.post('/payment-success', { stripeSessionId: sessionId });

                if (res.data.success) {
                    setPaymentInfo(res.data);
                    if (refetchProfile) refetchProfile();
                } else {
                    setError(res.data.message || "Payment failed");
                }
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchPayment();
    }, [sessionId, axiosSecure, refetchProfile]);

    if (loading) return <p className="text-center py-20">Processing payment...</p>;
    if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

    return (
        <div className="max-w-[800px] mx-auto py-20 px-4 text-center">
            <h2 className="text-3xl font-bold mb-5">Payment Success ✅</h2>
            {paymentInfo && (
                <div className="bg-gray-100 p-5 rounded-md mb-5 space-y-2">
                    <p><strong>Amount Paid:</strong> {paymentInfo.amount} {paymentInfo.currency?.toUpperCase()}</p>
                    <p><strong>Status:</strong> Success</p>
                </div>
            )}
            <Link to="/dashboard/my-profile" className="btn bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Back to Profile
            </Link>
        </div>
    );
};

export default PaymentSuccess;
