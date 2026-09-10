import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.socialImage,
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.primaryRole}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.socialImage],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9eff6" },
    { media: "(prefers-color-scheme: dark)", color: "#171b24" },
  ],
};

const themeBootstrapScript = `(function(){
  var theme = "system";
  try { theme = localStorage.getItem("portfolio-theme") || theme; } catch (error) {}
  var dark = theme === "dark" || (theme !== "light" && matchMedia("(prefers-color-scheme: dark)").matches);
  var resolved = dark ? "dark" : "light";
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
  document.querySelectorAll('meta[name="theme-color"]').forEach(function(meta){
    meta.setAttribute("content", dark ? "#171b24" : "#e9eff6");
  });
})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>
        <ThemeProvider>
          <Navigation
            githubUrl={profile.socialLinks.github}
            resumePath={profile.resumePath}
          />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
