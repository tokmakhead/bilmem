import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeedbackButton from "@/components/FeedbackButton";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { WizardProvider } from "@/context/WizardContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bilmem.net'),
  title: "bilmem.net – Yapay Zeka ile Doğru Hediyeyi Bul",
  description: "bilmem.net, birkaç soruda yapay zeka destekli hediye önerileri sunar. Sevdiklerin için en doğru hediyeyi saniyeler içinde keşfet.",
  keywords: ["hediye", "hediye önerisi", "yapay zeka", "AI hediye", "kişiselleştirilmiş hediye"],
  openGraph: {
    title: "bilmem.net – Yapay Zeka ile Doğru Hediyeyi Bul",
    description: "bilmem.net, birkaç soruda yapay zeka destekli hediye önerileri sunar. Sevdiklerin için en doğru hediyeyi saniyeler içinde keşfet.",
    type: "website",
    siteName: "bilmem.net",
    url: "https://bilmem.net/",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "bilmem.net - Yapay Zeka ile Hediye Önerileri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "bilmem.net – Yapay Zeka ile Doğru Hediyeyi Bul",
    description: "bilmem.net, birkaç soruda yapay zeka destekli hediye önerileri sunar. Sevdiklerin için en doğru hediyeyi saniyeler içinde keşfet.",
    images: ["/og-cover.png"],
  },
  alternates: {
    canonical: "https://bilmem.net/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${plusJakartaSans.variable} font-sans antialiased text-slate-800 bg-[#FAFAFA]`}>
        <WizardProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-14">
              {children}
            </main>
            <Footer />
          </div>
          <FeedbackButton />
          <ScrollToTop />
        </WizardProvider>
      </body>
    </html>
  );
}
