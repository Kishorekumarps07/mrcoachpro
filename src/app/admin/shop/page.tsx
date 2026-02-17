'use client';

import React, { useEffect, useState } from 'react';
import { productService } from '@/services/shop/productService';
import { Product } from '@/types/shop';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Plus, Edit, Trash2, Package } from 'lucide-react';

export default function AdminShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await productService.getAllProductsAdmin();
            setProducts(data);
            setIsLoading(false);
        };
        load();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Shop Management</h1>
                    <p className="text-gray-500">Manage products, inventory, and orders</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/admin/shop/orders">
                        <Button variant="secondary">View Orders</Button>
                    </Link>
                    <Link href="/admin/shop/create">
                        <Button>
                            <Plus size={18} className="mr-2" /> Add Product
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Cards - Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-gray-500 font-medium mb-2">Total Products</h3>
                    <p className="text-3xl font-bold">{products.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-gray-500 font-medium mb-2">Active Orders</h3>
                    <p className="text-3xl font-bold">0</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-gray-500 font-medium mb-2">Total Revenue</h3>
                    <p className="text-3xl font-bold">₹0</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="font-semibold text-gray-900">Product Inventory</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4 font-medium">Product</th>
                                <th className="p-4 font-medium">Category</th>
                                <th className="p-4 font-medium">Price</th>
                                <th className="p-4 font-medium">Stock</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr><td colSpan={6} className="p-8 text-center">Loading...</td></tr>
                            ) : products.map(product => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                                                {product.images[0] ? (
                                                    <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Package className="w-full h-full p-2 text-gray-400" />
                                                )}
                                            </div>
                                            <span className="font-medium text-gray-900">{product.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-600">{product.category}</td>
                                    <td className="p-4 font-medium">₹{product.price.toLocaleString()}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {product.stock} in stock
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`w-2 h-2 rounded-full inline-block mr-2 ${product.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                                        {product.isActive ? 'Active' : 'Draft'}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
