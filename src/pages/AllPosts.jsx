import React, { useEffect, useState } from 'react'
import service from '../appwrite/db'
import PostCard from '../components/PostCard'
import { Container } from '../components/Index'

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        service.getPosts([]).then((post) => {
            if (post) {
                setPosts(post.documents);
            }
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching posts:", error);
            setLoading(false);
        });
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                {loading ? (
                    <div className='flex justify-center items-center h-32'>
                        <p className='text-gray-500'>Loading posts...</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className='flex justify-center items-center h-32'>
                        <p className='text-gray-500'>No posts found</p>
                    </div>
                ) : (
                    <div className='flex flex-wrap -mx-2'>
                        {posts.map((post) => (
                            <div 
                                key={post.$id} 
                                className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'
                            >
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts