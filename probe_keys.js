async function probe() {
    try {
        const res = await fetch(`https://api-dev.mrcoachpro.in/api/events/8`);
        const json = await res.json();
        const data = json.data;

        const keys = new Set();
        function collectKeys(obj) {
            if (!obj || typeof obj !== 'object') return;
            Object.keys(obj).forEach(k => {
                keys.add(k);
                if (Array.isArray(obj[k])) {
                    obj[k].forEach(item => collectKeys(item));
                } else {
                    collectKeys(obj[k]);
                }
            });
        }

        collectKeys(data);
        const sortedKeys = Array.from(keys).sort();
        console.log('--- ALL KEYS (CHUNKED) ---');
        for (let i = 0; i < sortedKeys.length; i += 20) {
            console.log(sortedKeys.slice(i, i + 20).join(', '));
        }
    } catch (e) {
        console.error('Probe failed:', e);
    }
}

probe();
