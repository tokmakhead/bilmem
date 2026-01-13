import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { WizardState } from '@/types';
import g from 'g-i-s';
import { fetchAveragePrice } from '@/lib/priceService';
import { promisify } from 'util';

// Promisify GIS
const findImage = promisify(g);

// Create Google Generative AI client
const apiKey = process.env.GOOGLE_API_KEY;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const state: WizardState = body.state;

    if (!state) {
      return NextResponse.json({ error: 'Invalid state provided' }, { status: 400 });
    }

    if (!apiKey) {
      console.error('Google API Key not configured');
      return NextResponse.json({ error: 'Google API Key not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Using gemini-2.0-flash as it is the newest model available to this key type
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: { responseMimeType: "application/json" }
    });

    // Prepare prompt
    const prompt = `
      Sen profesyonel bir hediye danışmanısın. Kullanıcının verdiği TÜM detayları analiz ederek, Türkiye pazarında gerçekten satılan ve bütçeye uygun 3 hediye önerisi yap.

      USER CONTEXT (BU BİLGİLERİN HEPSİNİ KULLAN):
      1. Kime: ${state.recipient}
      2. Yakınlık: ${state.closeness}
      3. Bütçe: ${state.budget} TL (BU LİMİTİ ASLA AŞMA)
      4. İlgi Alanları: ${state.interests.join(', ')}
      5. Özel Gün: ${state.occasion || 'Belirtilmedi'}

      FİYATLANDIRMA TALİMATI:
      - Verdiğin fiyatlar "2024 Türkiye E-Ticaret Ortalaması" olmalıdır.
      - "Tahmini: X TL" formatında yaz.
      - Asla bütçeyi aşan ürün önerme.

      ÇIKTI FORMATI (JSON Dizisi):
      [
        {
          "id": "unique_id",
          "title": "Ürün Tam Adı (Marka Model)",
          "description": "Neden bu kişiye uygun? (2 cümle)",
          "priceRange": "Tahmini: 1500 TL", 
          "category": "Kategori",
          "reason": "Seçilme nedeni",
          "searchQuery": "Ürünün Google'da en iyi fotoğrafını bulacak net arama terimi (örn: 'JBL Tune 510BT Beyaz Kutu')"
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const content = result.response.text();

    if (!content) {
      throw new Error('No content received from Gemini');
    }

    // Clean markdown formatting if present (common with LLMs)
    const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();

    let recommendations: Array<{
      id: string;
      title: string;
      description: string;
      priceRange: string;
      category: string;
      reason: string;
      searchQuery?: string;
    }> = [];

    try {
      const parsed = JSON.parse(cleanedContent);
      if (Array.isArray(parsed)) {
        recommendations = parsed;
      } else {
        // Sometimes Gemini wraps it in an object even if asked for array, handle generic wrapping
        const possibleArray = Object.values(parsed).find(val => Array.isArray(val));
        if (possibleArray && Array.isArray(possibleArray)) {
          recommendations = possibleArray;
        }
      }
    } catch (e) {
      console.error('JSON Parse Error:', e);
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    // Enrich with Real Images and Prices (Parallel Fetching)
    const enrichedRecommendations = await Promise.all(recommendations.map(async (rec) => {
      let imageUrl = null;
      let priceData = { avgPrice: null as number | null, currency: 'TRY' };

      // Run Image Search and Price Check in parallel for this item
      try {
        const [imgResult, priceResult] = await Promise.all([
          // Image Search
          findImage(rec.searchQuery || rec.title).catch((e: Error) => {
            console.error(`Image search failed for ${rec.title}:`, e);
            return null;
          }),
          // Price Check (via SerpAPI or others)
          fetchAveragePrice(rec.title).catch((e: Error) => {
            console.error(`Price search failed for ${rec.title}:`, e);
            return { avgPrice: null, currency: 'TRY' };
          })
        ]);

        // Handle Image Result (g-i-s returns array of results)
        if (Array.isArray(imgResult) && imgResult.length > 0) {
          imageUrl = imgResult[0].url;
        } else if (imgResult && typeof imgResult === 'string') {
          imageUrl = imgResult; // Fallback if promisify behaves differently
        }

        // Handle Price Result
        if (priceResult && typeof priceResult === 'object' && 'avgPrice' in priceResult) {
          priceData = priceResult as { avgPrice: number | null; currency: string };
        }

      } catch (err) {
        console.error(`Enrichment failed for ${rec.title}`, err);
      }

      return {
        ...rec,
        imageUrl: imageUrl || null,
        avgPrice: priceData.avgPrice,
        priceCurrency: priceData.currency,
        // Direct Google Search Link (No Shopping Tab allowed per user request)
        buyLink: `https://www.google.com/search?q=${encodeURIComponent(rec.title + ' satın al')}`,
      };
    }));


    return NextResponse.json({ recommendations: enrichedRecommendations });

  } catch (error) {
    // Log detailed error on server only
    const err = error as Error;
    console.error('Gemini API Error Detailed:', err);

    // Return user-friendly message to client (no sensitive details)
    const userMessage = err.message || 'Hediye önerileri oluşturulurken bir sorun oluştu. Lütfen tekrar deneyin.';

    return NextResponse.json({
      error: userMessage
    }, { status: 500 });
  }
}
