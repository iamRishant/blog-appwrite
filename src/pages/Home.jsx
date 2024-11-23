import React, {useEffect, useState} from 'react'
import service from '../appwrite/db'

import { Container } from '../components/Index'
import PostCard from '../components/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../appwrite/auth'
import { login } from '../store/authReducer'


function Home() {
    const [posts, setPosts] = useState([])
    const userData=useSelector((state)=>state.auth.userData);

    if(userData===undefined) window.location.reload(false)



    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {userData ? "Add a blog":"Login to see blog"}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home