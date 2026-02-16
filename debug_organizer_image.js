const https = require('https');

const url = 'https://api-dev.mrcoachpro.in/uploads/organizer_images-1770227627915-501903657.webp';

https.get(url, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log('Headers:', res.headers);

    // Check if it's an image
    if (res.statusCode === 200) {
        console.log("Image found!");
    } else {
        console.log("Image NOT found!");
    }
}).on('error', (e) => {
    console.error(e);
});
