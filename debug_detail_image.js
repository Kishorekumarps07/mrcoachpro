const https = require('https');

https.get('https://api-dev.mrcoachpro.in/api/events/3', (resp) => {
    let data = '';
    resp.on('data', c => data += c);
    resp.on('end', () => {
        try {
            const json = JSON.parse(data);
            const item = json.data;
            console.log('--- DETAIL VIEW ---');
            console.log('Keys:', Object.keys(item).filter(k => k.includes('image') || k.includes('img')));
            console.log('event_image:', item.event_image);
            console.log('image:', item.image);
            console.log('image_url:', item.image_url);
        } catch (e) { console.log("Error"); }
    });
});
