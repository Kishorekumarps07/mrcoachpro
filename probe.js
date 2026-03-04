async function probe() {
    try {
        const res = await fetch('https://api.mrcoachpro.in/api/events/categories');
        const json = await res.json();
        console.log('EVENT_CATEGORIES:', JSON.stringify(json.data.map(c => ({ id: c.id, name: c.name })), null, 2));
    } catch (e) {
        console.error(e);
    }
}
probe();
