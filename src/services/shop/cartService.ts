import { CartItem, Product } from '@/types/shop';

export const cartService = {
    addToCart: (cart: CartItem[], product: Product, quantity: number = 1): CartItem[] => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            return cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        }
        return [...cart, { ...product, quantity }];
    },

    removeFromCart: (cart: CartItem[], productId: string): CartItem[] => {
        return cart.filter(item => item.id !== productId);
    },

    updateQuantity: (cart: CartItem[], productId: string, quantity: number): CartItem[] => {
        if (quantity <= 0) return cartService.removeFromCart(cart, productId);
        return cart.map(item =>
            item.id === productId
                ? { ...item, quantity }
                : item
        );
    },

    calculateTotal: (cart: CartItem[]): number => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
};
