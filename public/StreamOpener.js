import React, { useEffect, useState } from 'react';

const StreamOpener = () => {
    const [hlsState, setHlsState] = useState("HLS_NOT_STARTED");

    useEffect(() => {
        const checkStream = async () => {
            const response = await fetch('/api/server-info');
            const data = await response.json();
            const hlsUrl = data.hlsUrl;

            // Logic to check if the stream is active
            const checkInterval = setInterval(async () => {
                const res = await fetch(hlsUrl);
                if (res.ok) {
                    clearInterval(checkInterval);
                    setHlsState("HLS_PLAYABLE"); // Update hlsState to playable
                    window.open(hlsUrl, '_blank'); // Open the HLS URL in a new tab
                }
            }, 5000); // Check every 5 seconds
        };

        checkStream();
    }, []);

    return null; // This component does not render anything
};

export default StreamOpener;
