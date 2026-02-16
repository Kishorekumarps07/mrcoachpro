const https = require('https');

https.get('https://api-dev.mrcoachpro.in/api/events', (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log(JSON.stringify(json, null, 2));
        } catch (e) {
            console.log("Raw data:", data);
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
