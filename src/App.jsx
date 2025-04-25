import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login,logout } from './store/authReducer';
import { Outlet, Routes } from 'react-router-dom';
import { Footer, Header } from './components/Index';

const App = () => {
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();

  useEffect(()=>{
    // here we will req service and check if we have a user or not

    authService.getCurrentUser()
    .then((userData)=>{
        if(userData){
          // agar user hai then apne reducer ko update krr denge jo aage jaake store me update krr dega
          dispatch(login({userData}))
        }
        else{
          // nhi to simply state update krr denge logout call krke
          dispatch(logout());
        }
    })
    .finally(()=>setLoading(false))
  },[])


  return loading ? <div>Loading...</div>:
  <div className=''>
    <div className=''>
      <Header/>
      <main>
      <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>
}

export default App
