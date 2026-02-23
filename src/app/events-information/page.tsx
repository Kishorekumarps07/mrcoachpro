import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import {
    Calendar,
    Trophy,
    Dumbbell,
    Smartphone,
    ClipboardList,
    AlertCircle,
    Timer,
    CheckCircle2,
    Bike,
    Footprints,
    Target,
    Activity,
    Users,
    Sticker
} from 'lucide-react';
import styles from './events.module.css';

export const metadata = {
    title: 'Events Information | MR.COACH',
    description: 'Explore upcoming sports and fitness events hosted by MrCoachPro.'
};

export default function EventsInfoPage() {
    return (
        <main className={styles.main}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.header}>
                    <Calendar className={styles.headerIcon} />
                    <h1 className={styles.title}>Upcoming Sports & Fitness Events</h1>
                </div>

                <div className={styles.content}>
                    <p className={styles.paragraph}>
                        🌟 MrCoachPro hosts a wide range of sports competitions, fitness challenges, and performance workshops designed for athletes, teams, and active individuals.
                    </p>

                    <h2 className={styles.sectionTitle}>
                        <Trophy className={styles.sectionIcon} />
                        Sports Events 🏆
                    </h2>

                    <div className={styles.subSections}>
                        <div className={styles.subSection}>
                            <h3 className={styles.subSectionTitle}>
                                <Footprints className={styles.itemIcon} size={18} />
                                Marathons & Running Events 🏃‍♂️
                            </h3>
                            <p className={styles.paragraph}>5K, 10K, half marathons, endurance runs, and race preparation programs.</p>
                        </div>

                        <div className={styles.subSection}>
                            <h3 className={styles.subSectionTitle}>
                                <Bike className={styles.itemIcon} size={18} />
                                Cycling Events 🚴‍♀️
                            </h3>
                            <p className={styles.paragraph}>Road cycling, endurance rides, time trials, and hill challenges.</p>
                        </div>

                        <div className={styles.subSection}>
                            <h3 className={styles.subSectionTitle}>
                                <Target className={styles.itemIcon} size={18} />
                                Football Matches & Tournaments ⚽
                            </h3>
                            <p className={styles.paragraph}>Friendly matches, leagues, knockout tournaments, and skill-based games.</p>
                        </div>

                        <div className={styles.subSection}>
                            <h3 className={styles.subSectionTitle}>
                                <Target className={styles.itemIcon} size={18} />
                                Cricket Tournaments 🏏
                            </h3>
                            <p className={styles.paragraph}>Practice matches, league formats, knockout tournaments, and team competitions.</p>
                        </div>

                        <div className={styles.subSection}>
                            <h3 className={styles.subSectionTitle}>
                                <Activity className={styles.itemIcon} size={18} />
                                Badminton Tournaments 🏸
                            </h3>
                            <p className={styles.paragraph}>Singles, doubles, and mixed category competitions.</p>
                        </div>
                    </div>

                    <h2 className={styles.sectionTitle}>
                        <Dumbbell className={styles.sectionIcon} />
                        Fitness & Training Events 💪
                    </h2>

                    <div className={styles.subSections}>
                        <div className={styles.subSection}>
                            <h3 className={styles.subSectionTitle}>🔥 Strength & Conditioning</h3>
                            <p className={styles.paragraph}>Muscle building, functional strength, and athletic conditioning.</p>
                        </div>
                        <div className={styles.subSection}>
                            <h3 className={styles.subSectionTitle}>⚡ HIIT & Cross Training</h3>
                            <p className={styles.paragraph}>High-intensity workouts focused on fat loss and endurance.</p>
                        </div>
                        <div className={styles.subSection}>
                            <h3 className={styles.subSectionTitle}>🧘 Yoga & Mobility</h3>
                            <p className={styles.paragraph}>Flexibility, recovery, balance, and injury prevention.</p>
                        </div>
                    </div>

                    <h2 className={styles.sectionTitle}>
                        <ClipboardList className={styles.sectionIcon} />
                        How Events Are Listed 📋
                    </h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><CheckCircle2 className={styles.checkIcon} size={18} /> Events appear once officially scheduled 🗓️</li>
                        <li className={styles.listItem}><CheckCircle2 className={styles.checkIcon} size={18} /> Each event shows date, time, coach, and details ℹ️</li>
                        <li className={styles.listItem}><CheckCircle2 className={styles.checkIcon} size={18} /> Some events may require coins or criteria 🪙</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>
                        <Users className={styles.sectionIcon} />
                        Registration & Participation 🤝
                    </h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><Timer className={styles.checkIcon} size={18} /> Limited slots for live sessions and tournaments ⏳</li>
                        <li className={styles.listItem}><Users className={styles.checkIcon} size={18} /> Team registration required for team sports 👥</li>
                        <li className={styles.listItem}><ClipboardList className={styles.checkIcon} size={18} /> Event rules are shared before confirmation 📜</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>
                        <AlertCircle className={styles.sectionIcon} />
                        No Upcoming Events? 🧐
                    </h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>📭 No events are currently scheduled</li>
                        <li className={styles.listItem}>🏗️ New sports or fitness programs are under preparation</li>
                        <li className={styles.listItem}>🔒 Registration for recent events has closed</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>
                        <Smartphone className={styles.sectionIcon} />
                        Mobile Experience 📱
                    </h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>✅ Optimized for mobile browsing and registration</li>
                        <li className={styles.listItem}>👆 Tap-to-register with minimal steps</li>
                        <li className={styles.listItem}>🔔 Enable notifications for instant updates</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>
                        <Sticker className={styles.sectionIcon} />
                        Important Guidelines ⚠️
                    </h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>🔸 One registration per user or team</li>
                        <li className={styles.listItem}>🔸 Missed events may not be refundable</li>
                        <li className={styles.listItem}>🔸 Schedules may change due to logistics or weather</li>
                    </ul>

                    <p className={styles.finalMessage}>
                        Join us and elevate your game! 🚀
                    </p>
                </div>
            </div>
        </main>
    );
}
