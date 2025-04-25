import React, {useEffect, useState} from 'react'
import { Container } from '../components/Index';
import PostForm from '../components/post-form/PostForm';
import service from '../appwrite/db';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            setLoading(true)
            service.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post)
                    } else {
                        setError("Post not found")
                        setTimeout(() => navigate('/'), 2000)
                    }
                })
                .catch(err => {
                    console.error("Error fetching post:", err)
                    setError("Failed to load post")
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return (
        <div className="w-full min-h-screen py-4 md:py-8">
            <Container>
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <p className="text-gray-500">Loading post...</p>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-32">
                        <p className="text-red-500">{error}</p>
                    </div>
                ) : post ? (
                    <div className="w-full px-2 md:px-0 md:w-3/4 lg:w-2/3 mx-auto">
                        <h1 className="text-2xl md:text-3xl font-bold mb-6">
                            Edit Post
                        </h1>
                        <PostForm post={post} />
                    </div>
                ) : null}
            </Container>
        </div>
    )
}

export default EditPost