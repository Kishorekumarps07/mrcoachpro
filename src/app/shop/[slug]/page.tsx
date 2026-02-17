'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { productService } from '@/services/shop/productService';
import { Product } from '@/types/shop';
import { useShop } from '@/app/shop/context/ShopContext';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Truck, RefreshCw, ShieldCheck, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart } = useShop();

    useEffect(() => {
        const loadProduct = async () => {
            if (params.slug) {
                const data = await productService.getProductBySlug(params.slug as string);
                setProduct(data);
                setIsLoading(false);
            }
        };
        loadProduct();
    }, [params.slug]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="spinner mx-auto mb-4" />
                <p>Loading product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <Link href="/shop" className="text-amber-600 hover:underline">Return to Shop</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Link href="/shop" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
                <ChevronLeft size={20} className="mr-1" /> Back to Shop
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Image Gallery */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-100 rounded-2xl overflow-hidden aspect-square relative"
                >
                    {product.images[0] ? (
                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">No Image Available</div>
                    )}
                </motion.div>

                {/* Product Info */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col h-full"
                >
                    <span className="text-amber-600 font-bold uppercase tracking-wider text-sm mb-2">{product.category}</span>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 font-heading">{product.title}</h1>
                    <div className="text-3xl font-bold text-gray-900 mb-6">₹{product.price.toLocaleString()}</div>

                    <p className="text-gray-600 leading-relaxed mb-8 text-lg">{product.description}</p>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                <Truck size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Fast Delivery</h4>
                                <p className="text-sm text-gray-500">Ships within 24-48 hours</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                <RefreshCw size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Easy Returns</h4>
                                <p className="text-sm text-gray-500">14-day hassle-free return policy</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Genuine Product</h4>
                                <p className="text-sm text-gray-500">100% authentic merchandise</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <Button
                            onClick={() => addToCart(product)}
                            className="w-full py-6 text-lg rounded-xl shadow-lg shadow-amber-500/20"
                        >
                            <ShoppingCart className="mr-2" /> Add to Cart
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
