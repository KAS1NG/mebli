import { fetchOnePost } from '@/app/api/post/postService';
import EditPost from '@/app/components/EditPost';
import { notFound } from 'next/navigation';
import React from 'react';

type Params = { id: string };

export default async function Page({ params }: { params: Promise<Params>; }) {
    const { id } = await params

    const product = await fetchOnePost(id);

    if (!product?.id) {
        notFound();
    }

    return (
        <div>
            <EditPost postItem={product} />
        </div>
    );
}

// (необов'язково) якщо є generateMetadata — теж await params
// import type { Metadata } from 'next';
// export async function generateMetadata(
//   { params }: { params: Promise<Params> }
// ): Promise<Metadata> {
//   const { id } = await params;
//   return { title: `Редагування поста ${id}` };
// }
