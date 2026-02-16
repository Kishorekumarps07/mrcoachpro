const https = require('https');

https.get('https://api-dev.mrcoachpro.in/api/events', (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.data && json.data.length > 0) {
                const keys = Object.keys(json.data[0]);
                console.log("Keys available:", keys.join(', '));

                json.data.forEach((evt, i) => {
                    console.log(`\n--- Event ${i + 1} ---`);
                    console.log("ID:", evt.id);
                    console.log("title:", evt.title);
                    console.log("start_date:", evt.start_date);
                    console.log("event_date:", evt.event_date);
                    console.log("date:", evt.date);
                    console.log("start_time:", evt.start_time);
                    console.log("price:", evt.price);
                    console.log("cost:", evt.cost);
                    console.log("capacity:", evt.capacity);
                    console.log("total_slots:", evt.total_slots);
                    console.log("slots:", evt.slots);
                    console.log("category:", JSON.stringify(evt.category));
                    console.log("tickets:", JSON.stringify(evt.tickets));
                });
            } else {
                console.log("No data found");
            }
        } catch (e) {
            console.log("Error parsing");
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
