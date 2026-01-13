/**
 * useAnalytics Hook
 * Simplified hook for tracking events in components
 */

import { useEffect } from 'react';
import { trackEvent, trackPageView } from '@/lib/analytics';

export function usePageView(pageName: string) {
    useEffect(() => {
        trackPageView(pageName);
    }, [pageName]);
}

export function useAnalytics() {
    return {
        track: trackEvent,
    };
}
