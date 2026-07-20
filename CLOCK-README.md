# 🕐 Digital Clock - Multiple Timezones

A beautiful, real-time digital clock displaying current time across 10 major world timezones with a modern glassmorphism UI.

## ✨ Features

- ⏰ **Live Digital Clocks** - Real-time updates every second
- 🌍 **10 World Timezones** - IST, EST, GMT, CET, JST, AEST, PST, SGT, GST, NZDT
- 🎨 **Modern UI** - Glassmorphism design with smooth animations
- 🎯 **Pause/Resume** - Control auto-updates with pause button
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🚀 **Lightweight** - Fast loading and smooth performance
- 🎭 **Beautiful Animations** - Smooth transitions and effects

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation & Run

```bash
# Install dependencies (if not already done)
npm install

# Run the digital clock server
node clock-server.js
```

**Open in browser:** http://localhost:3001

## 📖 How to Use

1. **View Live Times** - Open the app and see all 10 timezones updating in real-time
2. **Refresh Manually** - Click "🔄 Refresh Now" button to update immediately
3. **Pause/Resume** - Click "⏸️ Pause" to stop auto-updates, "▶️ Resume" to continue
4. **See Date Info** - Each clock shows the day of the week with the time

## 🗺️ Supported Timezones

| Timezone | Location | Flag |
|----------|----------|------|
| IST | India (Kolkata) | 🇮🇳 |
| EST | New York, USA | 🇺🇸 |
| GMT | London, UK | 🇬🇧 |
| CET | Berlin, Germany | 🇩🇪 |
| JST | Tokyo, Japan | 🇯🇵 |
| AEST | Sydney, Australia | 🇦🇺 |
| PST | Los Angeles, USA | 🇺🇸 |
| SGT | Singapore | 🇸🇬 |
| GST | Dubai, UAE | 🇦🇪 |
| NZDT | Auckland, New Zealand | 🇳🇿 |

## 🏗️ File Structure

```
whareareyou/
├── clock-server.js      # Node.js Express server
├── public/
│   └── clock.html       # Digital clock UI
└── package.json         # Dependencies
```

## 🛠️ API Endpoint

### `GET /api/time`
Returns current time in all configured timezones

**Response:**
```json
[
  {
    "name": "IST (India)",
    "flag": "🇮🇳",
    "zone": "Asia/Kolkata",
    "time": "Sun, 2:30:45 PM"
  }
]
```

## ⚙️ Configuration

Change port using environment variable:
```bash
PORT=5000 node clock-server.js
```

## 🎨 Design Features

- **Glassmorphism Effect** - Modern frosted glass background
- **Gradient Backgrounds** - Smooth color transitions
- **Green Terminal Style** - Retro digital clock aesthetic
- **Smooth Animations** - Pop-in effects and hover transitions
- **Dark Theme** - Easy on the eyes for 24/7 viewing
- **Responsive Grid** - Auto-adjusts columns based on screen size

## 🔧 Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript
- **API**: REST with JSON responses
- **Time Handling**: JavaScript Intl.DateTimeFormat API

## 📱 Browser Support

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🚀 Deployment

### Heroku
```bash
git push heroku main
heroku open
```

### Render
1. Connect GitHub repository
2. Set start command: `node clock-server.js`
3. Deploy!

## 💡 Tips

- The clock automatically pauses when the browser tab is inactive to save resources
- All times are displayed in 12-hour format with AM/PM
- Times update every second for accuracy
- The app is timezone-aware and works correctly regardless of your local timezone

## 📄 License

MIT License

## 👨‍💻 Author

**Ashish Choudhary**

---

Made with ⏰ and ❤️
