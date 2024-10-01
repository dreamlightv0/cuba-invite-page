/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

type Video = {
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
      className="no-scrollbar h-[100dvh] snap-y snap-mandatory hidden sm:block sm:overflow-y-scroll"
      ref={containerRef}
    >
      <div className="h-[40dvh] hidden sm:block" />
      <h2 className="flex h-[10dvh] text-shadow-glow-gradient justify-center bg-gradient-to-r text-center text-4xl xl:text-5xl font-extrabold text-white text-shadow-dark">
        {title}
      </h2>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} containerRef={containerRef} position={position} />
      ))}
      <div className="h-[50dvh]" />
    </div>
  );
}

function VideoCard({
  video,
  containerRef,
  position
}: {
  video: Video;
  containerRef: React.RefObject<HTMLDivElement>;
  position: "left" | "right";
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "end start"], // Trigger animations based on the position of the element
  });

  // Transform opacity based on scroll position
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0]);

  // Transform scale based on scroll position
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const xAlign = position === "left" ? -100 : 100;

  const transformX = useTransform(scrollYProgress, [0, 0.5, 1], [xAlign, 0, xAlign]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, x: transformX }}
      className="snap-center"
    >
      <Link
        href={`https://www.youtube.com/watch?v=${video.id}`}
        target="_blank"
        key={video.id}
        className="flex flex-row items-center rounded-xl border bg-background p-4"
      >
        <img
          src={video.thumbnail.url}
          width={video.thumbnail.width / 2}
          height={video.thumbnail.height / 2}
          alt="Thumbnail"
        />
        <span className="text-md line-clamp-3 overflow-hidden text-ellipsis whitespace-normal">
          {video.title}
        </span>
      </Link>
    </motion.div>
  );
}
