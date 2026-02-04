const https = require('https');

// 1. Create Order
const createOrderData = JSON.stringify({
    event_id: 3,
    user_id: 0,
    user_name: "Test Payment Conf",
    user_email: "test_conf@example.com",
    user_phone: "9998887776",
    user_address: "Test Address",
    total_amount: 500,
    payment_provider: "Razorpay",
    attendees: [
        {
            "ticket_id": 2, // Valid ID
            "name": "Test Runner",
            "age_group": "adult",
            "tshirt_size": "M"
        }
    ]
});

const createOptions = {
    hostname: 'api-dev.mrcoachpro.in',
    path: '/api/events/orders',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(createOrderData)
    }
};

console.log("Creating Order...");

const req = https.request(createOptions, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const json = JSON.parse(data);
        console.log("Create Response:", JSON.stringify(json, null, 2));

        if (json.success && json.data && json.data.order_id) {
            const orderId = json.data.order_id;
            confirmPayment(orderId);
        } else {
            console.error("Failed to create order, cannot proceed.");
        }
    });
});

req.write(createOrderData);
req.end();

// 2. Confirm Payment
function confirmPayment(orderId) {
    console.log(`\nConfirming Payment for Order ${orderId}...`);

    const confirmData = JSON.stringify({
        payment_status: "success",
        payment_provider: "Razorpay",
        payment_id: `pay_test_${Date.now()}`,
        payment_signature: `sig_test_${Date.now()}`
    });

    const confirmOptions = {
        hostname: 'api-dev.mrcoachpro.in',
        path: `/api/events/orders/${orderId}/payment`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(confirmData)
        }
    };

    const reqConfirm = https.request(confirmOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log("Confirm Details Response Status:", res.statusCode);
            try {
                const json = JSON.parse(data);
                console.log("Confirm Response:", JSON.stringify(json, null, 2));
            } catch (e) {
                console.log("Confirm Raw:", data);
            }
        });
    });

    reqConfirm.write(confirmData);
    reqConfirm.end();
}
