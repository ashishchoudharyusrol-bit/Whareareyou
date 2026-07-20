const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());

// Serve clock.html on root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'clock.html'));
});

// API endpoint for getting time in all timezones
app.get('/api/time', (req, res) => {
    const timezones = [
        { name: 'IST (India)', zone: 'Asia/Kolkata', flag: '🇮🇳' },
        { name: 'EST (New York)', zone: 'America/New_York', flag: '🇺🇸' },
        { name: 'GMT (London)', zone: 'Europe/London', flag: '🇬🇧' },
        { name: 'CET (Berlin)', zone: 'Europe/Berlin', flag: '🇩🇪' },
        { name: 'JST (Tokyo)', zone: 'Asia/Tokyo', flag: '🇯🇵' },
        { name: 'AEST (Sydney)', zone: 'Australia/Sydney', flag: '🇦🇺' },
        { name: 'PST (Los Angeles)', zone: 'America/Los_Angeles', flag: '🇺🇸' },
        { name: 'SGT (Singapore)', zone: 'Asia/Singapore', flag: '🇸🇬' },
        { name: 'GST (Dubai)', zone: 'Asia/Dubai', flag: '🇦🇪' },
        { name: 'NZDT (Auckland)', zone: 'Pacific/Auckland', flag: '🇳🇿' }
    ];

    const times = timezones.map(tz => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz.zone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            weekday: 'short'
        });
        
        return {
            name: tz.name,
            flag: tz.flag,
            zone: tz.zone,
            time: formatter.format(now)
        };
    });

    res.json(times);
});

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗`);
    console.log(`║  ⏰ DIGITAL CLOCK SERVER STARTED    ║`);
    console.log(`╚════════════════════════════════════════╝
`);
    console.log(`📍 Open your browser: http://localhost:${PORT}`);
    console.log(`🌍 Displaying 10 world timezones`);
    console.log(`⏱️  Updates every 1 second`);
    console.log(`\n🔗 API: http://localhost:${PORT}/api/time\n`);
});