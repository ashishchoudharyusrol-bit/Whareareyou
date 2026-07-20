# 📍 Where Are You - Location Tracking Application

A real-time location sharing and tracking web application built with Node.js and Express. Share your location with others and track shared locations on an interactive map.

## ✨ Features

- 🎯 **Real-time Location Sharing** - Share your location with a single click
- 🗺️ **Interactive Maps** - View locations on OpenStreetMap powered maps
- 📊 **Live Dashboard** - Monitor all tracked locations in real-time
- 📱 **Mobile Friendly** - Responsive design works on all devices
- 🔄 **Auto-refresh** - Dashboard updates automatically every 3 seconds
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- 📍 **Accuracy Info** - Shows GPS accuracy for each location

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ashishchoudharyusrol-bit/whareareyou.git
cd whareareyou
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start
```

The application will be running on `http://localhost:3000`

### Development Mode

For development with auto-reload:
```bash
npm run dev
```

## 📖 Usage

### Share Your Location
1. Go to `http://localhost:3000`
2. Click "Share My Location" button
3. Allow location access when prompted
4. Your location will be shared and displayed on the map

### View All Tracked Locations
1. Go to `http://localhost:3000/dashboard`
2. See all shared locations on the map
3. View location details below the map
4. Dashboard auto-refreshes every 3 seconds

## 🛠️ API Endpoints

### `GET /`
Main location sharing page

### `GET /dashboard`
Dashboard to view all tracked locations

### `POST /track`
Submit a new location
```json
{
  "latitude": 28.6139,
  "longitude": 77.2090,
  "accuracy": 50,
  "time": "20/7/2026, 10:30:45 am"
}
```

### `GET /locations`
Get all tracked locations

### `DELETE /locations`
Clear all tracked locations

## 🗺️ Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript
- **Maps**: Leaflet.js, OpenStreetMap
- **APIs**: Geolocation API

## 📱 Browser Support

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## ⚙️ Configuration

Set custom port using environment variable:
```bash
PORT=5000 npm start
```

## 🔒 Security Notes

- This is a demonstration application
- Locations are stored in memory (not persisted)
- For production use, consider:
  - Database storage
  - User authentication
  - HTTPS/SSL encryption
  - CORS configuration
  - Rate limiting

## 📝 File Structure

```
whareareyou/
├── server.js           # Main application file
├── package.json        # Dependencies and scripts
├── README.md           # Documentation
└── .gitignore          # Git ignore rules
```

## 🚢 Deployment

### Deploy to Heroku
```bash
heroku create your-app-name
git push heroku main
heroku open
```

### Deploy to Render
1. Push to GitHub
2. Create new Web Service on Render
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

**Ashish Choudhary** - [GitHub](https://github.com/ashishchoudharyusrol-bit)

## 💡 Tips & Tricks

- Use the dashboard URL to monitor locations in real-time
- The application works best with GPS-enabled devices
- Indoor locations may have lower accuracy
- Dashboard auto-refreshes every 3 seconds
- Clear locations to start fresh tracking

## 🐛 Troubleshooting

### Location not showing?
- Enable location services on your device
- Check browser location permissions
- Ensure GPS is enabled

### Map not loading?
- Check your internet connection
- OpenStreetMap tiles may take a moment to load
- Try refreshing the page

### Port already in use?
```bash
PORT=3001 npm start
```

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

## 📞 Support

For issues and questions, create an issue on GitHub.

---

Made with ❤️ by Ashish Choudhary