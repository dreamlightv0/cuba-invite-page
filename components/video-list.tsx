"use client";

import { useRef } from "react";
import VideoCard from "./video-card";

export type Video = {
  id: string;
  title: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
};

type Props = {
  videos: Video[];
  position: "left" | "right";
  title: string;
};

export default function VideoList({ videos, position, title }: Props) {
  const containerRef = useRef(null);

  return (
    <div
      className="no-scrollbar relative hidden h-[100dvh] snap-y snap-mandatory sm:block sm:overflow-y-scroll"
      ref={containerRef}
    >
      <div className="hidden h-[40dvh] sm:block" />
      <h2 className="text-shadow-dark flex h-[10dvh] justify-center bg-gradient-to-r text-center text-4xl font-extrabold text-white text-shadow-glow-gradient xl:text-5xl">
        {title}
      </h2>
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          containerRef={containerRef}
          position={position}
        />
      ))}
      <div className="h-[50dvh]" />
    </div>
  );
}
