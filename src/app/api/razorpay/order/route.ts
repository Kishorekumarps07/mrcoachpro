import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
    try {
        const { amount, currency = 'INR', notes } = await req.json();

        if (!amount) {
            return NextResponse.json(
                { error: 'Amount is required' },
                { status: 400 }
            );
        }

        const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        const key_secret = process.env.RAZORPAY_KEY_SECRET;

        if (!key_id || !key_secret) {
            console.error("Razorpay Keys are missing from environment variables");
            return NextResponse.json(
                { error: 'Payment gateway is not configured securely.' },
                { status: 500 }
            );
        }

        const razorpay = new Razorpay({
            key_id,
            key_secret,
        });

        const options: any = {
            amount: Math.round(amount * 100), // Razorpay expects amount in smallest currency sub-unit (e.g., paise)
            currency,
            receipt: `receipt_order_${Math.random() * 10000}`,
            payment_capture: 1, // Auto capture
        };

        if (notes) {
            options.notes = notes;
        }

        const order = await razorpay.orders.create(options);

        return NextResponse.json({ order }, { status: 200 });
    } catch (error: any) {
        console.error("Error creating Razorpay order", error);
        return NextResponse.json(
            { error: error.message || 'Error creating Razorpay order' },
            { status: 500 }
        );
    }
}
