import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { EVENTS } from '@/data/events';
import { EventDetailView } from '@/components/events/EventDetailView';

// Generate static params for all known events (optional for SSG, good for performance)
export async function generateStaticParams() {
    return EVENTS.map((event) => ({
        id: event.id,
    }));
}

interface EventPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
    const { id } = await params;
    const event = EVENTS.find((e) => e.id === id);

    if (!event) {
        return {
            title: 'Event Not Found | MR.COACH',
        };
    }

    return {
        title: `${event.title} | MR.COACH`,
        description: event.description,
        openGraph: {
            title: event.title,
            description: event.description,
            images: [event.image],
        },
    };
}

export default async function EventPage({ params }: EventPageProps) {
    const { id } = await params;
    const event = EVENTS.find((e) => e.id === id);

    if (!event) {
        notFound();
    }

    return <EventDetailView event={event} />;
}
