async function probe() {
    try {
        const detailRes = await fetch(`https://api-dev.mrcoachpro.in/api/events/8`);
        const detailJson = await detailRes.json();
        const data = detailJson.data;

        console.log('Searching for any field that might be a count or price:');
        for (const [key, value] of Object.entries(data)) {
            const lowerKey = key.toLowerCase();
            const isPotentialCount = lowerKey.includes('reg') || lowerKey.includes('count') || lowerKey.includes('sold') || lowerKey.includes('taken') || lowerKey.includes('book') || lowerKey.includes('slot');
            const isPotentialPrice = lowerKey.includes('price') || lowerKey.includes('fee');

            if (isPotentialCount || isPotentialPrice) {
                console.log(`${key}: ${JSON.stringify(value)}`);
            }
        }
    } catch (e) {
        console.error('Probe failed:', e);
    }
}

probe();
