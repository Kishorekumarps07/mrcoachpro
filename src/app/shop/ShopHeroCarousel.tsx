'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import './shop-rugged.css';

const SLIDES = [
    {
        id: 1,
        title: "BIG SAVINGS\nON WHEY.",
        subtitle: "Up to 40% OFF this week.",
        bgClass: "slide-yellow",
        image: "/images/fitness-bg-bright.png" // Fallback or specific image
    },
    {
        id: 2,
        title: "NEW ARRIVALS:\nPRO GEAR",
        subtitle: "Elite equipment for elite athletes.",
        bgClass: "slide-black", // CSS class for black theme
        image: "/images/fitness-bg.png"
    },
    {
        id: 3,
        title: "ESSENTIAL\nVITAMINS",
        subtitle: "Fuel your recovery 24/7.",
        bgClass: "slide-teal", // CSS class for teal/green theme
        image: "/images/nutrition-bg.png"
    }
];

export default function ShopHeroCarousel() {
    const [current, setCurrent] = useState(0);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="shop-hero-carousel-wrapper">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    className={`shop-carousel-slide ${SLIDES[current].bgClass}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Background Layer - Forced to fill */}
                    <motion.div
                        className="carousel-bg-full"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{ backgroundImage: `url(${SLIDES[current].image})` }}
                    />

                    {/* Frosted Glass Overlay - Global */}
                    <div className="carousel-frosted-overlay"></div>

                    {/* Content Card */}
                    <div className="glass-card-container">
                        <div className="carousel-content">
                            <motion.h1
                                className="carousel-title"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {SLIDES[current].title}
                            </motion.h1>
                            <motion.p
                                className="carousel-subtitle"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {SLIDES[current].subtitle}
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Dots Navigation */}
            <div className="carousel-dots">
                {SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`carousel-dot ${index === current ? 'active' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}
