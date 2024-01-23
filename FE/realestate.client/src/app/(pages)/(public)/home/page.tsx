"use client"

import { increment } from '@/redux/slices/authSlice';
import { RootState, AppDispatch } from '@/redux/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const value = useSelector((state: RootState) => state.auth.value);
  const increment1 = () => {
    dispatch(increment())
  }
  return (
    <div>
      Home page
      <p>Counter Value: {value}</p>
      <button onClick={increment1}>Increase</button>
    </div>
  )
}

export default HomePage
