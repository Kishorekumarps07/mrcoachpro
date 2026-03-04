async function probe() {
    const endpoints = [
        'https://api.mrcoachpro.in/api/categories',
        'https://api.mrcoachpro.in/api/events/categories',
        'https://api-dev.mrcoachpro.in/api/categories'
    ];

    for (const url of endpoints) {
        try {
            console.log(`\n--- Probing ${url} ---`);
            const res = await fetch(url);
            const json = await res.json();
            if (json.success && json.data) {
                const summary = json.data.map(c => ({ id: c.id, name: c.name }));
                console.log(JSON.stringify(summary, null, 2));
            } else {
                console.log('No success or data');
            }
        } catch (e) {
            console.error(`Failed ${url}: ${e.message}`);
        }
    }
}
probe();
