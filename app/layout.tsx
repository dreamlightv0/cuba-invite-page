import RetroGrid from "@/components/ui/retro-grid";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const burbank = localFont({
  src: "./fonts/Burbank Big Condensed Black.otf",
  variable: "--font-burbank",
});

export const metadata: Metadata = {
  title: "CUBA VERIFICACIÓN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${burbank.variable} relative flex flex-col items-center justify-center overflow-x-hidden antialiased dark:bg-black`}
      >
        <RetroGrid angle={0} />
        <main>{children}</main>
        <footer className="container flex flex-col gap-4 text-center text-sm text-muted-foreground p-10">
          <p>
            Disclaimer: Este enlace no obliga a nadie a unirse a nuestra
            comunidad de Discord. La verificación es una pequeña medida que
            implementamos para fomentar un entorno positivo y respetuoso entre
            nuestros seguidores. Queremos destacar que todas las interacciones
            son bienvenidas, y el acceso a nuestro Discord es simplemente un
            regalo para nuestros suscriptores leales. Estamos comprometidos a
            seguir las políticas de YouTube y asegurar que nuestra comunidad sea
            un lugar seguro y agradable para todos.
          </p>
          <p>
            Disclaimer: La unión a nuestra comunidad de Discord no es
            obligatoria. Sin embargo, valoramos a nuestros “sobrinos” leales que
            están suscritos. Para ingresar, hemos implementado una pequeña
            verificación que ayuda a mantener un ambiente positivo. Agradecemos
            su comprensión y apoyo.
          </p>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
