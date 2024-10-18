export interface IPost {
    id: number,
    title: string,
    description: string,
    price: number,
    createdAt: string,
    updatedAt: string,
    views: number,
    tags: string,
    images: string[]
}

export interface IAddCartInfo {
    userId?: string,
    itemId: number,
    quantity?: number
}

export interface IProperty {
    name: string
    text: string
}

export interface IGetProperty {
    id: number
    name: string
    text: string
}