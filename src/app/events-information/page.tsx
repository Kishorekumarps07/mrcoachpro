import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
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
                    <h1 className={styles.title}>Upcoming Sports & Fitness Events</h1>
                </div>

                <div className={styles.content}>
                    <p className={styles.paragraph}>
                        MrCoachPro hosts a wide range of sports competitions, fitness challenges, and performance workshops designed for athletes, teams, and active individuals.
                    </p>

                    <h2 className={styles.sectionTitle}>Sports Events</h2>

                    <h3 className={styles.subSectionTitle}>Marathons & Running Events</h3>
                    <p className={styles.paragraph}>5K, 10K, half marathons, endurance runs, and race preparation programs.</p>

                    <h3 className={styles.subSectionTitle}>Cycling Events</h3>
                    <p className={styles.paragraph}>Road cycling, endurance rides, time trials, and hill challenges.</p>

                    <h3 className={styles.subSectionTitle}>Football Matches & Tournaments</h3>
                    <p className={styles.paragraph}>Friendly matches, leagues, knockout tournaments, and skill-based games.</p>

                    <h3 className={styles.subSectionTitle}>Cricket Tournaments</h3>
                    <p className={styles.paragraph}>Practice matches, league formats, knockout tournaments, and team competitions.</p>

                    <h3 className={styles.subSectionTitle}>Badminton Tournaments</h3>
                    <p className={styles.paragraph}>Singles, doubles, and mixed category competitions.</p>

                    <h3 className={styles.subSectionTitle}>Basketball Games & Leagues</h3>
                    <p className={styles.paragraph}>Friendly games, leagues, and skill development matches.</p>

                    <h3 className={styles.subSectionTitle}>Volleyball Matches</h3>
                    <p className={styles.paragraph}>Indoor and outdoor volleyball tournaments.</p>

                    <h3 className={styles.subSectionTitle}>Tennis Events</h3>
                    <p className={styles.paragraph}>Singles and doubles tennis matches and training events.</p>

                    <h3 className={styles.subSectionTitle}>Athletics Meets</h3>
                    <p className={styles.paragraph}>Track and field events including sprints, long jump, and relays.</p>

                    <h2 className={styles.sectionTitle}>Fitness & Training Events</h2>

                    <h3 className={styles.subSectionTitle}>Strength & Conditioning Workshops</h3>
                    <p className={styles.paragraph}>Muscle building, functional strength, and athletic conditioning.</p>

                    <h3 className={styles.subSectionTitle}>HIIT & Cross Training Sessions</h3>
                    <p className={styles.paragraph}>High-intensity workouts focused on fat loss and endurance.</p>

                    <h3 className={styles.subSectionTitle}>Yoga & Mobility Workshops</h3>
                    <p className={styles.paragraph}>Flexibility, recovery, balance, and injury prevention.</p>

                    <h3 className={styles.subSectionTitle}>Weight Loss & Transformation Programs</h3>
                    <p className={styles.paragraph}>Time-bound fitness challenges with guided training.</p>

                    <h3 className={styles.subSectionTitle}>Bootcamps</h3>
                    <p className={styles.paragraph}>Outdoor and indoor group fitness bootcamps.</p>

                    <h3 className={styles.subSectionTitle}>Sports-Specific Training Camps</h3>
                    <p className={styles.paragraph}>Performance training for football, cricket, running, and cycling.</p>

                    <h3 className={styles.subSectionTitle}>Recovery & Rehab Sessions</h3>
                    <p className={styles.paragraph}>Stretching, mobility, and sports recovery workshops.</p>

                    <h2 className={styles.sectionTitle}>How Events Are Listed</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Events appear once officially scheduled</li>
                        <li className={styles.listItem}>Each event shows date, time, coach, and registration details</li>
                        <li className={styles.listItem}>Some events may require coins or eligibility criteria</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>Registration & Participation</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Limited slots for live sessions and tournaments</li>
                        <li className={styles.listItem}>Team registration required for team sports</li>
                        <li className={styles.listItem}>Event rules are shared before confirmation</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>When You See “No Upcoming Events”</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>No events are currently scheduled</li>
                        <li className={styles.listItem}>New sports or fitness programs are under preparation</li>
                        <li className={styles.listItem}>Registration for recent events has closed</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>Mobile Experience</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Optimized for mobile browsing and registration</li>
                        <li className={styles.listItem}>Tap-to-register with minimal steps</li>
                        <li className={styles.listItem}>Enable notifications for instant updates</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>Important Guidelines</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>One registration per user or team</li>
                        <li className={styles.listItem}>Missed events may not be refundable</li>
                        <li className={styles.listItem}>Event schedules may change due to logistics or weather</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
