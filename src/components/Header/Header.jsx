import React from 'react'
import { Container,LogoutBtn, RTE } from '../Index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import Input from '../Input'
import Login from '../Login'
import PostForm from '../post-form/PostForm'

const Header = () => {
    const authStatus=useSelector((state)=>state.auth.status);
    const navigate=useNavigate();

    const navItems=[
      {
        name:"Home",
        slug:"/",
        active:true,
      },
      {
        name:"Log In",
        slug:"/login",
        active:!authStatus,
      },
      {
        name:"Sign Up",
        slug:"/signup",
        active:!authStatus,
      },
      {
        name:"All Post",
        slug:"/all-posts",
        active:authStatus,
      },
      {
        name:"Add Post",
        slug:"/add-post",
        active:authStatus,
      },
    ]
  return (
    <header className='py-4 shadow bg-gray-400'>
      <Container>
        <nav className='flex justify-between items-center'>
        <div className='mr-4'>
          <Link to="/" className='text-5xl font-bold'><span className='text-red-600'>Blog</span> <span className='text-white'>App</span></Link>
        </div>
        <ul className='flex'>
          {
            navItems.map((item,index)=>(
              item.active ? 
              <li key={index}>
                <button className='inline-block px-6 py-2 hover:bg-blue-100 duration-300 rounded-full text-xl' onClick={()=>navigate(item.slug)}>{item.name}</button>
              </li>
              :null
            ))
          }
          <li>
            {authStatus && <LogoutBtn/>}
          </li>
          
          
        </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
