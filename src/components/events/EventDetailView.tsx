'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Event } from '@/data/events';
import { Calendar, Clock, MapPin, Users, Share2, CheckCircle, Building2, Globe, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import styles from './EventDetailView.module.css';

interface EventDetailViewProps {
    event: Event;
}

export const EventDetailView = ({ event }: EventDetailViewProps) => {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, mins: 0, secs: 0 });

    React.useEffect(() => {
        if (!event) return;

        const calculateTimeLeft = () => {
            let targetDate = new Date();
            if (event.isoDate) {
                targetDate = new Date(event.isoDate);
                if (event.time) {
                    const timeParts = event.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
                    if (timeParts) {
                        let hours = parseInt(timeParts[1]);
                        const minutes = parseInt(timeParts[2]);
                        const ampm = timeParts[3].toUpperCase();
                        if (ampm === 'PM' && hours < 12) hours += 12;
                        if (ampm === 'AM' && hours === 12) hours = 0;
                        targetDate.setHours(hours, minutes, 0, 0);
                    }
                }
            } else {
                return { days: 0, hours: 0, mins: 0, secs: 0 };
            }

            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    mins: Math.floor((difference / 1000 / 60) % 60),
                    secs: Math.floor((difference / 1000) % 60)
                };
            }
            return { days: 0, hours: 0, mins: 0, secs: 0 };
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [event]);

    const fmt = (n: number) => n.toString().padStart(2, '0');

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
            {/* Nuclear suppression for global mobile nav on this page to avoid overlaps */}
            <style dangerouslySetInnerHTML={{
                __html: `
                #mobile-bottom-nav,
                nav[class*="MobileBottomNav_bottomNav"], 
                [class*="MobileBottomNav_bottomNav"],
                .MobileBottomNav_bottomNav__* { 
                    display: none !important; 
                    visibility: hidden !important; 
                    opacity: 0 !important; 
                    pointer-events: none !important;
                    height: 0 !important;
                    width: 0 !important;
                    position: absolute !important;
                    clip-path: circle(0) !important;
                }
            ` }} />
            <Navbar />

            {/* Fixed Back Button */}
            <button 
                className={styles.backButtonFixed} 
                onClick={() => router.push('/events')}
                aria-label="Back to Events"
            >
                <ArrowLeft size={24} />
            </button>

            {/* Clean White Split Hero Section */}
            <section className={styles.hero}>
                <div className={styles.blurBackground}>
                    <Image
                        src={event.image}
                        alt="Background"
                        fill
                        className={styles.bgImage}
                        priority
                    />
                    <div className={styles.bgOverlay} />
                </div>

                <div className={styles.container}>
                    <div className={styles.contentGrid}>
                        {/* Left Side: Content */}
                        <div className={styles.heroContent}>
                            <div className={styles.dateBadge}>
                                <Calendar size={14} className="mr-2" />
                                {event.date}, {event.time}
                            </div>
                            <h1 className={styles.title}>{event.title}</h1>
                            <div className={styles.metaInfo}>
                                <MapPin size={16} className={styles.metaIcon} />
                                {event.location}
                            </div>


                            {/* Countdown Timer */}
                            <div className={styles.countdownWrapper}>
                                <div className={styles.timerBlock}>
                                    <span className={styles.timerValue}>{fmt(timeLeft.days)}</span>
                                    <span className={styles.timerLabel}>Days</span>
                                </div>
                                <span className={styles.timerSeparator}>:</span>
                                <div className={styles.timerBlock}>
                                    <span className={styles.timerValue}>{fmt(timeLeft.hours)}</span>
                                    <span className={styles.timerLabel}>Hrs</span>
                                </div>
                                <span className={styles.timerSeparator}>:</span>
                                <div className={styles.timerBlock}>
                                    <span className={styles.timerValue}>{fmt(timeLeft.mins)}</span>
                                    <span className={styles.timerLabel}>Mins</span>
                                </div>
                                <span className={styles.timerSeparator}>:</span>
                                <div className={styles.timerBlock}>
                                    <span className={styles.timerValue}>{fmt(timeLeft.secs)}</span>
                                    <span className={styles.timerLabel}>Secs</span>
                                </div>
                            </div>

                            <div className={styles.ctaGroup}>
                                <div className={styles.priceInfo}>
                                    <p className={styles.priceLabel}>Entry Starts From</p>
                                    <div className={styles.priceHighlight}>
                                        {event.pricingTiers[0].price} <span>per person</span>
                                    </div>
                                </div>

                                <div className={styles.actionButtons}>
                                    <button
                                        onClick={() => router.push(`/events/${event.id}/register`)}
                                        className={styles.registerButtonHero}
                                    >
                                        Book Tickets
                                    </button>
                                    <button onClick={handleShare} className={styles.shareButton}>
                                        <Share2 size={18} />
                                        Share
                                    </button>
                                </div>
                            </div>

                            {/* Summary moved below for professional mobile flow priority */}
                            <p className={styles.summary}>{event.description}</p>
                        </div>

                        {/* Right Side: Image */}
                        <div className={styles.heroImageWrapper}>
                            <div className={styles.posterWrapper}>
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className={styles.heroImage}
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Registration Urgency Banner (Mobile only styled in CSS) */}
                <div className={styles.urgencyText}>
                    Hurry! Secure Your Spot – Registration Closes Soon
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
                                onClick={() => router.push(`/events/${event.id}/register?tier=0`)}
                                className={styles.registerButton}
                            >
                                Register Now
                            </Button>
                            <div className={styles.deadline}>
                                <Clock size={14} className="mr-1" />
                                Registration closes: {new Date(event.registrationDeadline).toLocaleDateString('en-US', { 
                                    day: 'numeric', 
                                    month: 'long', 
                                    year: 'numeric' 
                                })}
                            </div>
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
        </main>
    );
};
