import React from 'react'
import { Container } from '../components/Index'
import PostForm from '../components/post-form/PostForm'
import { useSelector } from 'react-redux'

const AddPost = () => {
  const userData = useSelector((state) => state.auth.userData);
  
  return (
    <div className='py-4 sm:py-6 md:py-8 px-4 sm:px-0'>
      <Container>
        {userData ? (
          <PostForm />
        ) : (
          <div className="flex justify-center items-center min-h-[50vh]">
            <h1 className="text-xl sm:text-2xl font-medium text-gray-700">Loading ...</h1>
          </div>
        )}
      </Container>
    </div>
  )
}

export default AddPost