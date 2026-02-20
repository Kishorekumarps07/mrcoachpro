'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { productService } from '@/services/shop/productService';
import { Product } from '@/types/shop';
import { useShop } from '@/app/products/context/ShopContext';
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
                <Link href="/products" className="text-amber-600 hover:underline">Return to Shop</Link>
            </div>
        );
    }

    return (
        <div className="shop-wrapper min-h-screen bg-white">
            <div className="ms-detail-container">
                <Link href="/products" className="ms-detail-back inline-flex items-center text-gray-400 hover:text-black mb-12 transition-colors font-black text-[10px] uppercase tracking-widest">
                    <ChevronLeft size={16} className="mr-1" /> Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#FAFAFA] rounded-xl overflow-hidden aspect-[4/5] relative border border-gray-100"
                    >
                        {product.images[0] ? (
                            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-300 font-black uppercase tracking-widest text-[10px]">No Image Available</div>
                        )}
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col h-full"
                    >
                        <span className="ms-detail-badge">{product.category}</span>
                        <h1 className="ms-detail-title mb-6">{product.title}</h1>
                        <div className="ms-detail-price mb-8">₹{product.price.toLocaleString()}</div>

                        <p className="ms-detail-desc text-gray-500 leading-relaxed mb-12 text-lg border-l-2 border-yellow-400 pl-6">{product.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="flex items-start gap-4 p-6 bg-[#FAFAFA] rounded-lg border border-gray-50">
                                <div className="text-yellow-500">
                                    <Truck size={20} strokeWidth={3} />
                                </div>
                                <div>
                                    <h4 className="font-black text-[10px] uppercase tracking-widest text-black mb-1">Fast Delivery</h4>
                                    <p className="text-xs text-gray-400 font-medium font-body">Ships within 24h</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-6 bg-[#FAFAFA] rounded-lg border border-gray-50">
                                <div className="text-yellow-500">
                                    <RefreshCw size={20} strokeWidth={3} />
                                </div>
                                <div>
                                    <h4 className="font-black text-[10px] uppercase tracking-widest text-black mb-1">Easy Returns</h4>
                                    <p className="text-xs text-gray-400 font-medium font-body">14-day policy</p>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Add to Cart */}
                        <div className="hidden lg:block mt-auto">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => addToCart(product)}
                                className="w-full py-6 bg-black text-white font-black text-xs uppercase tracking-[0.3em] rounded-lg shadow-2xl shadow-black/10 hover:bg-[#FFD000] hover:text-black transition-all duration-500 flex items-center justify-center gap-4"
                            >
                                <ShoppingCart size={20} strokeWidth={3} />
                                Add to Cart
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mobile Sticky CTA */}
            <div className="ms-sticky-cta lg:hidden">
                <div className="flex-grow">
                    <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Total Price</div>
                    <div className="text-lg font-black text-black">₹{product.price.toLocaleString()}</div>
                </div>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                    className="flex-grow-[2] py-4 bg-black text-white font-black text-[10px] uppercase tracking-widest rounded-lg flex items-center justify-center gap-2"
                >
                    <ShoppingCart size={16} strokeWidth={3} />
                    Add
                </motion.button>
            </div>
        </div>
    );
}
