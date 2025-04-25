import React from 'react'
import {Login as LogInComponent} from '../components/Login'

const Login = () => {
  return (
    <div className='w-full min-h-screen px-4 py-8 flex items-center justify-center'>
      <div className='w-full max-w-md'>
        <LogInComponent/>
      </div>
    </div>
  )
}

export default Login