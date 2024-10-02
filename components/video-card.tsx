"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Video } from "./video-list";

export default function VideoCard({
  video,
  containerRef,
  position,
}: {
  video: Video;
  containerRef: React.RefObject<HTMLDivElement>;
  position: "left" | "right";
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    layoutEffect: false,
    offset: ["start end", "end start"], // Trigger animations based on the position of the element
  });

  // Transform opacity based on scroll position
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0]);

  // Transform scale based on scroll position
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const xAlign = position === "left" ? -100 : 100;

  const transformX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [xAlign, 0, xAlign],
  );

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        scale,
        x: transformX,
        willChange: "opacity, scale, transform",
      }}
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
