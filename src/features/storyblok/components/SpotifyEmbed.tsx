import { SbSpotifyEmbed } from "@storyblok/types/287435740670216/storyblok-components";

function toSpotifyEmbedUrl(url: string): string {
  const regex =
    /^https?:\/\/(?:open|play)\.spotify\.com\/(track|album|playlist|artist|show|episode)\/([a-zA-Z0-9]+)/;
  const match = url.match(regex);
  if (!match) return "";
  const [, type, id] = match;
  return `https://open.spotify.com/embed/${type}/${id}`;
}

export default function SpotifyEmbed({ blok }: { blok: SbSpotifyEmbed }) {
  const embedUrl = toSpotifyEmbedUrl(blok.spotifyUrl);

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="352"
      frameBorder={0}
      allowFullScreen={true}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}
