import React, { useEffect, useState } from 'react'
import service from '../appwrite/db'
import PostCard from '../components/PostCard'
import { Container } from '../components/Index'
const AllPosts = () => {
    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        service.getPosts([]).then((post)=>{
            if(post){
                // console.log(post);
                
                setPosts(post.documents);
            }
        })
    },[])

  return (
    <div className='w-full py-8'>
    <Container>
        <div className='flex flex-wrap'>
        {
            posts.map((post,index)=>{
                return <div key={post.$id} className='p-2 w-1/4'>
                <PostCard {...post}/>
                </div>
            })
        }

        </div>
    </Container>
      
    </div>
  )
}

export default AllPosts
