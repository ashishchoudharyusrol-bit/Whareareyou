const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Store tracked locations in memory
const locations = [];

// Main tracking page (jo samne wale ko bhejenge)
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Where Are You - Location Share</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            text-align: center; 
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container { 
            background: #fff; 
            padding: 40px; 
            border-radius: 20px; 
            box-shadow: 0 20px 60px rgba(0,0,0,0.3); 
            max-width: 500px; 
            width: 90%;
        }
        h1 { 
            color: #667eea; 
            margin: 0 0 10px 0;
            font-size: 2.5em;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 1.1em;
        }
        #map { 
            height: 300px; 
            width: 100%; 
            margin-top: 20px; 
            border-radius: 10px;
            display: none;
        }
        .btn { 
            padding: 15px 40px; 
            font-size: 18px; 
            cursor: pointer; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff; 
            border: none; 
            border-radius: 8px; 
            margin-top: 20px; 
            font-weight: bold;
            transition: transform 0.2s;
        }
        .btn:hover { 
            transform: scale(1.05);
        }
        .btn:active {
            transform: scale(0.95);
        }
        #status { 
            margin-top: 15px; 
            font-weight: bold; 
            color: #333;
            min-height: 20px;
        }
        .status-success {
            color: #28a745;
        }
        .status-error {
            color: #dc3545;
        }
        .status-loading {
            color: #667eea;
        }
        .info-box {
            background: #f0f0f0;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            font-size: 0.9em;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📍 Where Are You?</h1>
        <p class="subtitle">Apni location share karne ke liye button par click karein</p>
        <button class="btn" onclick="startTracking()">Share My Location</button>
        <p id="status"></p>
        <div id="map"></div>
        <div class="info-box">
            ℹ️ Aapki location tracking dashboard par live dikhai degi
        </div>
    </div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
        let map = null;

        function startTracking() {
            const statusEl = document.getElementById("status");
            statusEl.className = "status-loading";
            statusEl.innerText = "📡 Location fetch ho rahi hai...";
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(sendToServer, showError, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                });
            } else {
                statusEl.className = "status-error";
                statusEl.innerText = "❌ Browser location support nahi karta.";
            }
        }

        function sendToServer(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const accuracy = position.coords.accuracy;
            
            showMap(lat, lon);

            fetch('/track', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    latitude: lat,
                    longitude: lon,
                    accuracy: accuracy,
                    time: new Date().toLocaleString('hi-IN')
                })
            })
            .then(response => response.json())
            .then(data => {
                const statusEl = document.getElementById("status");
                statusEl.className = "status-success";
                statusEl.innerHTML = "✅ Location shared successfully!<br><small>Dashboard par dekhne ke liye: <a href='/dashboard' style='color: #667eea;'>yahan click karein</a></small>";
            })
            .catch(error => {
                const statusEl = document.getElementById("status");
                statusEl.className = "status-error";
                statusEl.innerText = "❌ Error: " + error.message;
            });
        }

        function showMap(lat, lon) {
            const mapEl = document.getElementById('map');
            mapEl.style.display = 'block';
            
            if (map) {
                map.remove();
            }
            
            map = L.map('map').setView([lat, lon], 16);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            L.marker([lat, lon]).addTo(map)
                .bindPopup("📍 Aapki Location")
                .openPopup();
        }

        function showError(error) {
            const statusEl = document.getElementById("status");
            statusEl.className = "status-error";
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    statusEl.innerText = "❌ Aapne location permission deny kar di.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    statusEl.innerText = "❌ Location unavailable hai.";
                    break;
                case error.TIMEOUT:
                    statusEl.innerText = "❌ Request timeout - please try again.";
                    break;
                default:
                    statusEl.innerText = "❌ Error: " + error.message;
            }
        }
    </script>
