'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ChevronLeft, Upload } from 'lucide-react';

export default function AdminCreateProductPage() {
    // Mock Form
    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/admin/shop" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                <ChevronLeft size={20} className="mr-1" /> Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-3xl">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                        <input className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" placeholder="e.g. Marathon Training Plan" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                            <input type="number" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" placeholder="0.00" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                            <input type="number" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" placeholder="0" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500">
                            <option>Apparel</option>
                            <option>Equipment</option>
                            <option>Digital</option>
                            <option>Nutrition</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea className="w-full p-3 border border-gray-300 rounded-lg h-32 outline-none focus:ring-2 focus:ring-amber-500" placeholder="Product details..."></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                            <Upload className="mx-auto text-gray-400 mb-2" />
                            <p className="text-gray-500 text-sm">Click to upload or drag and drop</p>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <Button type="submit">Create Product</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
