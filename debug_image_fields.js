const https = require('https');

function get(url, name) {
    return new Promise((resolve) => {
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', c => data += c);
            resp.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const item = Array.isArray(json.data) ? json.data[0] : json.data;
                    console.log(`\n--- ${name} ---`);
                    console.log('Keys:', Object.keys(item).filter(k => k.includes('image') || k.includes('url') || k.includes('img')));
                    console.log('image:', item.image);
                    console.log('image_url:', item.image_url);
                    console.log('event_image:', item.event_image);
                } catch (e) { console.log(name, "Error"); }
                resolve();
            });
        });
    });
}

(async () => {
    await get('https://api-dev.mrcoachpro.in/api/events', 'LIST VIEW');
    await get('https://api-dev.mrcoachpro.in/api/events/3', 'DETAIL VIEW');
})();
