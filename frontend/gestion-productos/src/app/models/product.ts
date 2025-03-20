// src/app/models/product.ts
export interface Product {
    id?: number;
    name: string;
    description: string;
    category: string;
    image: string;
    price: number;
    stock: number;
  }