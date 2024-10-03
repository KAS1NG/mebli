import { notFound } from 'next/navigation';
import ProductDetail from '@/app/components/ProductDetail';
import { fetchOnePost, fetchProductProperty } from '@/app/api/post/postService';
import { Metadata, ResolvingMetadata } from 'next';
import { IPost } from '@/app/types/post';
import { transliterateAndClear } from '@/app/utils/clearUrlString';
import '@/app/styles/productDetail.scss';

interface ProductPageProps {
    params: {
        slug: string;
        id: string;
    };
}

export async function generateMetadata(
    { params }: ProductPageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.id

    // fetch data
    const product: IPost = await fetch(`${process.env.SERVER_URL}/posts/getOne/${id}`).then((res) => res.json())

    if (!product || !product.id) {
        notFound();
    } else {

        const previousImages = (await parent).openGraph?.images || []
    
        const img = product.images[0]
    
        return {
            title: product.title,
            alternates: {
                canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${transliterateAndClear(product.title)}/${product.id}`,
                languages: {
                    'uk-UA': '/uk-UA',  // Українська
                    'ru-RU': '/ru-RU',  // Російська
                },
            },
            openGraph: {
                images: [`${img}`, ...previousImages],
            },
        }
    }

    // optionally access and extend (rather than replace) parent metadata
}

export default async function ProductPage({ params }: ProductPageProps) {

    const { id } = params;

    // Fetch product and its properties in parallel
    const [product, productProperty] = await Promise.all([
        fetchOnePost(id),
        fetchProductProperty(id),
    ]);

    // If the product is not found, show the 404 page
    if (!product || !product.id) {
        notFound();
        return; // Ensure the function exits after showing the 404 page
    }

    // Render the ProductDetail component with the fetched data
    return <ProductDetail product={product} productProperty={productProperty} />;
}

