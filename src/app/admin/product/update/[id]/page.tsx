import { fetchOnePost } from '@/app/api/post/postService';
import EditPost from '@/app/components/EditPost';
import { notFound } from 'next/navigation';
import React from 'react'

async function page({ params }: { params: { id: string } }) {

    const {id} = params;

    const product = await fetchOnePost(id)

    // If the product is not found, show the 404 page
    if (!product || !product.id) {
        notFound();
        return; // Ensure the function exits after showing the 404 page
    }

    return (
        <div>
            <EditPost post={product} />
        </div>
    )
}

export default page