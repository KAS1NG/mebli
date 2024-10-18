'use client'
import React, { useState } from 'react';
import { IPost } from '../types/post';
import Image from 'next/image';
import '@/app/styles/editPost.scss'

interface PostCardProps {
    post: IPost;
}

const EditPost = ({ post }: PostCardProps) => {

    const [images, setImages] = useState(post.images)

    const deleteImg = (id: number) => {
        const filteredImages = images.filter((_, index) => index !== id);
        setImages(filteredImages)
    }

    return (
        <div className='postCard'>
            <h2 className='title'>{post.title}</h2>
            <div className='images'>
                {images.map((image, index) => (
                    <>
                        <Image
                            key={index}
                            src={image}
                            width={500}
                            height={500}
                            alt={`Image ${index + 1}`}
                        />
                        <div
                            className='imageDelete'
                            onClick={() => deleteImg(index)}
                        >
                            X</div>
                    </>
                ))}
            </div>
            <p className='description'>{post.description}</p>
            <p className='price'>Price: ${post.price}</p>
            <p className='tags'>Tags: {post.tags}</p>
        </div>
    );
};

export default EditPost;
