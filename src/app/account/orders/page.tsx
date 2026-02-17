'use client';

import React from 'react';
import Link from 'next/link';
import { Package } from 'lucide-react';

export default function AccountOrdersPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 font-heading">My Orders</h1>

            {/* Mock Empty State */}
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Package size={40} className="text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
                <p className="text-gray-500 mb-8">Start shopping to see your orders here.</p>
                <Link href="/shop" className="inline-block px-8 py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-colors">
                    Start Shopping
                </Link>
            </div>
        </div>
    );
}
