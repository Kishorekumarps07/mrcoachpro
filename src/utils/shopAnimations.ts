import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export const slideUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const cardHover: Variants = {
    rest: { scale: 1, y: 0, boxShadow: "0px 4px 10px rgba(0,0,0,0.05)" },
    hover: {
        scale: 1.02,
        y: -8,
        boxShadow: "0px 15px 30px rgba(0,0,0,0.1)",
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

export const imageZoom: Variants = {
    rest: { scale: 1 },
    hover: {
        scale: 1.1,
        transition: { duration: 0.5, ease: "easeInOut" }
    }
};

export const buttonReveal: Variants = {
    rest: { opacity: 0, y: 20 },
    hover: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};
