import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Anime Recommender",
  description: "Get personalized anime recommendations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-white dark:bg-gray-800">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
