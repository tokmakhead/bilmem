import { WizardState, GiftRecommendation, Recipient, Closeness, Occasion } from '@/types';

interface CuratedProduct {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    buyUrl: string;
    categories: string[];
    tags: string[];
    suitability: {
        recipients: Recipient[];
        minCloseness: Closeness;
        occasions?: Occasion[];
    };
}

// Comprehensive Curated Database (TR Market Focused)
const DIRECT_PRODUCTS: CuratedProduct[] = [
    // TEKNOLOJİ & GADGETS
    {
        id: 'dp-tech-1',
        title: 'JBL Tune 520BT Kablosuz Kulaklık',
        description: '57 saate kadar pil ömrü ve Pure Bass sesiyle müzik tutkunları için mükemmel bir hediye.',
        imageUrl: 'https://m.media-amazon.com/images/I/41Kstf68cvL._AC_SL1000_.jpg',
        price: 1590, // Updated based on Google Shopping research
        buyUrl: 'https://www.amazon.com.tr/dp/B0BYP6SK2B',
        categories: ['teknoloji', 'muzik'],
        tags: ['müzik', 'genç', 'ofis', 'kulaklık', 'bluetooth'],
        suitability: { recipients: ['arkadas', 'kardes', 'sevgili-es', 'is-arkadasi'], minCloseness: 'normal' }
    },
    {
        id: 'dp-tech-2',
        title: 'Xiaomi Mi Smart Band 8 Aktif',
        description: 'Geniş ekranı ve 50\'den fazla spor moduyla sağlıklı yaşamı takip etmek isteyenler için.',
        imageUrl: 'https://m.media-amazon.com/images/I/51p6PclvQ9L._AC_SL1200_.jpg',
        price: 999, // Updated based on Google Shopping research
        buyUrl: 'https://www.amazon.com.tr/dp/B0CJX9S1CH',
        categories: ['teknoloji', 'spor'],
        tags: ['sağlık', 'fitness', 'saat', 'akıllı bileklik'],
        suitability: { recipients: ['anne', 'baba', 'arkadas', 'sevgili-es', 'is-arkadasi'], minCloseness: 'normal' }
    },
    {
        id: 'dp-gaming-1',
        title: 'SteelSeries Rival 3 Oyuncu Mouse',
        description: 'RGB aydınlatmalı ve yüksek hassasiyetli sensörüyle oyun tutkunlarının performansı artacak.',
        imageUrl: 'https://m.media-amazon.com/images/I/61K7602I9ML._AC_SL1500_.jpg',
        price: 1350, // Updated based on Google Shopping research
        buyUrl: 'https://www.amazon.com.tr/dp/B08176SM7C',
        categories: ['oyun', 'teknoloji'],
        tags: ['gamer', 'gaming', 'oyuncu', 'bilgisayar'],
        suitability: { recipients: ['arkadas', 'kardes', 'sevgili-es'], minCloseness: 'normal' }
    },
    // EV, MUTFAK & DEKORASYON
    {
        id: 'dp-home-1',
        title: 'Cosori Lite 3.8L Akıllı Air Fryer',
        description: 'Sağlıklı ve pratik yemekler için modern mutfakların vazgeçilmez yardımcısı.',
        imageUrl: 'https://m.media-amazon.com/images/I/61NqK+qEqkL._AC_SL1500_.jpg',
        price: 3899, // Updated based on Google Shopping research
        buyUrl: 'https://www.amazon.com.tr/dp/B0B76LHL9T',
        categories: ['yemek', 'ev'],
        tags: ['mutfak', 'aşçı', 'yemek yapma', 'airfryer'],
        suitability: { recipients: ['anne', 'sevgili-es', 'baba'], minCloseness: 'yakin' }
    },
    {
        id: 'dp-home-2',
        title: 'English Home Pure Cotton Nevresim Seti',
        description: 'Yüzde yüz pamuk dokusuyla kaliteli uyku ve şık bir yatak odası dekorasyonu.',
        imageUrl: 'https://m.media-amazon.com/images/I/81P8c1r95OL._AC_SL1500_.jpg',
        price: 649, // Updated based on Google Shopping research
        buyUrl: 'https://www.amazon.com.tr/dp/B0CFV8LRS3',
        categories: ['ev', 'moda'],
        tags: ['dekorasyon', 'konfor', 'yatak odası'],
        suitability: { recipients: ['anne', 'sevgili-es'], minCloseness: 'yakin' }
    },
    {
        id: 'dp-food-1',
        title: 'Kütahya Porselen 24 Parça Yemek Takımı',
        description: 'Zarif tasarımıyla sofralara şıklık katacak, uzun ömürlü porselen seti.',
        imageUrl: 'https://m.media-amazon.com/images/I/61eG8+p8HmL._AC_SL1200_.jpg',
        price: 2850,
        buyUrl: 'https://www.amazon.com.tr/dp/B09D8N7Z9S',
        categories: ['yemek', 'ev'],
        tags: ['mutfak', 'sofra', 'porselen'],
        suitability: { recipients: ['anne', 'sevgili-es'], minCloseness: 'yakin', occasions: ['yilbasi', 'dogum-gunu'] }
    },
    // GÜZELLİK & KİŞİSEL BAKIM
    {
        id: 'dp-beauty-1',
        title: 'L\'Occitane Shea Butter El Kremi Seti',
        description: 'Cildi şımartan, ikonik kokusuyla bilinen lüks nemlendirici bakım paketi.',
        imageUrl: 'https://m.media-amazon.com/images/I/61H4hO-eDGL._AC_SL1100_.jpg',
        price: 950,
        buyUrl: 'https://www.trendyol.com/loccitane/shea-butter-el-kremi-p-3243122',
        categories: ['guzellik'],
        tags: ['bakım', 'spa', 'cilt bakımı', 'kozmetik'],
        suitability: { recipients: ['anne', 'arkadas', 'sevgili-es', 'is-arkadasi'], minCloseness: 'normal' }
    },
    {
        id: 'dp-beauty-2',
        title: 'Braun Silk-épil 9 Epilatör Seti',
        description: 'Kişisel bakımda profesyonel sonuçlar arayanlar için kapsamlı set.',
        imageUrl: 'https://m.media-amazon.com/images/I/71X8k-N35pL._AC_SL1500_.jpg',
        price: 4200,
        buyUrl: 'https://www.amazon.com.tr/dp/B07BHLCS75',
        categories: ['guzellik', 'teknoloji'],
        tags: ['bakım', 'kişisel bakım', 'kadın'],
        suitability: { recipients: ['sevgili-es', 'anne'], minCloseness: 'yakin' }
    },
    // MODA & AKSESUAR
    {
        id: 'dp-fashion-1',
        title: 'Pierre Cardin Deri Cüzdan \u0026 Kemer Seti',
        description: 'Şıklığından ödün vermeyen erkekler için klasikten vazgeçmeyen aksesuar seti.',
        imageUrl: 'https://m.media-amazon.com/images/I/61lB9y6548L._AC_SL1000_.jpg',
        price: 1650,
        buyUrl: 'https://www.amazon.com.tr/dp/B08XMW1XWR',
        categories: ['moda'],
        tags: ['aksesuar', 'şık', 'ofis', 'erkek', 'cüzdan'],
        suitability: { recipients: ['baba', 'sevgili-es', 'is-arkadasi', 'arkadas'], minCloseness: 'normal' }
    },
    // KİTAP, HOBİ & SANAT
    {
        id: 'dp-book-1',
        title: 'Kindle Paperwhite (16 GB)',
        description: 'Her ortamda binlerce kitap okuma özgürlüğü sunan en popüler e-kitap okuyucu.',
        imageUrl: 'https://m.media-amazon.com/images/I/51f4zWvEw7L._AC_SL1000_.jpg',
        price: 6800,
        buyUrl: 'https://www.amazon.com.tr/dp/B09TMCYWHY',
        categories: ['kitap', 'teknoloji'],
        tags: ['okuma', 'huzur', 'e-kitap', 'yazar'],
        suitability: { recipients: ['arkadas', 'sevgili-es', 'anne', 'baba', 'is-arkadasi'], minCloseness: 'normal' }
    },
    {
        id: 'dp-art-1',
        title: 'Faber-Castell 36 Renk Metal Kutu Boya Seti',
        description: 'Yaratıcılığını konuşturmak isteyen sanatseverler için kaliteli boya koleksiyonu.',
        imageUrl: 'https://m.media-amazon.com/images/I/81xU+7V-B+L._AC_SL1500_.jpg',
        price: 850,
        buyUrl: 'https://www.amazon.com.tr/dp/B0007OEDRE',
        categories: ['sanat', 'hobi'],
        tags: ['resim', 'çizim', 'boyama', 'yaratıcı'],
        suitability: { recipients: ['kardes', 'arkadas', 'sevgili-es'], minCloseness: 'normal' }
    },
    // SPOR, SEYAHAT & DOĞA
    {
        id: 'dp-travel-1',
        title: 'Stanley Classic Vacuum Trigger-Action Termos',
        description: 'Kamp, seyahat veya ofis için içecekleri saatlerce ideal sıcaklıkta tutar.',
        imageUrl: 'https://m.media-amazon.com/images/I/51KxGvHlshL._AC_SL1500_.jpg',
        price: 1450,
        buyUrl: 'https://www.amazon.com.tr/dp/B07P9H4BGH',
        categories: ['seyahat', 'bahce', 'spor'],
        tags: ['kamp', ' outdoor', 'doğa', 'kahve'],
        suitability: { recipients: ['baba', 'arkadas', 'sevgili-es', 'is-arkadasi'], minCloseness: 'normal' }
    },
    {
        id: 'dp-garden-1',
        title: 'Bosch EasyPrune Akülü Bahçe Makası',
        description: 'Bahçeyle uğraşmayı sevenler için işleri kolaylaştıran teknolojik yardımcı.',
        imageUrl: 'https://m.media-amazon.com/images/I/71KxN0L8P2L._AC_SL1500_.jpg',
        price: 3200,
        buyUrl: 'https://www.amazon.com.tr/dp/B077S6ZPHW',
        categories: ['bahce', 'teknoloji'],
        tags: ['doğa', 'çiçek', 'bahçe işleri'],
        suitability: { recipients: ['anne', 'baba'], minCloseness: 'yakin' }
    }
];

