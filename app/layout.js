// "use client" is added to indicate this file should be treated as a client-side component
"use client"

import localFont from "next/font/local";
import { ThemeProvider } from '@/app/ThemeProvider';

import "./globals.css";

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
const theme = "dark";

const classNames = `${geistSans.variable} ${geistMono.variable} antialiased`;
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme={theme} style={{colorScheme:"dark"}}>
      <head />
      <body className={classNames}>
        {/* Wrap your app inside ThemeProvider */}
        <ThemeProvider defaultTheme="system" style={{colorScheme:"dark"}}>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
