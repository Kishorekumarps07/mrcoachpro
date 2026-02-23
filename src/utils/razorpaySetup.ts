export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        // Check if script is already injected
        if (document.getElementById('razorpay-js')) {
            resolve(true);
            return;
        }

        const script = document.createElement("script");
        script.id = 'razorpay-js';
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export interface RazorpayOptions {
    amount: number; // in INR
    name?: string;
    description?: string;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    onSuccess?: (paymentId: string) => void;
    onError?: (error: any) => void;
}

export const initializeRazorpayPayment = async ({
    amount,
    name = "Mr Coach Pro",
    description = "Purchase",
    prefill,
    onSuccess,
    onError,
}: RazorpayOptions) => {
    const res = await loadRazorpayScript();

    if (!res) {
        if (onError) onError(new Error("Razorpay SDK failed to load. Are you online?"));
        else alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    try {
        // 1. Create order on your backend
        const orderResponse = await fetch("/api/razorpay/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount, currency: "INR" }),
        });

        const orderData = await orderResponse.json();

        if (!orderResponse.ok) {
            throw new Error(orderData.error || "Failed to create order");
        }

        // 2. Initialize Razorpay
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use NEXT_PUBLIC_RAZORPAY_KEY_ID
            amount: orderData.order.amount,
            currency: "INR",
            name,
            description,
            // image: "/logo.png", // Add your logo here if you want
            order_id: orderData.order.id, // The order ID from your backend
            handler: async function (response: any) {
                // 3. Verify Payment
                try {
                    const verifyResponse = await fetch("/api/razorpay/verify", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });

                    const verifyData = await verifyResponse.json();

                    if (verifyResponse.ok && verifyData.verified) {
                        if (onSuccess) onSuccess(response.razorpay_payment_id);
                    } else {
                        if (onError) onError(new Error("Payment Verification Failed"));
                    }
                } catch (error) {
                    if (onError) onError(error);
                }
            },
            prefill: {
                name: prefill?.name || "",
                email: prefill?.email || "",
                contact: prefill?.contact || "",
            },
            theme: {
                color: "#fb923c", // Orange theme
            },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.on("payment.failed", function (response: any) {
            if (onError) onError(response.error);
        });
        paymentObject.open();

    } catch (error) {
        console.error("Payment initialization failed:", error);
        if (onError) onError(error);
    }
};