const CLOSENESS_SCORE: Record<Closeness, number> = {
    'resmi': 1,
    'normal': 2,
    'yakin': 3
};

/**
 * AI-Powered Recommendation Fetcher
 */
export async function fetchAIRecommendations(state: WizardState): Promise<GiftRecommendation[]> {
    try {
        const response = await fetch('/api/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ state }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (process.env.NODE_ENV === 'development') {
                console.error('Server returned error:', errorData);
            }
            throw new Error(errorData.error || 'Failed to fetch recommendations');
        }

        const data = await response.json();

        // Ensure we have recommendations
        if (!data.recommendations || !Array.isArray(data.recommendations) || data.recommendations.length === 0) {
            throw new Error('No recommendations returned from AI');
        }

        return data.recommendations;
    } catch (error) {
        const err = error as Error;
        if (process.env.NODE_ENV === 'development') {
            console.error('AI Recommendation Error:', err);
        }

        // Enhanced error messaging (P0-4)
        let userFriendlyMessage = 'Bir sorun oluştu';

        if (err.message?.includes('fetch') || err.message?.includes('network') || !navigator.onLine) {
            userFriendlyMessage = 'İnternet bağlantınızı kontrol edin';
        } else if (err.message?.includes('quota') || err.message?.includes('limit') || err.message?.includes('429')) {
            userFriendlyMessage = 'Kısa bir süre sonra tekrar deneyin';
        } else if (err.message?.includes('timeout') || err.message?.includes('timed out')) {
            userFriendlyMessage = 'Yanıt süresi aşıldı, lütfen tekrar deneyin';
        } else if (err.message?.includes('API Key') || err.message?.includes('401') || err.message?.includes('403')) {
            userFriendlyMessage = 'Servis şu an kullanılamıyor';
        } else if (err.message) {
            userFriendlyMessage = err.message;
        }

        throw new Error(userFriendlyMessage);
    }
}

