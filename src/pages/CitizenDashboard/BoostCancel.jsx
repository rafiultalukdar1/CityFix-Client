import React from 'react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';

const BoostCancel = () => {

    toast.error("Boost payment was cancelled!");

    return (
        <div className="text-center py-20">
            <h2 className="text-xl font-semibold">Boost Payment Cancelled</h2>
            <p className="text-gray-500 mt-2">Your boost payment was not completed.</p>
            <Link 
                to="/dashboard/my-issues" 
                className="mt-4 inline-block px-4 py-2 bg-[#219E64] hover:bg-[#0c7e49] text-white rounded"
            >
                Go to My Issues
            </Link>
        </div>
    );
};

export default BoostCancel;