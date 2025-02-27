GoPro RTMP Streaming Server

A lightweight local RTMP streaming server designed for wirelessly streaming video from a GoPro camera to devices on your local network.
Developed by Byteint.com https://www.byteint.com/


## Features

- **Local RTMP Server**: Stream directly from GoPro to your local network
- **Web Interface**: View streams in any browser without additional software
- **Multi-Format Support**: RTMP for streaming software, HLS/DASH for browsers
- **Easy Setup**: Simple configuration and clear instructions
- **Cross-Platform**: Works on Windows, macOS, and Linux

## Prerequisites

- Node.js (v14 or newer)
- FFmpeg (optional, for transcoding)
- GoPro with streaming capabilities
- All devices on the same local network

## Installation

1. Clone this repository or download the files:
   ```bash
   git clone https://github.com/yourusername/gopro-rtmp-server.git
   cd gopro-rtmp-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create the media directory:
   ```bash
   mkdir media
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Access the web interface at:
   ```
   http://your-local-ip:3000
   ```
   Your local IP will be displayed in the console when you start the server.

## Server Structure

- `server.js` - The main server file that sets up the RTMP and web servers
- `public/index.html` - Web interface for viewing streams and server information
- `media/` - Directory where streaming media files are temporarily stored

## Setting Up Your GoPro

### For GoPro HERO9, HERO10, HERO11, and newer:

1. Connect your GoPro to the same Wi-Fi network as this server
2. Go to Preferences > Connections > Connect to GoPro App
3. Set up Live Streaming through the GoPro Quik app
4. In the app, choose Custom as the streaming platform
5. Enter the RTMP URL displayed on your web interface (usually `rtmp://your-local-ip:1935/live/stream`)

### For GoPro HERO8 and older:

1. Some older models may require third-party applications like GoPro Studio or OBS
2. Connect your GoPro to your computer via USB
3. Use the capture software to direct the stream to your local RTMP server

## Troubleshooting

### Port Conflicts

If you see "address already in use" errors, other services might be using the required ports:
```
RTMP Server: Port 1935
HTTP Server: Port 8000
Web Interface: Port 3000
```

To kill processes using these ports:
```bash
sudo lsof -i :1935
sudo lsof -i :8000
sudo lsof -i :3000
sudo kill -9 PID
```

Alternatively, edit `server.js` to use different ports.

### Media Directory Issues

If you see "MediaRoot cannot be written" errors, ensure:
1. The `media` directory exists
2. Your user has write permissions to this directory
3. The path to the media directory is correctly specified in `server.js`

### Streaming Issues

1. Ensure your GoPro and server are on the same network
2. Verify your GoPro has streaming capabilities enabled
3. Check your GoPro's battery level - streaming requires significant power
4. Try restarting both the server and the GoPro

## License

MIT

## Acknowledgments

- [Node Media Server](https://github.com/illuspas/Node-Media-Server) - The underlying RTMP server implementation
- [hls.js](https://github.com/video-dev/hls.js/) - HLS playback library for browsers
- [dash.js](https://github.com/Dash-Industry-Forum/dash.js) - DASH playback library for browsers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