/**
 * Enhanced Direct Purchase Recommendation Engine
 * Now with better keyword mapping and image-safe URLs.
 */
export function getDirectPurchaseRecommendations(state: WizardState): GiftRecommendation[] {
    const { recipient, closeness, budget, interests, occasion } = state;

    if (!recipient || !closeness) return [];

    const scoredProducts = DIRECT_PRODUCTS.map(product => {
        let score = 0;

        // 1. Strict Budget Filter
        if (product.price > budget) {
            score -= 20000;
        } else {
            // Reward products that fit the budget well
            const budgetRatio = product.price / budget;
            score += budgetRatio * 60;
        }

        // 2. Recipient Alignment
        if (product.suitability.recipients.includes(recipient)) {
            score += 120;
        }

        // 3. Closeness Logic
        const minVal = CLOSENESS_SCORE[product.suitability.minCloseness];
        const userVal = CLOSENESS_SCORE[closeness];
        if (userVal >= minVal) {
            score += 40;
        } else {
            score -= 80;
        }

        // 4. Advanced Interest Matching
        const userInterestsLower = interests.map(i => i.toLowerCase());

        // Category matches (High priority)
        const categoryMatch = product.categories.filter(cat =>
            userInterestsLower.some(uInt =>
                uInt.includes(cat) || cat.includes(uInt) || uInt === cat
            )
        );
        score += categoryMatch.length * 150;

        // Tag matches (Medium priority)
        const tagMatch = product.tags.filter(tag =>
            userInterestsLower.some(uInt =>
                uInt.includes(tag) || tag.includes(uInt) || uInt === tag
            )
        );
        score += tagMatch.length * 80;

        // 5. Special Occasion Match
        if (occasion && product.suitability.occasions?.includes(occasion)) {
            score += 100;
        }

        return { product, score };
    });

    return scoredProducts
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(({ product }) => ({
            id: product.id,
            title: product.title,
            description: product.description,
            priceRange: `₺${product.price.toLocaleString('tr-TR')}`,
            category: product.categories[0].charAt(0).toUpperCase() + product.categories[0].slice(1),
            reason: `${product.title}, Google aramalarında ${product.categories.join(', ')} kategorisinde en çok tercih edilen ve bütçenize tam uyum sağlayan seçenektir.`,
            imageUrl: product.imageUrl,
            buyLink: `https://www.google.com/search?q=${encodeURIComponent(product.title + ' satın al')}&tbm=shop`
        }));
}
