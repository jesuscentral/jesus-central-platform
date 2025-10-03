import { ISbStoryData } from "@storyblok/react/rsc";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStoryblokSeoParameters = (story: ISbStoryData<any>) => {
  if (!story.content?.seo) {
    return {};
  }

  const title = story.content?.seo?.title || story.name;
  const description = story.content?.seo?.description;
  const twitterTitle = story.content?.seo?.twitter_title || title;
  const twitterDescription =
    story.content?.seo?.twitter_description || description;
  const ogTitle = story.content?.seo?.og_title || title;
  const ogDescription = story.content?.seo?.og_description || description;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? ""),
    title: `${title} · Jesus Central Church`,
    description: description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `/${story.slug}`,
      images: [
        {
          url:
            story.content?.seo?.og_image ??
            story.content?.seo?.twitter_image ??
            "",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: twitterTitle,
      description: twitterDescription,
      images: [
        {
          url:
            story.content?.seo?.twitter_image ??
            story.content?.seo?.og_image ??
            "",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
};
