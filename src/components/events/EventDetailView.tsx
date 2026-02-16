'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Event } from '@/data/events';
import { Calendar, Clock, MapPin, Users, Share2, CheckCircle, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import styles from './EventDetailView.module.css';

interface EventDetailViewProps {
    event: Event;
}

export const EventDetailView = ({ event }: EventDetailViewProps) => {
    const router = useRouter();

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: event.title,
                    text: event.description,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        }
    };

    return (
        <main className={styles.main}>
            <Navbar />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroImage}>
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className={styles.image}
                        priority
                    />
                    <div className={styles.heroOverlay} />
                </div>
                <div className={styles.heroContent}>
                    <div className={styles.container}>
                        <div className={styles.categoryBadge}>{event.category}</div>
                        <h1 className={styles.title}>{event.title}</h1>
                        <div className={styles.metaInfo}>
                            <div className={styles.metaItem}>
                                <Calendar size={20} />
                                <span>{event.date} at {event.time}</span>
                            </div>
                            <div className={styles.metaItem}>
                                <MapPin size={20} />
                                <span>{event.location}</span>
                            </div>
                            <div className={styles.metaItem}>
                                <Users size={20} />
                                <span>{event.spotsLeft} / {event.capacity} spots left</span>
                            </div>
                        </div>
                        <button onClick={handleShare} className={styles.shareButton}>
                            <Share2 size={18} />
                            Share Event
                        </button>
                    </div>
                </div>
            </section>

            <div className={styles.container}>
                <div className={styles.contentGrid}>
                    {/* Main Content */}
                    <div className={styles.mainContent}>
                        {/* Description */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>About This Event</h2>
                            {event.detailedDescription.map((paragraph, index) => (
                                <p key={index} className={styles.paragraph}>{paragraph}</p>
                            ))}
                        </section>

                        {/* Highlights */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Event Highlights</h2>
                            <ul className={styles.highlightsList}>
                                {event.highlights.map((highlight, index) => (
                                    <li key={index} className={styles.highlightItem}>
                                        <CheckCircle size={20} className={styles.checkIcon} />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Agenda */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Event Schedule</h2>
                            <div className={styles.agenda}>
                                {event.agenda.map((item, index) => (
                                    <div key={index} className={styles.agendaItem}>
                                        <div className={styles.agendaTime}>
                                            <Clock size={16} />
                                            {item.time}
                                        </div>
                                        <div className={styles.agendaContent}>
                                            <h4 className={styles.agendaTitle}>{item.title}</h4>
                                            <p className={styles.agendaDescription}>{item.description}</p>
                                            {item.speaker && (
                                                <p className={styles.agendaSpeaker}>Speaker: {item.speaker}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Organizer */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Meet the Organizer</h2>
                            <div className={styles.organizerCard}>
                                {/* Use standard img tag to bypass Next/Image optimization issues */}
                                <img
                                    src={event.organizer.image}
                                    alt={event.organizer.name}
                                    width={80}
                                    height={80}
                                    className={styles.organizerImage}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/images/default-organizer.svg';
                                    }}
                                    referrerPolicy="no-referrer"
                                />
                                <div className={styles.organizerInfo}>
                                    <h3 className={styles.organizerName}>{event.organizer.name}</h3>
                                    <p className={styles.organizerRole}>{event.organizer.role}</p>
                                    <p className={styles.organizerBio}>{event.organizer.bio}</p>
                                    {event.organizer.credentials && (
                                        <ul className={styles.credentials}>
                                            {event.organizer.credentials.map((cred, index) => (
                                                <li key={index} className={styles.credential}>{cred}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Testimonials */}
                        {event.testimonials && event.testimonials.length > 0 && (
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>What Participants Say</h2>
                                <div className={styles.testimonials}>
                                    {event.testimonials.map((testimonial, index) => (
                                        <div key={index} className={styles.testimonialCard}>
                                            {testimonial.image && (
                                                <Image
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    width={50}
                                                    height={50}
                                                    className={styles.testimonialImage}
                                                />
                                            )}
                                            <div className={styles.testimonialContent}>
                                                <p className={styles.testimonialText}>"{testimonial.content}"</p>
                                                <p className={styles.testimonialAuthor}>
                                                    <strong>{testimonial.name}</strong> - {testimonial.role}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        {/* Pricing */}
                        <div className={styles.pricingCard}>
                            <h3 className={styles.pricingTitle}>Select Your Ticket</h3>
                            {event.pricingTiers.map((tier, index) => (
                                <div
                                    key={index}
                                    className={`${styles.pricingTier} ${styles.clickableTier}`}
                                    onClick={() => router.push(`/events/${event.id}/register?tier=${index}`)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <div className={styles.tierHeader}>
                                        <h4 className={styles.tierName}>{tier.name}</h4>
                                        <p className={styles.tierPrice}>{tier.price}</p>
                                    </div>
                                    <p className={styles.tierDescription}>{tier.description}</p>
                                    <ul className={styles.tierFeatures}>
                                        {tier.features.map((feature, idx) => (
                                            <li key={idx} className={styles.tierFeature}>
                                                <CheckCircle size={14} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <Button
                                fullWidth
                                size="lg"
                                onClick={() => router.push(`/events/${event.id}/register?tier=0`)} // Default to first tier
                                className={styles.registerButton}
                            >
                                Register Now
                            </Button>
                            <p className={styles.deadline}>
                                Registration closes: {event.registrationDeadline}
                            </p>
                        </div>

                        {/* Bulk / Corporate Booking */}
                        <div className={styles.bulkBookingCard}>
                            <div className={styles.bulkIconWrapper}>
                                <div className={styles.bulkIconCircle}>
                                    <Building2 size={24} className={styles.bulkIcon} />
                                </div>
                            </div>
                            <h3 className={styles.bulkTitle}>Corporate & Bulk Booking</h3>
                            <p className={styles.bulkText}>
                                Planning to bring your team? Get exclusive discounts and custom packages for groups of 10 or more.
                            </p>
                            <Button
                                fullWidth
                                variant="secondary"
                                className={styles.bulkButton}
                                onClick={() => window.location.href = 'mailto:corporate@mrcoach.in?subject=Bulk Booking Inquiry'}
                            >
                                Get Corporate Quote
                            </Button>
                        </div>

                        {/* Event Tags */}
                        <div className={styles.tagsCard}>
                            <h4 className={styles.tagsTitle}>Event Tags</h4>
                            <div className={styles.tags}>
                                {event.tags.map((tag, index) => (
                                    <span key={index} className={styles.tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Mobile Sticky CTA */}
            <div className={styles.mobileStickyCta}>
                <div className={styles.mobileCtaContent}>
                    <div className={styles.mobileCtaInfo}>
                        <span className={styles.mobileCtaPrice}>{event.pricingTiers[0].price}</span>
                        <span className={styles.mobileCtaLabel}>Onwards</span>
                    </div>
                    <Button
                        size="md"
                        onClick={() => router.push(`/events/${event.id}/register`)}
                        className={styles.mobileRegisterBtn}
                    >
                        Register Now
                    </Button>
                </div>
            </div>
        </main >
    );
};
