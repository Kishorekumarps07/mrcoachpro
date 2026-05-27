'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ChevronRight, 
  Send, 
  ArrowUpRight, 
  MessageSquare, 
  Calendar, 
  FileText 
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
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    const stepEl = document.getElementById(`step-${currentStep}`);
    if (stepEl) {
      const inputs = stepEl.querySelectorAll('input, select, textarea');
      let allValid = true;
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement || input instanceof HTMLTextAreaElement) {
          if (!input.checkValidity()) {
            input.reportValidity();
            allValid = false;
            break;
          }
        }
      }
      if (allValid) {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

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
      <div className={styles.splitLayout}>
        
        {/* ── LEFT COLUMN: PITCH DECK IMAGE ── */}
        <div className={styles.imageCol}>
          <div className={styles.stickyImageWrapper}>
            <Image
              src="/images/invest-banner.jpeg?v=2"
              alt="Invest in the Future of Fitness – MrCoachPro pitch deck"
              width={1200}
              height={675}
              className={styles.bannerImage}
              priority
            />
          </div>

          {/* Frictionless CTAs */}
          <div className={styles.ctaWrapper}>
            <div className={styles.ctaButtonsGroup}>
              <a href="/images/invest-banner.jpeg?v=2" target="_blank" rel="noopener noreferrer" className={styles.ctaLinkBtn}>
                <FileText size={18} />
                <span>Download Pitch Deck</span>
                <ArrowUpRight size={14} />
              </a>
              
              <a href="mailto:mrcoachofficial@gmail.com?subject=Schedule%20Investment%20Call" className={styles.ctaLinkBtn}>
                <Calendar size={18} />
                <span>Schedule a Call</span>
                <ArrowUpRight size={14} />
              </a>

              <a href="https://api.whatsapp.com/send/?phone=%2B917448421134&text=I%20am%20interested%20in%20Mr.%20Coach%20investment%20opportunities" target="_blank" rel="noopener noreferrer" className={`${styles.ctaLinkBtn} ${styles.whatsappBtn}`}>
                <MessageSquare size={18} />
                <span>WhatsApp Direct Connect</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: CONTENT & FORM ── */}
        <div className={styles.contentCol}>
          

          {/* Form Card */}
          <div className={styles.formCard}>
            {submitted ? (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Inquiry Drafted!</h3>
                <p className={styles.successDesc}>
                  Your application has been packaged and your email client opened. Our investor relations team will connect with you within 24 hours.
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
                  
                  {/* Progress Bar */}
                  <div className={styles.progressContainer}>
                    <div className={styles.progressText}>
                      <span>Step {currentStep} of 3</span>
                      <span>{currentStep === 1 ? 'Basic Details' : currentStep === 2 ? 'Investor Profile' : 'Alignment'}</span>
                    </div>
                    <div className={styles.progressBarBg}>
                      <div 
                        className={styles.progressBarFill} 
                        style={{ width: `${(currentStep / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Basic Details */}
                  <div className={`${styles.formFieldSection} ${currentStep === 1 ? styles.activeStep : styles.hiddenStep}`} id="step-1">
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

                  {/* Investor Profile */}
                  <div className={`${styles.formFieldSection} ${currentStep === 2 ? styles.activeStep : styles.hiddenStep}`} id="step-2">
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

                  {/* Alignment */}
                  <div className={`${styles.formFieldSection} ${currentStep === 3 ? styles.activeStep : styles.hiddenStep}`} id="step-3">
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

                  {/* Navigation Buttons */}
                  <div className={styles.formNavButtons}>
                    {currentStep > 1 && (
                      <button
                        type="button"
                        className={styles.prevBtn}
                        onClick={() => setCurrentStep((prev) => prev - 1)}
                      >
                        Back
                      </button>
                    )}
                    
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        className={styles.nextBtn}
                        onClick={handleNext}
                      >
                        Next Step
                      </button>
                    ) : (
                      <button type="submit" className={styles.submitBtn}>
                        <Send size={18} />
                        <span>Send Application</span>
                        <ChevronRight size={16} className={styles.arrow} />
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>



        </div>

      </div>
    </section>
  );
};
