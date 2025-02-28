const NodeMediaServer = require('node-media-server');
const http = require('http');
const express = require('express');
const cors = require('cors');
const ip = require('ip');
const path = require('path');
const fs = require('fs');

// Create Express application for the web interface
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Create media directory with absolute path
const mediaDir = path.join(__dirname, 'media');
console.log(`Media directory: ${mediaDir}`);
if (!fs.existsSync(mediaDir)) {
  fs.mkdirSync(mediaDir, { recursive: true });
}

// Make sure this path is correct for your system
const ffmpegPath = process.platform === 'win32' ? 'C:\\ffmpeg\\bin\\ffmpeg.exe' : '/usr/bin/ffmpeg';

// Configuration with absolute paths
const config = {
  logType: 3,
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*',
    mediaroot: mediaDir // Use absolute path
  },
  trans: {
    ffmpeg: ffmpegPath,
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]'
      }
    ]
  }
};

// Initialize the RTMP Server
const nms = new NodeMediaServer(config);
nms.run();

// Server routes for GoPro control
app.get('/api/server-info', (req, res) => {
  const localIp = ip.address();
  const serverInfo = {
    localIp: localIp,
    rtmpUrl: `rtmp://${localIp}:1935/live`,
    hlsUrl: `http://${localIp}:8000/live/stream/index.m3u8`,
    dashUrl: `http://${localIp}:8000/live/stream/index.mpd`
  };
  res.json(serverInfo);
});

// Start the Express server for the web interface
const webServer = http.createServer(app);
const WEB_PORT = 3000;
webServer.listen(WEB_PORT, () => {
  const localIp = ip.address();
  console.log(`Web server running at http://${localIp}:${WEB_PORT}`);
  console.log(`Web server also available at http://localhost:${WEB_PORT}`);
  console.log(`RTMP Server running at rtmp://${localIp}:1935/live`);
});
