'use client';
import isAuth from '@/app/isAuth';
import UserType from '@/shared/consts/userType';
import React from 'react';

interface WalletPageProps {
    // Add any props you need for the WalletPage component
}

const WalletPage: React.FC<WalletPageProps> = () => {
    // Add your component logic here

    return (
        <div>
            <p>trang chủ wallet!</p>
        </div>
    );
};

export default isAuth(WalletPage, [UserType.ADMIN, UserType.CUSTOMER]);