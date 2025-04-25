import React, { useState } from 'react'
import { Container, LogoutBtn } from '../Index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
      {
        name: "Home",
        slug: "/",
        active: true,
      },
      {
        name: "Log In",
        slug: "/login",
        active: !authStatus,
      },
      {
        name: "Sign Up",
        slug: "/signup",
        active: !authStatus,
      },
      {
        name: "All Post",
        slug: "/all-posts",
        active: authStatus,
      },
      {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
      },
    ]

    const toggleMenu = () => {
      setMenuOpen(!menuOpen)
    }

    const handleNavigation = (slug) => {
      navigate(slug)
      setMenuOpen(false)
    }

    return (
      <header className='py-4 shadow bg-gray-400'>
        <Container>
          <nav className='flex flex-wrap justify-between items-center'>
            <div className='flex justify-between items-center w-full md:w-auto'>
              <Link to="/" className='text-3xl md:text-5xl font-bold'>
                <span className='text-red-600'>Blog</span> <span className='text-white'>App</span>
              </Link>
              <button 
                className='md:hidden p-2 focus:outline-none' 
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <ul className={`${menuOpen ? 'flex' : 'hidden'} flex-col md:flex md:flex-row w-full md:w-auto mt-4 md:mt-0 gap-2`}>
              {navItems.map((item, index) => (
                item.active ? 
                <li key={index} className="w-full md:w-auto">
                  <button 
                    className='w-full md:inline-block px-6 py-2 text-center hover:bg-blue-100 duration-300 rounded-full text-lg md:text-xl' 
                    onClick={() => handleNavigation(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
                : null
              ))}
              {authStatus && (
                <li className="w-full md:w-auto">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    )
}

export default Header