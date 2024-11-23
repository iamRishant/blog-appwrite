import React from 'react'
import service from '../appwrite/db'
import { Link } from 'react-router-dom'

// yha $id isiliye liye coz yhi iska naam hai app write id issi variable me deta hai
const PostCard = ({$id,title,featuredImage}) => {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full rounded-xl bg-gray-100 p-4'>
            <div className='w-full justify-center'>
                <img className='rounded-xl' src={service.getFilePreview(featuredImage)} alt={title} />
                {/* we have to pass id to get image preview and or post card $id is the id and image is featuredimage itself */}
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
