import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.mrcoachpro.in/api';
        const externalApiUrl = `${API_BASE_URL}/users/receive`;

        // Public API - no authentication required
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'MrCoachPro-Web/1.0'
        };

        const response = await fetch(externalApiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
            cache: 'no-store'
        });

        // Read raw text first to avoid JSON parse errors crashing the route
        const responseText = await response.text();
        console.log('External API Status:', response.status);
        console.log('External API Body:', responseText);

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.warn('Failed to parse external API JSON:', e);
            console.warn('Raw external API response:', responseText);
            data = { raw_response: responseText, parse_error: String(e) };
        }

        // If data is somehow null/undefined (e.g. empty response body), default to empty object
        if (!data) data = {};

        if (!response.ok) {
            console.error('External API Request Failed', data);
            return NextResponse.json(
                {
                    success: false,
                    message: data.message || `External API Error: ${response.status}`,
                    details: data
                },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('CRITICAL PROXY ERROR:', error);
        if (error.cause) console.error('Error Cause:', error.cause);

        return NextResponse.json(
            {
                success: false,
                message: `Internal Proxy Error: ${error.message}`,
                debug: error.cause ? String(error.cause) : undefined
            },
            { status: 500 }
        );
    }
}
