import React from 'react'
import {Signup as SignUpComponent} from '../components/Signup';

const Signup = () => {
  return (
    <div className='w-full min-h-screen px-4 py-8 flex items-center justify-center'>
      <div className='w-full max-w-md'>
        <SignUpComponent/>
      </div>
    </div>
  )
}

export default Signup