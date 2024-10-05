"use client";

import SubscribeButton from "@/components/subscribe-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { LinkIcon, LockKeyholeIcon, UnlockKeyholeIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import LoadingSpinner from "./loading-spinner";
import Link from "next/link";
import { toast } from "sonner";

export type Actions = Record<string, { loading: boolean; ready: boolean }>;

export default function LandingPage() {
  const [count, setCount] = useState(0);
  const [actions, setActions] = useState<Actions>({
    youtube: {
      loading: false,
      ready: false,
    },
  });
  const [link, setLink] = useState({ loading: false, url: "" });

  const locked = Object.entries(actions).some(([, { ready }]) => !ready);

  const onClick = () => {
    setCount(count + 1);
    if (count >= 10) {
      alert(";)");
      setCount(0);
    }
  };

  const handleUnlock = async () => {
    setLink({ loading: true, url: "" });
    toast.loading("Generando link...", { id: "generate-link" });
    const request = await fetch("/api/get-invite")
      .then((res) => res.json())
      .catch(() => {
        toast.dismiss("generate-link");
        toast.error("Error al generar el link. Por favor, intenta de nuevo", {
          dismissible: true,
        });
        setLink({ loading: false, url: "" });
      });

    if (request) {
      toast.dismiss("generate-link");
      toast.success("Link generado correctamente");
      setLink({ loading: false, url: request.invite });
    }
  };

  return (
    <div className="grid h-screen grid-rows-3 items-center justify-items-center drop-shadow-xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ rotate: 360, scale: 0.5 }}
        onClick={onClick}
        className="px-5"
      >
        <Image
          src={"/header.webp"}
          className="title-animation"
          alt="header"
          width={600}
          height={600}
        />
      </motion.div>
      <Card className="relative">
        <CardHeader>
          <CardTitle>Desbloquear Link</CardTitle>
          <CardDescription>
            Completa la acción para desbloquear el link
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SubscribeButton actions={actions} setActions={setActions} />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex w-full flex-row gap-2" disabled={locked}>
                {locked ? (
                  <>
                    <LockKeyholeIcon className="h-5 w-5" />
                    <span>Link Bloqueado</span>
                  </>
                ) : (
                  <>
                    <UnlockKeyholeIcon className="h-5 w-5" />
                    <span>Link desbloqueado</span>
                  </>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Link desbloqueado</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                {link.url !== "" ? (
                  <>
                    <Link
                      href={`https://discord.gg/invite/${link.url}`}
                      target="_blank"
                    >
                      <Button
                        className="flex w-full flex-row gap-2"
                        variant="outline"
                      >
                        <LinkIcon className="h-5 w-5" />
                        https://discord.gg/invite/{link.url}
                      </Button>
                    </Link>
                    <span className="text-sm text-muted-foreground text-center">Este link expirará en 5 minutos</span>
                  </>
                ) : (
                  <Button
                    className="w-full"
                    onClick={handleUnlock}
                    disabled={link.loading || link.url !== ""}
                  >
                    {link.loading ? <LoadingSpinner /> : "Generar Link"}
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <div className="flex max-w-[300px] flex-col items-center gap-4 text-center text-xl font-extrabold md:hidden">
        <span>Debes entrar desde un navegador como Chrome o Brave</span>
        <div className="flex flex-row gap-4">
          <Image src={"/chrome.svg"} alt="chrome" width={50} height={50} />
          <Image src={"/brave.svg"} alt="brave" width={50} height={50} />
          <Image src={"/firefox.svg"} alt="firefox" width={50} height={50} />
        </div>
        <span>No desde la app de YouTube</span>
      </div>
      <motion.div
        initial={{ y: 600 }}
        animate={{ y: 0 }}
        className="hidden md:block"
      >
        <Image src={"/footer.png"} alt="footer" width={600} height={600} />
      </motion.div>
    </div>
  );
}
