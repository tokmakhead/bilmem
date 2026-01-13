'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWizard } from '@/context/WizardContext';

export default function Header() {
    const pathname = usePathname();
    const { dispatch } = useWizard();
    const isWizard = pathname?.includes('/wizard');
    const isResults = pathname?.includes('/results');
    const shouldHideNav = isWizard || isResults;

    // Reset wizard state when going home
    const handleHomeClick = () => {
        dispatch({ type: 'RESET' });
    };

    // Smooth scroll handler (kept for compatibility if needed)
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        // Only prevent default if we are on the homepage, otherwise let Link handle navigation
        if (pathname === '/') {
            e.preventDefault();
            const element = document.getElementById(targetId);
            if (element) {
                const headerOffset = 64;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
            <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
                {/* Logo - Navigates to Home */}
                <Link href="/" onClick={handleHomeClick} className="relative flex items-center h-full py-1 transition-opacity duration-200 hover:opacity-80">
                    <Image
                        src="/logo.png"
                        alt="AI Hediye Logo"
                        width={370}
                        height={130}
                        className="h-[32px] w-auto sm:h-[44px] object-contain"
                        priority
                    />
                </Link>

                {/* Navigation - Hidden in Wizard and Results */}
                <div className="flex items-center gap-6">
                    {!shouldHideNav && (
                        <Link
                            href="/#nasil-calisir"
                            onClick={(e) => handleSmoothScroll(e, 'nasil-calisir')}
                            className="text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white cursor-pointer"
                        >
                            Nasıl Çalışır
                        </Link>
                    )}

                    {/* CTA Button */}
                    <Link
                        href="/wizard"
                        className="inline-flex items-center justify-center rounded-full bg-[#F47F7F] px-5 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#E66A6A] hover:shadow-md active:scale-[0.98]"
                    >
                        Hediye Bul
                    </Link>
                </div>
            </div>
        </header>
    );
}
