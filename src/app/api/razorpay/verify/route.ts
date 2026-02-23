import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        const key_secret = process.env.RAZORPAY_KEY_SECRET;

        if (!key_secret) {
            return NextResponse.json(
                { error: 'Payment gateway is not configured securely.' },
                { status: 500 }
            );
        }

        const generated_signature = crypto
            .createHmac('sha256', key_secret)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            return NextResponse.json({ message: 'Payment verified successfully', verified: true }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Payment verification failed', verified: false }, { status: 400 });
        }
    } catch (error: any) {
        console.error("Error verifying payment", error);
        return NextResponse.json(
            { error: error.message || 'Error verifying payment' },
            { status: 500 }
        );
    }
}
