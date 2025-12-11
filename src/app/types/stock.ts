export interface IStock {
    quantity: number
    active: boolean,
    variant: {
        id: number
        name: string,
        color: string,
        size: string,
        manufactureTime: string
    }
}

export interface IStockVariants {
    id?: number,
    name: string,
    color: string,
    size: string,
    manufactureTime: string,
    itemId: number | null
}