import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Prometheas.com",
    template: "%s — Prometheas.com",
  },
  description:
    "John Lianoglou's official personal website. Kneel before its majesty.",
  metadataBase: new URL("https://prometheas.com"),
  openGraph: {
    siteName: "Prometheas.com",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
  },
};

// FOUC prevention: static inline script reads localStorage and applies .dark
// class synchronously before first paint. Uses classList.add to preserve
// next/font classes on <html>. Content is hardcoded — no XSS risk.
const themeScript = `(function(){var t="system";try{var s=localStorage.getItem("theme");if(s==="light"||s==="dark"||s==="system")t=s}catch(e){}var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme:dark)").matches);if(d){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark"}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
