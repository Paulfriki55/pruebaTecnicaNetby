// src/app/models/transaction.ts
export interface Transaction {
    id?: number;
    transactionType: 'venta' | 'compra';
    productId: number;
    quantity: number;
    unitPrice: number;
    totalPrice?: number;
    detail: string;
    date?: string;
  }