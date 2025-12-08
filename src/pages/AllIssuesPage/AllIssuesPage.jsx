import React from 'react';

const AllIssuesPage = () => {
    return (
        <>
            <div className='py-[55px] md:py-[70px] lg:py-[105px]'>
                <div className='container mx-auto'>
                    <h2 className='leading-[1.2] text-[30px] sm:text-[40px] lg:text-[50px] font-bold text-center'>All Reported <span className='bg-linear-to-r from-[#10B77F] to-[#35E2A4] bg-clip-text text-transparent'>Issues</span></h2>
                    <p className='text-[16px] md:text-[18px] font-medium text-[#6D7873] text-center max-w-[620px] mx-auto pt-1.5'>Browse and upvote issues reported by citizens in your community.</p>
                </div>
            </div>
        </>
    );
};

export default AllIssuesPage;