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
                const event = json.data[0];
                Object.keys(event).forEach(key => {
                    console.log(`${key}: ${JSON.stringify(event[key])}`);
                });
            } else {
                console.log("No data found or empty array");
            }
        } catch (e) {
            console.log("Error parsing JSON");
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
