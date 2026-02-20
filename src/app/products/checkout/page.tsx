'use client';

import React, { useState } from 'react';
import { useShop } from '@/app/products/context/ShopContext';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function CheckoutPage() {
    const { cart, cartTotal } = useShop();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: ''
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Payment integration pending (Razorpay)');
        // Phase 6 will implement actual payment logic
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
                <Link href="/products">
                    <Button>Return to Shop</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 font-heading">Secure Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form */}
                <div>
                    <h2 className="text-xl font-bold mb-6">Shipping Details</h2>
                    <form onSubmit={handleCheckout} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                onChange={handleInput}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                onChange={handleInput}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                            <input
                                name="address"
                                type="text"
                                required
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                onChange={handleInput}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    name="city"
                                    type="text"
                                    required
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                                <input
                                    name="zip"
                                    type="text"
                                    required
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                    onChange={handleInput}
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button type="submit" className="w-full py-4 text-lg">
                                Proceed to Payment
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 p-6 rounded-2xl h-fit">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <div>
                                    <span className="font-medium">{item.title}</span>
                                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                                </div>
                                <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{cartTotal.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
