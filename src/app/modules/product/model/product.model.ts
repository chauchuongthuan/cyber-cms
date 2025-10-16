export interface IProduct {
    id: string;
    name: string;
    quantity: number;
    slug: string;
    image: string;
    country: string;
    countryName?: string;
    rating: string;
    info: string;
    subname?: string;
    description: string;
    title: string;
    price: string;
    category: any;
    page: any;
    content: any;
    sortOrder: number;
    verified: boolean;
}
