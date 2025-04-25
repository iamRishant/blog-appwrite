import React from 'react'
import service from '../appwrite/db'
import { Link } from 'react-router-dom'

const PostCard = ({$id, title, featuredImage}) => {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full rounded-xl bg-gray-100 p-4 h-full'>
            <div className='w-full justify-center mb-4'>
                <img 
                    className='rounded-xl w-full object-cover h-48' 
                    src={service.getFilePreview(featuredImage)} 
                    alt={title} 
                />
            </div>
            <h2 className='text-xl font-bold line-clamp-2'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard