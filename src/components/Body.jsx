import React, { useEffect } from 'react'

import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import Navebar from './navebar'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constant'
import { Toaster } from 'react-hot-toast'

function Body() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const patchUser =async()=>{
    try {
      const getProfile= await axios.get(`${BASE_URL}/profile`,{
        withCredentials:true
      })
      dispatch(loginUser(getProfile.data.data));
      
    } catch (error) {
      if(error.status === 401){
        navigate("/login")
      }
      
    }
  
  }
  useEffect(() => {
    patchUser();
  }, [])
  
  return (
    <div>
        <Navebar/>
        <Toaster />
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body