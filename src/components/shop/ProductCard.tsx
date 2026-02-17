'use client';

import React from 'react';
import { Product } from '@/types/shop';
import { useShop } from '@/app/shop/context/ShopContext';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useShop();

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
        >
            <Link href={`/shop/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-100">
                {/* Placeholder or Image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
                    {product.images[0] ? (
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <span>No Image</span>
                    )}
                </div>
            </Link>

            <div className="p-4">
                <div className="mb-2">
                    <span className="text-xs uppercase tracking-wider text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full">{product.category}</span>
                </div>
                <Link href={`/shop/${product.slug}`}>
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-amber-600 transition-colors mb-1">{product.title}</h3>
                </Link>
                <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-gray-900 text-white p-2 rounded-full hover:bg-amber-500 transition-colors shadow-sm"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
