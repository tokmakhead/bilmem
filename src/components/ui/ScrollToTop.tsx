'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when page is scrolled down 400px
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Yukarı Çık"
            className={`fixed bottom-6 right-6 z-40 p-3 rounded-full 
      bg-[#F47F7F] text-white border border-white/20
      shadow-[0_8px_20px_rgba(244,127,127,0.4)] 
      transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
      hover:bg-[#E66A6A] hover:shadow-[0_12px_24px_rgba(244,127,127,0.6)] hover:-translate-y-1
      active:scale-95 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#F47F7F]/30
      ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12 pointer-events-none'
                }`}
        >
            <svg
                className="w-6 h-6 stroke-[2.5px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>

            {/* Glossy Reflection Effect (Subtle) */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
        </button>
    );
}
