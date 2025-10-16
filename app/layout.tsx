import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "highlight.js/styles/github-dark.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Gaurav Tadkapally",
  description: "Personal portfolio and blog",
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-YMMLD1CVDS"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YMMLD1CVDS');
            `,
          }}
        />
        
        <Navigation />
        <main className="pt-10">
          {children}
        </main>
        <footer className="py-8 mt-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-gray-500">
              <div className="flex gap-4 sm:gap-6 flex-wrap">
                <a href="https://github.com/gauravreddy08" target="_blank" rel="noopener noreferrer">
                  github
                </a>
                <a href="https://www.linkedin.com/in/gauravreddy08/" target="_blank" rel="noopener noreferrer">
                  linkedin
                </a>
                <a href="https://x.com/gtadkapally" target="_blank" rel="noopener noreferrer">
                  x
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  open to work
                </a>
              </div>
              <span className="text-gray-500">
                tadkapal [at] usc [dot] edu
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
