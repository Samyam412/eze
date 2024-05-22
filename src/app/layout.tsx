import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "~/components/navbar/navbar";
import { Toaster } from "~/components/ui/sonner";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import Footer from "~/components/footer/footer";
import Container from "~/components/container";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ToysNPark",
  description: "A one stop solution for all your toy needs",
  icons: [{ rel: "icon", url: "/toysnpark-logo.ico" }],
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
        <body className={`font-sans ${inter.variable}  `}>
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
