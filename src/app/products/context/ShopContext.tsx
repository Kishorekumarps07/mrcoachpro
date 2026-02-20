'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '@/types/shop';
import { cartService } from '@/services/shop/cartService';

interface ShopContextType {
    cart: CartItem[];
    isCartOpen: boolean;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    toggleCart: () => void;
    cartTotal: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

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
        setIsCartOpen(true);
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
            cartTotal
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
