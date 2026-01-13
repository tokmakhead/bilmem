import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tarama Tamamlandı – bilmem.net",
    description: "Seçimlerine göre oluşturulan 3 hediye önerisi ve fiyat özeti.",
    openGraph: {
        title: "Tarama Tamamlandı – bilmem.net",
        description: "Seçimlerine göre oluşturulan 3 hediye önerisi ve fiyat özeti.",
        type: "website",
        siteName: "bilmem.net",
        url: "https://bilmem.net/results",
        images: [
            {
                url: "/og-cover.png",
                width: 1200,
                height: 630,
                alt: "bilmem.net - Hediye Önerileri",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Tarama Tamamlandı – bilmem.net",
        description: "Seçimlerine göre oluşturulan 3 hediye önerisi ve fiyat özeti.",
        images: ["/og-cover.png"],
    },
    alternates: {
        canonical: "https://bilmem.net/results",
    },
};
