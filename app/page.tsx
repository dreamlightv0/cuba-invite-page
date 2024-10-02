import LandingPage from "@/components/landing-page";
import VideoContainer from "@/components/video-container";
import { getFilteredVideos, getTutorialVideos } from "@/lib/queries";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="grid h-screen grid-rows-[1fr_auto_1fr] sm:grid-cols-3">
      <Suspense>
        <VideoContainer position="left" title="Tutoriales" videosCallback={getTutorialVideos} />
      </Suspense>
      <LandingPage />
      <Suspense>
        <VideoContainer position="right" title="Videos Rikolinos" videosCallback={getFilteredVideos} />
      </Suspense>
    </div>
  );
}
