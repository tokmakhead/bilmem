/**
 * Lightweight Analytics Utility
 * Client-side event tracking for funnel measurement
 * Fail-safe: errors won't affect app functionality
 */

type EventName =
    // Home
    | 'home_view'
    | 'hero_cta_click'
    // Wizard
    | 'wizard_start'
    | 'wizard_step_view'
    | 'wizard_step_complete'
    | 'wizard_back_click'
    | 'wizard_complete'
    // Results
    | 'results_view'
    | 'product_card_view'
    | 'product_cta_click'
    | 'ai_tooltip_open'
    | 'share_panel_open'
    | 'share_action'
    // Error/Edge
    | 'results_error'
    | 'no_results';

interface EventParams {
    // Wizard
    step_number?: number;
    // Results
    product_index?: number;
    // Share
    share_type?: 'copy' | 'whatsapp' | 'x';
    // Error
    error_type?: string;
    // Timing
    duration_ms?: number;
    // Anonymous data
    interest_count?: number;
    budget_bucket?: '0-1000' | '1000-3000' | '3000-7000' | '7000+';
}

class Analytics {
    private static instance: Analytics;
    private eventQueue: Array<{ name: EventName; params?: EventParams; timestamp: number }> = [];
    private lastEvents: Map<string, number> = new Map();
    private debounceMs = 1000; // Prevent duplicate events within 1s
    private sessionStart: number = Date.now();

    private constructor() {
        // Initialize analytics (could be extended to send to backend)
        if (typeof window !== 'undefined') {
            this.sessionStart = Date.now();
        }
    }

    static getInstance(): Analytics {
        if (!Analytics.instance) {
            Analytics.instance = new Analytics();
        }
        return Analytics.instance;
    }

    /**
     * Track an event with optional parameters
     * Fail-safe: errors are caught and logged
     */
    track(eventName: EventName, params?: EventParams): void {
        try {
            // Debounce: prevent duplicate events
            const eventKey = `${eventName}_${JSON.stringify(params || {})}`;
            const lastTime = this.lastEvents.get(eventKey);
            const now = Date.now();

            if (lastTime && now - lastTime < this.debounceMs) {
                return; // Skip duplicate event
            }

            this.lastEvents.set(eventKey, now);

            // Add to queue
            const event = {
                name: eventName,
                params,
                timestamp: now,
            };

            this.eventQueue.push(event);

            // Console log in development
            if (process.env.NODE_ENV === 'development') {
                console.log('[Analytics]', eventName, params);
            }

            // In production, this could send to analytics service
            // Example: this.sendToBackend(event);

        } catch (error) {
            // Fail-safe: don't break the app
            if (process.env.NODE_ENV === 'development') {
                console.error('[Analytics] Error tracking event:', error);
            }
        }
    }

    /**
     * Track page view
     */
    trackPageView(pageName: string): void {
        const eventMap: Record<string, EventName> = {
            home: 'home_view',
            wizard: 'wizard_start',
            results: 'results_view',
        };

        const eventName = eventMap[pageName];
        if (eventName) {
            this.track(eventName);
        }
    }

    /**
     * Get budget bucket for anonymous tracking
     */
    getBudgetBucket(budget: number): '0-1000' | '1000-3000' | '3000-7000' | '7000+' {
        if (budget <= 1000) return '0-1000';
        if (budget <= 3000) return '1000-3000';
        if (budget <= 7000) return '3000-7000';
        return '7000+';
    }

    /**
     * Calculate session duration
     */
    getSessionDuration(): number {
        return Date.now() - this.sessionStart;
    }

    /**
     * Get all tracked events (for debugging)
     */
    getEvents(): Array<{ name: EventName; params?: EventParams; timestamp: number }> {
        return [...this.eventQueue];
    }

    /**
     * Clear event queue (for testing)
     */
    clearEvents(): void {
        this.eventQueue = [];
        this.lastEvents.clear();
    }
}

// Export singleton instance
export const analytics = Analytics.getInstance();

// Convenience functions
export const trackEvent = (eventName: EventName, params?: EventParams) => {
    analytics.track(eventName, params);
};

export const trackPageView = (pageName: string) => {
    analytics.trackPageView(pageName);
};

export const getBudgetBucket = (budget: number) => {
    return analytics.getBudgetBucket(budget);
};
