import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { router } from "./api/uploadthing/route";
import Providers from "./Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | LearnHub",
    default: "LearnHub",
  },
  description: "Be today better than yesterday",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextSSRPlugin routerConfig={extractRouterConfig(router)} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
