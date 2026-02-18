'use client';

import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from '@/components/layout/Navbar';
import { ShopCartDrawer } from '@/components/shop/ShopCartDrawer';
import './shop-rugged.css'; // Import the RUGGED-TECH CSS Engine

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ShopProvider>
            {/* Wrap in shop-wrapper to enforce light theme */}
            <div className="shop-wrapper min-h-screen bg-gray-50">
                <Navbar />
                <main>
                    {children}
                </main>
                <ShopCartDrawer />
            </div>
        </ShopProvider>
    );
}

