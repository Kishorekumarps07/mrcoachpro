'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './BookDemoModal.module.css';
import { BookDemoForm } from './BookDemoForm';

interface BookDemoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BookDemoModal = ({ isOpen, onClose }: BookDemoModalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.documentElement.classList.add('no-scroll');
            document.body.classList.add('no-scroll');
        } else {
            document.documentElement.classList.remove('no-scroll');
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.documentElement.classList.remove('no-scroll');
            document.body.classList.remove('no-scroll');
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    const modalContent = (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <BookDemoForm onClose={onClose} isPage={false} />
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};
