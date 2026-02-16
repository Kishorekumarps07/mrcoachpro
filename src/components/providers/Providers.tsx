'use client';

import React from 'react';
import { ModalProvider } from '@/context/ModalContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ModalProvider>
            {children}
        </ModalProvider>
    );
}
