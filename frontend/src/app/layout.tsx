import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from "./layout.module.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tables.IO",
  description: "control your data with smart tables",
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/favicon-black.ico",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/favicon.ico",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />

        <main className={styles.main}>
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
