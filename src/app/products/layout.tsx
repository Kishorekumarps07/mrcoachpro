'use client';

import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { ShopNavbar } from '@/components/layout/ShopNavbar';
import { ShopCartDrawer } from '@/components/shop/ShopCartDrawer';
import { Toaster } from 'react-hot-toast';
import './shop-rugged.css'; // Import the RUGGED-TECH CSS Engine

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ShopProvider>
            {/* Wrap in shop-wrapper to enforce light theme */}
            <div className="shop-wrapper min-h-screen bg-gray-50" style={{ overflowX: 'hidden' }}>
                <Toaster position="bottom-center" />
                <ShopNavbar />
                <main>
                    {children}
                </main>
                <ShopCartDrawer />
            </div>
        </ShopProvider>
    );
}

