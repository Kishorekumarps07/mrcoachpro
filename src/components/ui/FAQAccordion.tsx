'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './FAQAccordion.module.css';
import clsx from 'clsx';

interface FAQItemProps {
    question: string;
    answer: string;
}

export const FAQItem = ({ question, answer }: FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={clsx(styles.item, { [styles.open]: isOpen })}>
            <button
                className={styles.trigger}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className={styles.question}>{question}</span>
                <ChevronDown
                    className={styles.icon}
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }} // Spring-like easing
                        className={styles.contentWrapper}
                    >
                        <div className={styles.answer}>
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface FAQListProps {
    items: FAQItemProps[];
}

export const FAQList = ({ items }: FAQListProps) => {
    return (
        <div className={styles.list}>
            {items.map((item, index) => (
                <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
        </div>
    );
};
