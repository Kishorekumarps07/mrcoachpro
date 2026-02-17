export interface Product {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    stock: number;
    isActive: boolean;
    createdAt: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    totalAmount: number;
    paymentStatus: 'pending' | 'completed' | 'failed';
    orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: string;
    createdAt: string;
}
