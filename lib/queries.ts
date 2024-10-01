import { cache } from "react";

const apiKey = process.env.YOUTUBE_V3_API_KEY!;
const channelId = process.env.YOUTUBE_CHANNEL_ID!;

type SearchResponse = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Resource[];
};

type Resource = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultAudioLanguage: string;
  };
};

export const fetchVideos = cache(async (): Promise<SearchResponse> => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );
  return await res.json();
});

export type DetailsResponse = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
      standard: {
        url: string;
        width: number;
        height: number;
      };
      maxres: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    projection: string;
  };
}[];

const fetchVideoDetails = cache(
  async (videoIds: string[]): Promise<DetailsResponse> => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds.join(
        ",",
      )}&part=contentDetails,snippet`,
      {
        next: {
          revalidate: false,
        },
      },
    );
    const data = await response.json();
    return data.items;
  },
);

const fetchVideoIds = cache(
  async (videoIds: string): Promise<DetailsResponse> => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=contentDetails,snippet`,
      {
        next: {
          revalidate: false,
        },
      },
    );
    const data = await response.json();
    return data.items;
  },
);

const isShort = (duration: string) => {
  const match = duration.match(/PT(\d+M)?(\d+S)?/);
  if (!match) {
    return false;
  }
  const minutes = parseInt(match[1]) || 0;
  const seconds = parseInt(match[2]) || 0;
  const totalSeconds = minutes * 60 + seconds;
  return totalSeconds < 60; // Filter if less than 60 seconds
};

const filterShorts = (videos: DetailsResponse) => {
  return videos.filter((video) => !isShort(video.contentDetails.duration));
};

export const getFilteredVideos = cache(async () => {
  const videos = await fetchVideos();
  const videoDetails = await fetchVideoDetails(
    videos.items.map((video) => video.id.videoId),
  );
  const filteredVideos = filterShorts(videoDetails);
  return filteredVideos;
});

export const getTutorialVideos = cache(async () => {
  const videos = await fetchVideoIds(process.env.TUTORIAL_IDS!);
  return videos;
});
