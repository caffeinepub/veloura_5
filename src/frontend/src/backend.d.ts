import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface NewProduct {
    name: string;
    description: string;
    sizes: Array<string>;
    stock: bigint;
    category: ProductCategory;
    colors: Array<string>;
    priceCents: bigint;
    images: Array<string>;
}
export interface ContactMessage {
    name: string;
    createdAt: Time;
    email: string;
    message: string;
}
export type Time = bigint;
export interface Review {
    content: string;
    name: string;
    createdAt: Time;
    productId?: bigint;
    rating: bigint;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    sizes: Array<string>;
    stock: bigint;
    category: ProductCategory;
    colors: Array<string>;
    priceCents: bigint;
    images: Array<string>;
}
export enum ProductCategory {
    clothing = "clothing",
    accessories = "accessories",
    bags = "bags",
    customOrders = "customOrders"
}
export interface backendInterface {
    addProduct(product: NewProduct): Promise<bigint>;
    addReview(name: string, productId: bigint | null, rating: bigint, content: string): Promise<bigint>;
    findProductByName(name: string): Promise<Product>;
    getContactMessages(): Promise<Array<ContactMessage>>;
    getProductReviews(productId: bigint): Promise<Array<Review>>;
    getProducts(): Promise<Array<Product>>;
    getProductsByPrice(): Promise<Array<Product>>;
    getReviews(): Promise<Array<Review>>;
    seedData(): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<bigint>;
    subscribeEmail(email: string): Promise<void>;
}
