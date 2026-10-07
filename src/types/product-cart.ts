export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
};

export type CartItem = Product & {
    quantity: number;
};

export type CreateProductData = {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
};