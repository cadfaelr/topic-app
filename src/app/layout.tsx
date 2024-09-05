import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import SearchBar from "../components/SearchBar";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Topic Analysis App",
  icons: ['/favicon.ico'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className='main-layout'>
            <NavBar />
            <SearchBar />
            <div className='main-content'>{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
