'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Send } from 'lucide-react';
import styles from './InvestmentSection.module.css';

export const InvestmentSection = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Investment Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:mrcoachofficial@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── BANNER IMAGE ── */}
        <div className={styles.imageWrapper}>
          <Image
            src="/images/invest-banner.jpeg?v=2"
            alt="Invest in the Future of Fitness – MrCoachPro pitch deck"
            width={1200}
            height={675}
            className={styles.bannerImage}
            priority
          />
        </div>

        {/* ── CONTACT FORM ── */}
        <div className={styles.formSection}>
          <div className={styles.formCard}>
            {submitted ? (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Gmail Opened!</h3>
                <p className={styles.successDesc}>
                  Your message is ready to send in Gmail. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>Ready to Invest?</h2>
                  <p className={styles.formSubtitle}>
                    Fill in your details and we'll reach out to discuss the opportunity with you personally.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.inputRow}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        className={styles.input}
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        className={styles.input}
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className={styles.input}
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Message</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell us about your interest — investment, partnership, franchise..."
                      className={styles.textarea}
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    <Send size={18} />
                    <span>Send via Gmail</span>
                    <ChevronRight size={16} className={styles.arrow} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
