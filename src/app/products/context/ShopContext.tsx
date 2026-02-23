'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '@/types/shop';
import { cartService } from '@/services/shop/cartService';
import toast from 'react-hot-toast';

interface ShopContextType {
    cart: CartItem[];
    isCartOpen: boolean;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    toggleCart: () => void;
    cartTotal: number;
    // ── Search ──
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    allProducts: Product[];
    setAllProducts: (products: Product[]) => void;
    // ── Category ──
    activeCategory: string | null;
    setActiveCategory: (cat: string | null) => void;
    // ── Price Filter ──
    minPrice: number | null;
    setMinPrice: (price: number | null) => void;
    maxPrice: number | null;
    setMaxPrice: (price: number | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('mrcoach_shop_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save cart to local storage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('mrcoach_shop_cart', JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    const addToCart = (product: Product) => {
        setCart(prev => cartService.addToCart(prev, product));
        toast.success(`Added ${product.title} to cart`, {
            style: {
                borderRadius: '10px',
                background: '#111827',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '600',
            },
            iconTheme: {
                primary: '#FFD000',
                secondary: '#111827',
            },
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => cartService.removeFromCart(prev, productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        setCart(prev => cartService.updateQuantity(prev, productId, quantity));
    };

    const toggleCart = () => setIsCartOpen(prev => !prev);

    const cartTotal = cartService.calculateTotal(cart);

    return (
        <ShopContext.Provider value={{
            cart,
            isCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            toggleCart,
            cartTotal,
            searchQuery,
            setSearchQuery,
            allProducts,
            setAllProducts,
            activeCategory,
            setActiveCategory,
            minPrice,
            setMinPrice,
            maxPrice,
            setMaxPrice,
        }}>
            {children}
        </ShopContext.Provider>
    );
}

export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) throw new Error('useShop must be used within ShopProvider');
    return context;
};
