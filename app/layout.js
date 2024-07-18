import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { NextAuthProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sterling Ox Exercise",
  description: "Generated by Create Next App",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <NextAuthProvider> */}
        <body className={inter.className}>
          {children}
        </body>
      {/* </NextAuthProvider> */}
    </html>
  );
}