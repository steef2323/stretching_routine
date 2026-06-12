import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import SyncProvider from "@/components/SyncProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stretchy",
  description: "Your calm morning stretching assistant",
  appleWebApp: {
    capable: true,
    title: "Stretchy",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F5F3F0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider
          signInForceRedirectUrl="/"
          signUpForceRedirectUrl="/"
        >
          <SyncProvider>{children}</SyncProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