</body>
</html>
    `);
});

// Dashboard page (jo aap open karenge tracked locations dekhne ke liye)
app.get('/dashboard', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Where Are You - Dashboard</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: #f0f2f5;
            min-height: 100vh;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            padding: 30px 20px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .header h1 {
            font-size: 2em;
            margin-bottom: 5px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .controls {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }
        .btn {
            padding: 12px 25px;
            background: #667eea;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #5568d3;
        }
        .btn-danger {
            background: #dc3545;
        }
        .btn-danger:hover {
            background: #c82333;
        }
        #map { 
            height: 500px; 
            width: 100%; 
            border-radius: 10px; 
            margin-bottom: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .location-list { 
            background: #fff; 
            padding: 20px; 
            border-radius: 10px; 
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .location-list h2 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.5em;
        }
        .location-item { 
            padding: 15px; 
            margin: 10px 0; 
            background: #f9f9f9; 
            border-radius: 8px; 
            border-left: 5px solid #667eea;
            transition: transform 0.2s;
        }
        .location-item:hover {
            transform: translateX(5px);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .location-item strong {
            color: #667eea;
            font-size: 1.1em;
        }
        .location-item small {
            color: #999;
            display: block;
            margin-top: 8px;
        }
        .empty-state {
            text-align: center;
            color: #999;
            padding: 40px 20px;
            font-size: 1.1em;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        .stat-card {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .stat-card h3 {
            color: #667eea;
            font-size: 2em;
            margin: 0;
        }
        .stat-card p {
            color: #666;
            margin: 5px 0 0 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📍 Where Are You - Dashboard</h1>
        <p>Real-time Location Tracking</p>
    </div>

    <div class="container">
        <div class="controls">
            <button class="btn" onclick="loadLocations()">🔄 Refresh</button>
            <button class="btn btn-danger" onclick="clearLocations()">🗑️ Clear All</button>
        </div>

        <div class="stats">
            <div class="stat-card">
                <h3 id="totalLocations">0</h3>
                <p>Total Locations</p>
            </div>
            <div class="stat-card">
                <h3 id="lastUpdate">-</h3>
                <p>Last Update</p>
            </div>
        </div>

        <div id="map"></div>
        <div class="location-list">
            <h2>📌 Tracked Locations</h2>
            <div id="locationList"></div>
        </div>
    </div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
        let map = L.map('map').setView([20.5937, 78.9629], 4);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        let markers = [];

        function loadLocations() {
            fetch('/locations')
                .then(response => response.json())
                .then(locations => {
                    displayLocations(locations);
                    updateMap(locations);
                    updateStats(locations);
                })
                .catch(error => console.error('Error:', error));
        }

        function displayLocations(locations) {
            const listDiv = document.getElementById('locationList');
            listDiv.innerHTML = '';
            
            if (locations.length === 0) {
                listDiv.innerHTML = '<div class="empty-state">📍 Koi location track nahi hui abhi tak.<br>Locations share karne ke liye home page par jayein.</div>';
                return;
            }

            locations.forEach((loc, index) => {
                const item = document.createElement('div');
                item.className = 'location-item';
                item.innerHTML = '<strong>Location ' + (index + 1) + '</strong><br>' +
                    '📍 <strong>Coordinates:</strong> ' + loc.latitude.toFixed(6) + ', ' + loc.longitude.toFixed(6) + '<br>' +
                    '🕐 <strong>Time:</strong> ' + loc.time + '<br>' +
                    '🎯 <strong>Accuracy:</strong> ' + Math.round(loc.accuracy) + ' meters' +
                    '<small>Shared ' + getTimeAgo(loc.timestamp) + ' ago</small>';
                listDiv.appendChild(item);
            });
        }

        function updateMap(locations) {
            markers.forEach(marker => map.removeLayer(marker));
            markers = [];

            locations.forEach((loc, index) => {
                const marker = L.marker([loc.latitude, loc.longitude])
                    .addTo(map)
                    .bindPopup('<strong>Location ' + (index + 1) + '</strong><br>' + loc.time);
                markers.push(marker);
            });

            if (locations.length > 0) {
                const bounds = L.latLngBounds(locations.map(l => [l.latitude, l.longitude]));
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }

        function updateStats(locations) {
            document.getElementById('totalLocations').innerText = locations.length;
            if (locations.length > 0) {
                document.getElementById('lastUpdate').innerText = getTimeAgo(locations[locations.length - 1].timestamp) + ' ago';
            }
        }

        function getTimeAgo(timestamp) {
            const diff = Date.now() - timestamp;
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);

            if (hours > 0) return hours + 'h';
            if (minutes > 0) return minutes + 'm';
            return seconds + 's';
        }

        function clearLocations() {
            if (confirm('Kya aap sure ho ki sab locations delete karne hain?')) {
                fetch('/locations', { method: 'DELETE' })
                    .then(() => loadLocations())
                    .catch(error => console.error('Error:', error));
            }
        }

        // Auto-refresh every 3 seconds
        loadLocations();
        setInterval(loadLocations, 3000);
    </script>
</body>
</html>
    `);
});

// Receive location data
app.post('/track', (req, res) => {
    try {
        const { latitude, longitude, accuracy, time } = req.body;
        
        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            return res.status(400).json({ success: false, message: 'Invalid coordinates' });
        }
        
        locations.push({
            latitude,
            longitude,
            accuracy,
            time,
            timestamp: Date.now()
        });
        
        console.log('✅ Location tracked:', { latitude, longitude, time });
        res.json({ success: true, message: 'Location saved', totalLocations: locations.length });
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get all tracked locations
app.get('/locations', (req, res) => {
    res.json(locations);
});

// Clear all locations
app.delete('/locations', (req, res) => {
    locations.length = 0;
    res.json({ success: true, message: 'All locations cleared' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log('🚀 Server running on http://localhost:' + PORT);
    console.log('📍 Main URL: http://localhost:' + PORT);
    console.log('📊 Dashboard URL: http://localhost:' + PORT + '/dashboard');
});