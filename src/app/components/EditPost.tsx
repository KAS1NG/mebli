'use client'
import React, { useState } from 'react';
import { IPost } from '../types/post';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import '@/app/styles/editPost.scss'
import { editPost } from '../actions/editPost';
import { useSession } from 'next-auth/react';
import { transliterateAndClear } from '../utils/clearUrlString';
import FileUploadIcon from '../utils/FileUploadIcon';
import CustomSubmitBtn from '../utils/CustomSubmitBtn';

interface PostCardProps {
    postItem: IPost;
}

type Post = {
    title: string;
    description: string;
    price: number;
    tags: string;
    images: string[];
};

const EditPost = ({ postItem }: PostCardProps) => {

    const { data: session } = useSession();
    const { accessToken } = session || {};

    const router = useRouter();

    const [post, setPost] = useState<Post>({
        title: postItem.title,
        description: postItem.description,
        price: postItem.price,
        tags: postItem.tags,
        images: postItem.images,
    });

    const [deletedImg, setDeletedImg] = useState('')
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleEdit = (e: React.FormEvent<HTMLParagraphElement | HTMLHeadingElement>, field: keyof Post) => {
        const updatedPost = {
            ...post,
            [field]: field === 'price' ? Number(e.currentTarget.textContent) : e.currentTarget.textContent
        };
        setPost(updatedPost);
    };

    const handleDeleteImage = (index: number, image: string) => {
        const updatedImages = post.images.filter((_, i) => i !== index); // Видаляємо зображення
        setPost({ ...post, images: updatedImages });
        setDeletedImg((prevDeletedImg) => prevDeletedImg ? `${prevDeletedImg}, ${image}` : image);

    };

    // Обробник скасування
    const handleCancel = () => {
        router.push(`products/${transliterateAndClear(postItem.title)}/${postItem?.id}`);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setSelectedFiles(filesArray);
        }
    };

    const handleRemoveFile = (index: number) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleRemoveFromInput = (fileToRemove: File) => {
        const input = document.getElementById('file') as HTMLInputElement;

        if (input.files) {
            const newFileList = Array.from(input.files).filter(file => file !== fileToRemove);
            const dataTransfer = new DataTransfer();
            newFileList.forEach(file => dataTransfer.items.add(file));
            input.files = dataTransfer.files; // Оновлюємо input
        }

        // Видаляємо файл зі стану
        handleRemoveFile(selectedFiles.indexOf(fileToRemove));
    };


    // Обробник збереження посту
    const credentialsAction = async (formData: FormData) => {
        const value: FormDataEntryValue | null = formData.get('file');

        if (value instanceof File && value.name == '') {
            formData.delete("file");
        }

        formData.append("title", post.title);
        formData.append("description", post.description);
        formData.append("price", post.price.toString());
        formData.append("tags", post.tags.replace(/[\[\],]+/g, '').trim());
        formData.append("deleteImg", deletedImg);

        await editPost(formData, postItem.id, accessToken || null)

        // для продакшена
        router.push(`https://manufacture-p.vercel.app/products/${transliterateAndClear(post.title)}/${postItem?.id}`);
        // для розробки
        // router.push(`http://localhost:3000/products/${transliterateAndClear(post.title)}/${postItem?.id}`);
    }

    return (
        <div className="postContainer">

            <form action={credentialsAction} className='postCard'>
                <h2
                    className='title'
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleEdit(e, 'title')}
                >
                    {post.title}
                </h2>

                <div className='images'>
                    <div className="create-product__form-group">
                        <label htmlFor="file" className="custom-file-upload">
                            <FileUploadIcon />
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            accept="image/*"
                            multiple
                            className="file-input"
                            onChange={handleFileChange}
                        />
                    </div>

                    {post.images.map((image, index) => (
                        <React.Fragment key={index}>
                            <Image
                                src={image}
                                width={500}
                                height={500}
                                alt={`Image ${index + 1}`}
                            />
                            <div
                                className='imageDelete'
                                onClick={() => handleDeleteImage(index, image)}>
                                X</div>
                        </React.Fragment>
                    ))}
                    {selectedFiles.map((file, index) => (
                        <React.Fragment key={index}>
                            <Image
                                key={index}
                                width={500}
                                height={500}
                                src={URL.createObjectURL(file)} // Створюємо URL для попереднього перегляду
                                alt={`preview ${index}`}
                                className="preview-image"
                            />
                            <div
                                className='imageDelete'
                                onClick={() => handleRemoveFromInput(file)}>
                                X</div>
                        </React.Fragment>
                    ))}
                </div>

                <p
                    className='description'
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleEdit(e, 'description')}
                >
                    {post.description}
                </p>
                <div className='priceEditor'>
                    Ціна: $
                    <p
                        className='price'
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleEdit(e, 'price')}
                    >
                        {post.price}
                    </p>
                </div>
                <div className='tagsEditor'>
                    Теги:
                    <p
                        className='tags'
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleEdit(e, 'tags')}
                    >
                        {post.tags.replace(/[\[\],]+/g, '').trim()}
                    </p>
                </div>
                <div className='buttonsContainer'>
                    <CustomSubmitBtn text="Зберегти зміни" classN="button" />
                    <button className='button cancelButton' onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPost;
