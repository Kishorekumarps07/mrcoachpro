import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import styles from './terms.module.css';

export default function TermsPage() {
    return (
        <main className={styles.main}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Terms and Conditions</h1>
                    <p className={styles.date}>Last updated on Mar 26th 2024</p>
                </div>

                <div className={styles.content}>
                    <p className={styles.paragraph}>
                        For the purpose of these Terms and Conditions, The term <strong>“we”</strong>, <strong>“us”</strong>, <strong>“our”</strong> used anywhere on this page shall mean <strong>Mr.COACH FIT</strong>, whose registered/operational office is 38A/98, KalathuMettu Street, Chengalpattu, Chengalpattu Chengalpattu TAMIL NADU 603002 . <strong>“you”</strong>, <strong>“your”</strong>, <strong>“user”</strong>, <strong>“visitor”</strong> shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
                    </p>

                    <p className={styles.paragraph}>
                        Your use of the website and/or purchase from us are governed by following Terms and Conditions:
                    </p>

                    <ul className={styles.list}>
                        <li className={styles.listItem}>The content of the pages of this website is subject to change without notice.</li>
                        <li className={styles.listItem}>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                        <li className={styles.listItem}>Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.</li>
                        <li className={styles.listItem}>Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
                        <li className={styles.listItem}>All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.</li>
                        <li className={styles.listItem}>Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.</li>
                        <li className={styles.listItem}>From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.</li>
                        <li className={styles.listItem}>You may not create a link to our website from another website or document without Mr.COACH FIT’s prior written consent.</li>
                        <li className={styles.listItem}>Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India .</li>
                        <li className={styles.listItem}>We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time</li>
                    </ul>

                    <p className={styles.disclaimer}>
                        Disclaimer: The above content is created at Mr.COACH FIT’s sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to merchant’s non-adherence to it.
                    </p>
                </div>
            </div>
        </main>
    );
}
