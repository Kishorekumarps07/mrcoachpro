const https = require('https');

https.get('https://api-dev.mrcoachpro.in/api/events/3', (resp) => {
    let data = '';
    resp.on('data', c => data += c);
    resp.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log('--- ORGANIZERS ---');
            console.log('organizers (raw):', json.data.organizers);
        } catch (e) { console.log(name, "Error"); }
    });
});
