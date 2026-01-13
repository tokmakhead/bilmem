import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hediye Seç – bilmem.net",
    description: "Kime hediye alacağını seç, bütçeni belirle, gerisini yapay zekaya bırak.",
    openGraph: {
        title: "Hediye Seç – bilmem.net",
        description: "Kime hediye alacağını seç, bütçeni belirle, gerisini yapay zekaya bırak.",
        type: "website",
        siteName: "bilmem.net",
        url: "https://bilmem.net/wizard",
        images: [
            {
                url: "/og-cover.png",
                width: 1200,
                height: 630,
                alt: "bilmem.net - Hediye Sihirbazı",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Hediye Seç – bilmem.net",
        description: "Kime hediye alacağını seç, bütçeni belirle, gerisini yapay zekaya bırak.",
        images: ["/og-cover.png"],
    },
    alternates: {
        canonical: "https://bilmem.net/wizard",
    },
};
