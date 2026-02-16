'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BookDemoModal } from '@/components/ui/BookDemoModal';

interface ModalContextType {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log('ModalProvider: Component rendered'); // Debug Log

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
            <BookDemoModal isOpen={isModalOpen} onClose={closeModal} />
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        console.error('useModal called without Provider!');
        // Return a mock context to prevent crash during reload/dev
        return { isModalOpen: false, openModal: () => console.warn('Modal context missing'), closeModal: () => { } };
    }
    return context;
};
