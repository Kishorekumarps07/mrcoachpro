async function probe() {
    try {
        const id = 8; // Chennai Walk
        const detailRes = await fetch(`https://api-dev.mrcoachpro.in/api/events/${id}`);
        const detailJson = await detailRes.json();
        console.log(JSON.stringify(detailJson.data, null, 2));
    } catch (e) {
        console.error('Probe failed:', e);
    }
}

probe();
