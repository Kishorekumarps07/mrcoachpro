'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ChevronRight, 
  Send, 
  TrendingUp, 
  Smartphone, 
  Globe, 
  RefreshCw, 
  Layers, 
  ArrowUpRight, 
  MessageSquare, 
  Phone, 
  FileText, 
  Activity, 
  DollarSign, 
  Award, 
  Zap, 
  UserCheck,
  Calendar 
} from 'lucide-react';
import styles from './InvestmentSection.module.css';

export const InvestmentSection = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    investorType: '',
    industryInterest: '',
    experience: '',
    range: '',
    investmentType: '',
    whyMrCoach: '',
    beyondCapital: '',
    expectedRoi: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Investor Inquiry: ${form.name}`);
    const body = encodeURIComponent(
      `INVESTOR APPLICATION DETAILS\n` +
      `===========================\n\n` +
      `👤 BASIC DETAILS\n` +
      `-----------------\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n` +
      `Location: ${form.location}\n\n` +
      `💼 INVESTOR PROFILE\n` +
      `--------------------\n` +
      `Investor Type: ${form.investorType}\n` +
      `Industry Interest: ${form.industryInterest}\n` +
      `Experience Level: ${form.experience}\n\n` +
      `💰 INVESTMENT INTENT\n` +
      `---------------------\n` +
      `Preferred Range: ${form.range}\n` +
      `Investment Type: ${form.investmentType}\n\n` +
      `🎯 ALIGNMENT QUESTIONS\n` +
      `-----------------------\n` +
      `* What interests you about Mr. Coach?\n${form.whyMrCoach}\n\n` +
      `* How do you see yourself contributing beyond capital?\n${form.beyondCapital}\n\n` +
      `* Expected ROI / Exit Preference (Optional):\n${form.expectedRoi || 'N/A'}\n\n` +
      `Sent via Website Investor Portal`
    );
    window.location.href = `mailto:mrcoachofficial@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* ── HERO HEADER ── */}
        <header className={styles.heroHeader}>
          <div className={styles.badge}>
            <span className={styles.badgePulse}></span>
            Actively onboarding strategic partners • Expansion Phase
          </div>
          <h1 className={styles.heroTitle}>
            Invest in India’s Next <span className={styles.goldText}>Health & Wellness</span> Ecosystem
          </h1>
          <p className={styles.heroSubtitle}>
            We are building a multi-platform digital ecosystem combining elite personal training, physiotherapy, nutrition, and health commerce — all under one trusted brand.
          </p>
          <div className={styles.urgencyAlert}>
            🔥 <strong>Limited Early Investor Slots Available</strong> — Currently securing strategic allocations.
          </div>
        </header>

        {/* ── PITCH DECK BANNER ── */}
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

        {/* ── METRICS SECTION ── */}
        <section className={styles.metricsWrapper}>
          <h2 className={styles.sectionTitle}>Ecosystem Growth Metrics</h2>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricIcon}><TrendingUp size={24} /></div>
              <h3 className={styles.metricVal}>30%+ MoM</h3>
              <p className={styles.metricLabel}>Growing User Base</p>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricIcon}><Smartphone size={24} /></div>
              <h3 className={styles.metricVal}>3 Integrated Apps</h3>
              <p className={styles.metricLabel}>Mr Coach, Coach Pro, & Drux Store</p>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricIcon}><Globe size={24} /></div>
              <h3 className={styles.metricVal}>National Expansion</h3>
              <p className={styles.metricLabel}>Expanding Across India</p>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricIcon}><RefreshCw size={24} /></div>
              <h3 className={styles.metricVal}>SaaS + Commerce</h3>
              <p className={styles.metricLabel}>Recurring Revenue Model</p>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricIcon}><Layers size={24} /></div>
              <h3 className={styles.metricVal}>All-In-One</h3>
              <p className={styles.metricLabel}>Multi-Service Ecosystem</p>
            </div>
          </div>
        </section>

        {/* ── CORE VALUE CARDS ── */}
        <section className={styles.whyInvestWrapper}>
          <h2 className={styles.sectionTitle}>Why Invest In Mr. Coach</h2>
          <div className={styles.cardsGrid}>
            <div className={styles.valueCard}>
              <div className={styles.cardHeader}>
                <Activity size={24} className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Ecosystem Play</h3>
              </div>
              <p className={styles.cardText}>
                Not just another standalone app. A fully connected multi-service platform linking digital services directly with health commerce.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.cardHeader}>
                <UserCheck size={24} className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Dual-Sided Marketplace</h3>
              </div>
              <p className={styles.cardText}>
                Connecting elite verified fitness coaches with clients. High barrier to entry, powerful network effects, and organic scale.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.cardHeader}>
                <DollarSign size={24} className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Multiple Revenue Streams</h3>
              </div>
              <p className={styles.cardText}>
                Diversified monetization including coach SaaS subscriptions, service split commissions, and health product sales (Drux).
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.cardHeader}>
                <Zap size={24} className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Early Mover Advantage</h3>
              </div>
              <p className={styles.cardText}>
                We are capturing the premium tier of the Indian wellness market early, offering substantial equity appreciation potential.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.cardHeader}>
                <Award size={24} className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>India Market Opportunity</h3>
              </div>
              <p className={styles.cardText}>
                Consumer demand for health, preventive fitness, and medical wellness is growing exponentially across Tier-1 and Tier-2 cities.
              </p>
            </div>
          </div>
        </section>

        {/* ── TWO-COLUMN CONVERSION LAYOUT ── */}
        <div className={styles.splitLayout}>
          
          {/* Left Column: CTAs and Founder Note */}
          <div className={styles.infoCol}>
            
            {/* Trust / Frictionless CTA List */}
            <div className={styles.ctaCard}>
              <h3 className={styles.ctaCardTitle}>Frictionless Access</h3>
              <p className={styles.ctaCardDesc}>Download materials or schedule time directly with our investment relations team.</p>
              
              <div className={styles.ctaButtonsGroup}>
                <a href="/images/invest-banner.jpeg?v=2" target="_blank" rel="noopener noreferrer" className={styles.ctaLinkBtn}>
                  <FileText size={20} />
                  <span>Download Pitch Deck</span>
                  <ArrowUpRight size={16} />
                </a>
                
                <a href="mailto:mrcoachofficial@gmail.com?subject=Schedule%20Investment%20Call" className={styles.ctaLinkBtn}>
                  <Calendar size={20} />
                  <span>Schedule a Call</span>
                  <ArrowUpRight size={16} />
                </a>

                <a href="https://api.whatsapp.com/send/?phone=%2B917448421134&text=I%20am%20interested%20in%20Mr.%20Coach%20investment%20opportunities" target="_blank" rel="noopener noreferrer" className={`${styles.ctaLinkBtn} ${styles.whatsappBtn}`}>
                  <MessageSquare size={20} />
                  <span>WhatsApp Direct Connect</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            {/* Founder Note */}
            <div className={styles.founderCard}>
              <div className={styles.founderHeader}>
                <div className={styles.founderAvatar}>MC</div>
                <div>
                  <h4 className={styles.founderName}>The Founding Team</h4>
                  <p className={styles.founderRole}>Mr. Coach Collective</p>
                </div>
              </div>
              <blockquote className={styles.founderQuote}>
                "We aren't just building another workout tracker. We are building the infrastructure for the future of Indian health and longevity. Let’s build the future of wellness together."
              </blockquote>
            </div>

          </div>

          {/* Right Column: Upgraded Form */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.successBox}>
                  <div className={styles.successIcon}>✓</div>
                  <h3 className={styles.successTitle}>Inquiry Drafted!</h3>
                  <p className={styles.successDesc}>
                    Your application has been packaged and email client opened. Our investor relations team will connect with you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className={styles.formHeader}>
                    <h2 className={styles.formTitle}>Tell us about your investment vision</h2>
                    <p className={styles.formSubtitle}>
                      Share your profile and intent below to start a direct dialogue with our founders.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className={styles.form}>
                    
                    {/* SECTION: Basic Details */}
                    <div className={styles.formFieldSection}>
                      <h4 className={styles.fieldSectionTitle}>Basic Details</h4>
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
                          <label className={styles.label}>Phone Number</label>
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

                      <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Email Address</label>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="john@example.com"
                            className={styles.input}
                            value={form.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Location (City, Country)</label>
                          <input
                            type="text"
                            name="location"
                            required
                            placeholder="Bangalore, India"
                            className={styles.input}
                            value={form.location}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION: Profile & Intent */}
                    <div className={styles.formFieldSection}>
                      <h4 className={styles.fieldSectionTitle}>Investor Profile</h4>
                      <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Investor Type</label>
                          <select
                            name="investorType"
                            required
                            className={styles.select}
                            value={form.investorType}
                            onChange={handleChange}
                          >
                            <option value="">Select Investor Type</option>
                            <option value="Angel">Angel Investor</option>
                            <option value="VC">Venture Capitalist</option>
                            <option value="Strategic">Strategic Partner</option>
                            <option value="Partner">Operational Partner</option>
                          </select>
                        </div>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Industry Interest</label>
                          <select
                            name="industryInterest"
                            required
                            className={styles.select}
                            value={form.industryInterest}
                            onChange={handleChange}
                          >
                            <option value="">Select Industry Interest</option>
                            <option value="HealthTech">HealthTech</option>
                            <option value="Fitness">Fitness & Training</option>
                            <option value="Wellness">Wellness & Longevity</option>
                            <option value="SaaS">SaaS Platforms</option>
                            <option value="All">All of the above</option>
                          </select>
                        </div>
                      </div>

                      <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Preferred Investment Range</label>
                          <select
                            name="range"
                            required
                            className={styles.select}
                            value={form.range}
                            onChange={handleChange}
                          >
                            <option value="">Select Range</option>
                            <option value="₹5L – ₹25L">₹5L – ₹25L</option>
                            <option value="₹25L – ₹1Cr">₹25L – ₹1Cr</option>
                            <option value="₹1Cr+">₹1Cr+</option>
                          </select>
                        </div>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Investment Type</label>
                          <select
                            name="investmentType"
                            required
                            className={styles.select}
                            value={form.investmentType}
                            onChange={handleChange}
                          >
                            <option value="">Select Investment Type</option>
                            <option value="Equity">Equity</option>
                            <option value="Partnership">Partnership</option>
                            <option value="Strategic Collaboration">Strategic Collaboration</option>
                          </select>
                        </div>
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Investment Experience</label>
                        <select
                          name="experience"
                          required
                          className={styles.select}
                          value={form.experience}
                          onChange={handleChange}
                        >
                          <option value="">Select Experience Level</option>
                          <option value="Beginner">Beginner (1-2 Investments)</option>
                          <option value="Experienced">Experienced (Active Portfolio)</option>
                          <option value="Fund">Representing a Venture Fund</option>
                        </select>
                      </div>
                    </div>

                    {/* SECTION: Alignment Questions */}
                    <div className={styles.formFieldSection}>
                      <h4 className={styles.fieldSectionTitle}>Alignment</h4>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>What interests you about Mr. Coach?</label>
                        <textarea
                          name="whyMrCoach"
                          required
                          rows={3}
                          placeholder="Tell us what captured your attention..."
                          className={styles.textarea}
                          value={form.whyMrCoach}
                          onChange={handleChange}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>How do you see yourself contributing beyond capital?</label>
                        <textarea
                          name="beyondCapital"
                          required
                          rows={3}
                          placeholder="e.g. Strategic advice, hiring connections, industry partnerships..."
                          className={styles.textarea}
                          value={form.beyondCapital}
                          onChange={handleChange}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Expected ROI / Exit Preference (Optional)</label>
                        <input
                          type="text"
                          name="expectedRoi"
                          placeholder="e.g. 5x within 4 years, long-term dividends..."
                          className={styles.input}
                          value={form.expectedRoi}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      <Send size={18} />
                      <span>Send Application</span>
                      <ChevronRight size={16} className={styles.arrow} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
