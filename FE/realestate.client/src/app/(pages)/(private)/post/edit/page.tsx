'use client';
import React from 'react'
import PaymentForm from '../components/payment-form'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import isAuth from '@/app/isAuth';
import { UserType } from '@/shared/consts/userType';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const WatchEditForm = dynamic(() => import('../components/watch-edit-form'), { ssr: false });

const EditPage = () => {
  //pageType = [1: watch, 2: edit]
  const [pageType, setPageType] = useState<any>();
  const [postId, setPostId] = useState<any>();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    searchParams.forEach((value, key) => {
      if (key === 'role' && value === UserType.ADMIN.toString()) {
        setPageType(1);
      }
      else if (key === 'role' && value === UserType.CUSTOMER.toString()) {
        setPageType(2);
      }
      else if (key === 'postId') {
        setPostId(value);
      }
    });
  });
  
  return (
    <div>
      {/* <PaymentForm/> */}
      <><WatchEditForm type={pageType} postId={postId}/></>
    </div>
  )
}

export default isAuth(EditPage, [UserType.ADMIN, UserType.CUSTOMER]);
