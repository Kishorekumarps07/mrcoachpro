'use client';

import React from 'react';
import Image from 'next/image';
import styles from './AppDownloadBanner.module.css';

export const AppDownloadBanner = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>
                        Get the <span className={styles.highlight}>Mr.Coach App</span> for a Seamless Experience!
                    </h2>
                    <p className={styles.subtitle}>
                        Book Coaches, Manage Sessions, and Track your Performance on the go.
                    </p>

                    <div className={styles.storeButtons}>
                        {/* Google Play */}
                        <a
                            href="https://play.google.com/store/apps/details?id=fitness.mrcoach.india"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.storeLink}
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Get it on Google Play"
                                className={styles.storeBadge}
                            />
                        </a>

                        {/* App Store (Placeholder) */}
                        <a
                            href="#"
                            className={styles.storeLink}
                            onClick={(e) => e.preventDefault()}
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                alt="Download on the App Store"
                                className={styles.storeBadge}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
