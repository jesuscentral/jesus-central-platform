// File: /pages/api/isLive.js
import fetch from "node-fetch";

export const GET = async () => {
  const channelHandle = "jesuscentral.churchgouda"; // your channel handle
  const liveUrl = `https://www.youtube.com/@${channelHandle}/live`;

  try {
    // Fetch only headers to check redirect
    const response = await fetch(liveUrl, {
      method: "GET",
    });
    const html = await response.text();

    const isLive = /"isLiveNow":true/.test(html);
    console.log(response.headers);

    let videoId = null;
    const match = html.match(/"videoId":"(.*?)"/);
    if (match && match[1]) {
      videoId = match[1];
    }

    return new Response(
      JSON.stringify({
        live: isLive,
        url:
          isLive && videoId
            ? `https://www.youtube.com/watch?v=${videoId}`
            : null,
      })
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to check live status" }),
      {
        status: 500,
      }
    );
  }
};
