'use client';

import React, { useEffect, useState } from 'react';
import { productService } from '@/services/shop/productService';
import { Product } from '@/types/shop';
import { ProductCard } from '@/components/shop/ProductCard';
import { motion } from 'framer-motion';

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await productService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadProducts();
    }, []);

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-amber-600 font-bold uppercase tracking-wider text-sm mb-3 block"
                >
                    Official Merchandise
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading"
                >
                    Gear Up for Greatness
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 text-lg leading-relaxed"
                >
                    Premium athletic wear, training plans, and equipment designed to help you reach your peak performance.
                </motion.p>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-gray-100 rounded-xl aspect-[4/5] animate-pulse" />
                    ))}
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {products.map(product => (
                        <motion.div key={product.id} variants={item}>
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
