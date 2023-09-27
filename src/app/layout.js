import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Submind",
  description: "Keep track of your subscriptions, school-project",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  // if ("serviceWorker" in navigator) {
  //   navigator.serviceWorker
  //     .register("/service-worker.js")
  //     .then((registration) => {
  //       console.log(
  //         "Service Worker registered with scope:",
  //         registration.scope
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Service Worker registration failed:", error);
  //     });
  // }
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
