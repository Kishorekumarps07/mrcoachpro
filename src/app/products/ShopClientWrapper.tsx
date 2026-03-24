'use client';

import React, { Suspense } from 'react';
import { ShopProvider } from './context/ShopContext';
import { ShopNavbar } from '@/components/layout/ShopNavbar';
import { ShopCartDrawer } from '@/components/shop/ShopCartDrawer';
import { Toaster } from 'react-hot-toast';

export function ShopClientWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ShopProvider>
            <div className="shop-wrapper min-h-screen bg-gray-50" style={{ overflowX: 'hidden' }}>
                <Toaster position="bottom-center" />
                <Suspense fallback={null}>
                    <ShopNavbar />
                </Suspense>
                <main>
                    {children}
                </main>
                <ShopCartDrawer />
            </div>
        </ShopProvider>
    );
}
