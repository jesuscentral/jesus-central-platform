import { getSermons } from "@/lib/actions/sermons";

// Cache this route for 1 hour (3600 seconds)
export const revalidate = 3600;

// Enable static rendering for better performance
export const dynamic = "force-static";

export const GET = async () => {
  const videos = getSermons();

  // Add cache headers for browser caching
  return new Response(JSON.stringify(videos), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // Cache in browser for 1 hour, allow stale content for 1 day while revalidating
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      // Add ETag for conditional requests
      ETag: `"${Date.now()}"`,
    },
  });
};
