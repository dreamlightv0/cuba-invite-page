"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import LoadingSpinner from "./loading-spinner";
import { Actions } from "./landing-page";

type Props = {
  actions: Actions;
  setActions: React.Dispatch<React.SetStateAction<Actions>>;
};

export default function SubscribeButton({ actions, setActions }: Props) {
  const onClick = () => {
    setActions({ ...actions, youtube: { loading: true, ready: false } });

    window.open(process.env.NEXT_PUBLIC_YOUTUBE_LINK!);

    setTimeout(
      () =>
        setActions({ ...actions, youtube: { loading: false, ready: true } }),
      10000
    );
  };

  return (
    <Button
      className="w-full bg-[red] text-white flex flex-row gap-2 hover:bg-[red]/80 transition-all"
      onClick={onClick}
      disabled={actions.youtube.loading}
    >
      {actions.youtube.loading ? (
        <LoadingSpinner className="invert" />
      ) : (
        <>
          <Image
            src="/youtube.svg"
            className="invert"
            alt="youtube"
            width={24}
            height={24}
          />{" "}
          <span>Suscríbete en YouTube</span>
        </>
      )}
    </Button>
  );
}
