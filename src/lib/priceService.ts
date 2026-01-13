
// Price Service Interface
export interface PriceResult {
    avgPrice: number | null;
    currency: string;
    sources: {
        title: string;
        url: string;
        price: number;
    }[];
}

interface PriceProvider {
    getPrices(query: string): Promise<PriceResult>;
}

// Stub implementation for Programmable Search Engine
// Requires GOOGLE_CSE_API_KEY and GOOGLE_CSE_CX
class GoogleCSEProvider implements PriceProvider {
    private apiKey: string;
    private cx: string;

    constructor(apiKey: string, cx: string) {
        this.apiKey = apiKey;
        this.cx = cx;
    }

    async getPrices(query: string): Promise<PriceResult> {
        // Implementation would go here normally
        // For now, returning null to indicate no data without keys
        return { avgPrice: null, currency: 'TRY', sources: [] };
    }
}

// SerpAPI Provider Implementation
class SerpAPIProvider implements PriceProvider {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async getPrices(query: string): Promise<PriceResult> {
        try {
            const response = await fetch(`https://serpapi.com/search.json?q=${encodeURIComponent(query)}&tbm=shop&location=Turkey&hl=tr&gl=tr&currency=TRY&api_key=${this.apiKey}`);
            if (!response.ok) return { avgPrice: null, currency: 'TRY', sources: [] };

            const data = await response.json();
            const shopping_results = data.shopping_results || [];

            // Extract prices
            const prices: { title: string, url: string, price: number }[] = [];

            for (const result of shopping_results) {
                if (result.price) {
                    // Parse price string like "1.500,00 TL" or "₺1.500"
                    const priceStr = result.price.toString().replace(/\./g, '').replace(',', '.').replace(/[^0-9.]/g, '');
                    const priceVal = parseFloat(priceStr);

                    if (!isNaN(priceVal) && priceVal > 0) {
                        prices.push({
                            title: result.title,
                            url: result.link,
                            price: priceVal
                        });
                    }
                }
            }

            // Logic to filter outliers and calculate average
            if (prices.length < 2) {
                return { avgPrice: null, currency: 'TRY', sources: [] };
            }

            // Sort prices
            prices.sort((a, b) => a.price - b.price);

            // Remove outliers (min and max) if we have enough data (e.g. > 3 items)
            let validPrices = prices;
            if (prices.length >= 4) {
                validPrices = prices.slice(1, -1);
            }

            const sum = validPrices.reduce((acc, curr) => acc + curr.price, 0);
            const avg = Math.round(sum / validPrices.length);

            return {
                avgPrice: avg,
                currency: 'TRY',
                sources: prices.slice(0, 3) // Return top 3 sources
            };

        } catch (error) {
            console.error("SerpAPI Error:", error);
            return { avgPrice: null, currency: 'TRY', sources: [] };
        }
    }
}

// Factory to get provider
export function getPriceProvider(): PriceProvider | null {
    if (process.env.SERPAPI_KEY) {
        return new SerpAPIProvider(process.env.SERPAPI_KEY);
    }
    if (process.env.GOOGLE_CSE_API_KEY && process.env.GOOGLE_CSE_CX) {
        return new GoogleCSEProvider(process.env.GOOGLE_CSE_API_KEY, process.env.GOOGLE_CSE_CX);
    }
    return null;
}

// Main service function
export async function fetchAveragePrice(query: string): Promise<PriceResult> {
    const provider = getPriceProvider();
    if (!provider) {
        // console.warn("No price provider configured (SERPAPI_KEY or GOOGLE_CSE_...)");
        return { avgPrice: null, currency: 'TRY', sources: [] };
    }

    return await provider.getPrices(query);
}
