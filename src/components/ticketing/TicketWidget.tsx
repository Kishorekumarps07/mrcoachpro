"use client";

import React, { useState, useRef } from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";
import styles from "./TicketWidget.module.css";

export function TicketWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [category, setCategory] = useState("Technical Issue");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const nodeRef = useRef<HTMLDivElement>(null);

    // We need to differentiate between a click (to open) and a drag (to move)
    // react-draggable fires onStart, onDrag, onStop
    const handleDragStart: DraggableEventHandler = (e, data) => {
        setIsDragging(false);
        setDragStartPos({ x: data.x, y: data.y });
    };

    const handleDrag: DraggableEventHandler = (e, data) => {
        const dx = Math.abs(data.x - dragStartPos.x);
        const dy = Math.abs(data.y - dragStartPos.y);

        // Only consider it a drag if moved more than 5 pixels
        if (dx > 5 || dy > 5) {
            setIsDragging(true);
        }
    };

    const handleDragStop: DraggableEventHandler = (e, data) => {
        const dx = Math.abs(data.x - dragStartPos.x);
        const dy = Math.abs(data.y - dragStartPos.y);

        // If it's a tap (moved less than 5px) and it's currently closed, open it.
        if (dx < 5 && dy < 5 && !isOpen) {
            setIsOpen(true);
        }

        // Delay resetting isDragging so that no accidental clicks are caught
        setTimeout(() => {
            setIsDragging(false);
        }, 100);
    };

    const toggleOpen = () => {
        if (!isDragging) {
            setIsOpen(!isOpen);
            if (isOpen) {
                setIsSuccess(false);
                setErrorMessage("");
                setSubject("");
                setDescription("");
                setCustomerName("");
                setCustomerEmail("");
                setCustomerPhone("");
                setPriority("Medium");
                setCategory("Technical Issue");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            // Append priority and category to the message since the API only accepts 'message'
            const formattedMessage = `[Priority: ${priority}] [Category: ${category}]\n\n${description}`;

            const response = await fetch('https://promptix-backend-uxgf.onrender.com/api/external/create-ticket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-support-api-key': 'MRCOACH_SUPPORT_KEY'
                },
                body: JSON.stringify({
                    name: customerName,
                    email: customerEmail,
                    phone: customerPhone || undefined,
                    subject: subject || "Website Inquiry",
                    message: formattedMessage,
                    source: "Floating Widget"
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to submit ticket");
            }

            // Success state
            setIsSuccess(true);
            setSubject("");
            setDescription("");
            setCustomerName("");
            setCustomerEmail("");
            setCustomerPhone("");
            setPriority("Medium");
            setCategory("Technical Issue");
        } catch (error: any) {
            console.error("Ticketing Error:", error);
            setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            handle={isOpen ? `.${styles.dragHandle}` : undefined} // Drag by header when open, whole button when closed
            onStart={handleDragStart}
            onDrag={handleDrag}
            onStop={handleDragStop}
        >
            <div
                ref={nodeRef}
                className={`${styles.draggableContainer} ${isDragging ? styles.isDragging : ''}`}
            >
                {!isOpen ? (
                    <div
                        className={styles.chatButton}
                        aria-label="Raise a ticket"
                        role="button"
                        tabIndex={0}
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                    </div>
                ) : (
                    <div className={styles.widgetPanel}>
                        {/* Draggable Header */}
                        <div className={styles.dragHandle}>
                            <h3 className={styles.headerTitle}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                                Raise a Ticket
                            </h3>
                            <button
                                className={styles.closeButton}
                                onClick={toggleOpen}
                                aria-label="Close"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Form Body - Not draggable so users can select text/click inputs normally */}
                        <div className={styles.panelBody}>
                            {isSuccess ? (
                                <div className={styles.statusMessage}>
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                    <span className={styles.successText}>Ticket Submitted!</span>
                                    <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Our support team will get back to you shortly.</p>
                                    <button
                                        className={styles.submitBtn}
                                        style={{ background: '#333', marginTop: '16px' }}
                                        onClick={() => setIsSuccess(false)}
                                    >
                                        Raise Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {errorMessage && (
                                        <div style={{ color: '#d9534f', backgroundColor: '#fdf7f7', border: '1px solid #d9534f', padding: '10px', borderRadius: '6px', fontSize: '13px' }}>
                                            {errorMessage}
                                        </div>
                                    )}
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="ticket-name" className={styles.label}>Customer Name *</label>
                                        <input
                                            id="ticket-name"
                                            type="text"
                                            required
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            className={styles.inputField}
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="ticket-email" className={styles.label}>Customer Email *</label>
                                        <input
                                            id="ticket-email"
                                            type="email"
                                            required
                                            value={customerEmail}
                                            onChange={(e) => setCustomerEmail(e.target.value)}
                                            className={styles.inputField}
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="ticket-phone" className={styles.label}>Customer Phone</label>
                                        <input
                                            id="ticket-phone"
                                            type="tel"
                                            value={customerPhone}
                                            onChange={(e) => setCustomerPhone(e.target.value)}
                                            className={styles.inputField}
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="ticket-subject" className={styles.label}>Subject / Title *</label>
                                        <input
                                            id="ticket-subject"
                                            type="text"
                                            required
                                            placeholder="Demo Submit Issue"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            className={styles.inputField}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <div className={styles.inputGroup} style={{ flex: 1 }}>
                                            <label htmlFor="ticket-priority" className={styles.label}>Priority</label>
                                            <select
                                                id="ticket-priority"
                                                value={priority}
                                                onChange={(e) => setPriority(e.target.value)}
                                                className={styles.inputField}
                                            >
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </select>
                                        </div>
                                        <div className={styles.inputGroup} style={{ flex: 1 }}>
                                            <label htmlFor="ticket-category" className={styles.label}>Category</label>
                                            <select
                                                id="ticket-category"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className={styles.inputField}
                                            >
                                                <option value="Technical Issue">Technical Issue</option>
                                                <option value="Billing">Billing</option>
                                                <option value="General Inquiry">General Inquiry</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="ticket-desc" className={styles.label}>Description & Notes *</label>
                                        <textarea
                                            id="ticket-desc"
                                            required
                                            placeholder="The demo button is not working!!"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className={styles.inputField}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className={styles.submitBtn}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Draggable>
    );
}
