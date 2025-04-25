import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authReducer'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate('/login');
    })
  }
  
  return (
    <button 
      className='w-full md:w-auto inline-block px-4 md:px-6 py-2 text-center hover:bg-blue-100 duration-300 rounded-full text-base md:text-xl' 
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn