import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import {  logoutUser } from '../utils/userSlice';

function Navebar() {
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
const handleLogout = async () =>{
  try {
     await axios.post(`${BASE_URL}/logout`,{},{
      withCredentials: true
    })
    dispatch(logoutUser())
    nevigate("/login")
    
  } catch (error) {
    console.log(error.message);
    
  }
}
  
  return (
    <div className="navbar bg-base-300 shadow-sm">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl">DevTender</Link>
    </div>
    <div className="flex gap-2  items-center">
      <div>
        <p>{user?.firstname}</p>
      </div>
      <div className="dropdown dropdown-end mx-5">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li>
         <a onClick={()=>handleLogout()}>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Navebar