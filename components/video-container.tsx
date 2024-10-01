import { DetailsResponse } from "@/lib/queries";
import VideoList from "./video-list";

export default async function VideoContainer({
  videosCallback,
  title,
  position,
}: {
  videosCallback: () => Promise<DetailsResponse>;
  title: string;
  position: "left" | "right";
}) {
  try {
    const videos = await videosCallback();

    return (
      <VideoList
        title={title}
        position={position}
        videos={videos.map((video) => {
          return {
            id: video.id,
            title: video.snippet.title,
            thumbnail: {
              url: video.snippet.thumbnails.medium.url,
              width: video.snippet.thumbnails.medium.width,
              height: video.snippet.thumbnails.medium.height,
            },
          };
        })}
      />
    );
  } catch (error) {
    console.log(error);
    return <div>{JSON.stringify(error)}</div>;
  }
}
