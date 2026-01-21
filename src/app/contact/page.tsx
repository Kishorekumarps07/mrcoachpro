'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import styles from './contact.module.css';

export default function ContactPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you! We will contact you shortly.');
    };

    return (
        <main className={styles.main}>
            <Navbar />

            <div className={styles.container}>
                <div className={styles.formCard}>
                    <h1 className={styles.headline}>Book Your Free Demo</h1>
                    <p className={styles.subheadline}>Start your fitness journey with a personalized session</p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.label}>Full Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                className={styles.input}
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="phone" className={styles.label}>Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                required
                                className={styles.input}
                                placeholder="+91 98765 43210"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className={styles.input}
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="interest" className={styles.label}>What are you interested in?</label>
                            <select id="interest" className={styles.select} required>
                                <option value="">Select an option</option>
                                <option value="fitness">Fitness Training</option>
                                <option value="physio">Physiotherapy</option>
                                <option value="sports">Sports Training</option>
                                <option value="yoga">Yoga & Wellness</option>
                                <option value="nutrition">Nutrition Coaching</option>
                                <option value="online">Online Training</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message" className={styles.label}>Message (Optional)</label>
                            <textarea
                                id="message"
                                className={styles.textarea}
                                placeholder="Tell us about your fitness goals..."
                                rows={4}
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            Book My Free Demo
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
