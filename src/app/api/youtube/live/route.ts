// File: src/app/api/youtube/live/route.ts
import fetch from "node-fetch";

export const GET = async () => {
  const channelHandle = "jesuscentral.churchgouda"; // your channel handle
  const liveUrl = `https://www.youtube.com/@${channelHandle}/live`;

  try {
    // Fetch with browser-like user agent to avoid any restrictions
    const response = await fetch(liveUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });
    
    const html = await response.text();
    
    // Log some info for debugging
    console.log("Response status:", response.status);
    
    // Multiple patterns to check for live status
    const isLivePatterns = [
      /"isLiveNow":true/,
      /"isLive":true/,
      /\\"isLiveNow\\":true/,
      /<meta itemprop="isLiveBroadcast" content="true">/,
      /BADGE_STYLE_TYPE_LIVE_NOW/
    ];
    
    let isLive = false;
    for (const pattern of isLivePatterns) {
      if (pattern.test(html)) {
        isLive = true;
        console.log("Live detected with pattern:", pattern);
        break;
      }
    }

    // Extract video ID using multiple patterns
    let videoId = null;
    const videoIdPatterns = [
      /"videoId":"(.*?)"/,
      /\\"videoId\\":\\"(.*?)\\"/,
      /watch\?v=([^"&]+)/
    ];
    
    for (const pattern of videoIdPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        videoId = match[1];
        console.log("Video ID found:", videoId);
        break;
      }
    }

    // If we have a videoId but isLive is false, double-check
    if (videoId && !isLive) {
      console.log("Found video ID but live status is false, setting to true");
      isLive = true;
    }

    return new Response(
      JSON.stringify({
        live: isLive,
        channelUrl: liveUrl,
        url: isLive && videoId
          ? `https://www.youtube.com/watch?v=${videoId}`
          : null,
      })
    );
  } catch (error) {
    console.error("Error checking live status:", error);
    return new Response(
      JSON.stringify({ error: "Failed to check live status" }),
      {
        status: 500,
      }
    );
  }
};
