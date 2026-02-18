const http = require('http');

http.get('http://localhost:3000/shop', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        if (data.includes('ELEVATE YOUR PERFORMANCE')) {
            console.log('Verification Success: Hero text found.');
        } else {
            console.log('Verification Failed: Hero text not found.');
        }
        if (data.includes('Free Shipping')) {
            console.log('Verification Success: Value props found.');
        } else {
            console.log('Verification Failed: Value props not found.');
        }
    });
}).on('error', (err) => {
    console.log('Error: ' + err.message);
});
