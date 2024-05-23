import "~/styles/globals.css";

import { Prosto_One } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "~/components/navbar/navbar";
import { Toaster } from "~/components/ui/sonner";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import Footer from "~/components/footer/footer";
import Container from "~/components/container";
const prosto = Prosto_One({
  subsets: ["latin"],
  weight: '400',
  style: 'normal',
});

export const metadata = {
  title: "EZE Appliances",
  description: "Home Appliances made Affordable",
  icons: [{ rel: "icon", url: "/eze.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <body className={`font-sans ${prosto.className}  `}>
          <Toaster />
          <Navbar />
          <Container>{children}</Container>
          <Toaster />
          {/* <Footer /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
