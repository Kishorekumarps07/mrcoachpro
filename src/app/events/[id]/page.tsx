import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { EventDetailView } from '@/components/events/EventDetailView';
import { eventService } from '@/services/eventService';

// Remove generateStaticParams for now to allow dynamic fetching of new events
// export async function generateStaticParams() { ... }

interface EventPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
    const { id } = await params;
    const event = await eventService.getEventById(id);

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
    const event = await eventService.getEventById(id);

    if (!event) {
        notFound();
    }

    return <EventDetailView event={event} />;
}
