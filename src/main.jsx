import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthLayout } from './components/Index.js'
import Home from './pages/Home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthLayout authentication={false}><Login /></AuthLayout>} /> 
        <Route path="/signup" element={<AuthLayout authentication={false}><Signup /></AuthLayout>} />
        <Route path="/all-posts" element={<AuthLayout authentication><AllPosts /></AuthLayout>} />
        <Route path="/add-post" element={<AuthLayout authentication><AddPost /></AuthLayout>} />
        <Route path="/edit-post/:slug" element={<AuthLayout authentication><EditPost /></AuthLayout>} />
        <Route path="/post/:slug" element={<Post />} />
      </Routes>
    </BrowserRouter>
  </Provider>
)
