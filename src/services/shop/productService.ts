import { PRODUCTS } from '@/data/shop';
import { Product } from '@/types/shop';

export const productService = {
    getAllProducts: async (): Promise<Product[]> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return PRODUCTS.filter(p => p.isActive);
    },

    getProductBySlug: async (slug: string): Promise<Product | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return PRODUCTS.find(p => p.slug === slug && p.isActive);
    },

    // Admin methods
    getAllProductsAdmin: async (): Promise<Product[]> => {
        return PRODUCTS;
    }
};
