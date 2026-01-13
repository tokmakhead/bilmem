// Global type extensions
declare global {
    interface Window {
        trackEvent?: (eventName: string, params: Record<string, unknown>) => void;
    }
}

export { };
