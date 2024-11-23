import React, { useEffect } from 'react'
import { Container } from '../components/Index'
import PostForm from '../components/post-form/PostForm'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../appwrite/auth'
import { login } from '../store/authReducer'

const AddPost = () => {
  

  const userData=useSelector((state)=>state.auth.userData);
  // if(userData===undefined) window.location.reload(false)
  return (
    <div className='py-8'>
      <Container>
        {userData ?<PostForm/>:<h1>Loading ....</h1>}
      </Container>
    </div>
  )
}

export default AddPost
