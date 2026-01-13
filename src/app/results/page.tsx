'use client';

import { useWizard } from '@/context/WizardContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GiftRecommendation } from '@/types';
import { RECIPIENTS, CLOSENESS_LEVELS, OCCASIONS, INTERESTS } from '@/lib/constants';
import { fetchAIRecommendations } from '@/lib/giftEngine';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SharePanel from '@/components/ui/SharePanel';
import UpsellSection from '@/components/ui/UpsellSection';
import confetti from 'canvas-confetti';

export default function ResultsPage() {
    const { state, dispatch } = useWizard();
    const router = useRouter();
    const [recommendations, setRecommendations] = useState<GiftRecommendation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showSharePanel, setShowSharePanel] = useState(false);
    const [copyFeedback, setCopyFeedback] = useState(false);


    // Get labels for display
    const recipientLabel = RECIPIENTS.find(r => r.id === state.recipient)?.label || 'Biri';

    // Improved interest labels
    const interestLabels = state.interests
        .map(id => INTERESTS.find(i => i.id === id)?.label || id)
        .join(', ');

    useEffect(() => {
        // En yukarı taşı
        window.scrollTo({ top: 0, behavior: 'instant' });

        if (!state.recipient) return;

        let isMounted = true;
        const fetchRecommendations = async () => {
            setIsLoading(true);
            try {
                const results = await fetchAIRecommendations(state);
                if (isMounted) {
                    setRecommendations(results);
                    // 🎉 CELEBRATION: Trigger confetti when results are found!
                    if (results.length > 0) {
                        const duration = 3000;
                        const end = Date.now() + duration;

                        const frame = () => {
                            confetti({
                                particleCount: 2,
                                angle: 60,
                                spread: 55,
                                origin: { x: 0 },
                                colors: ['#F47F7F', '#FFD6D6', '#ffeeee']
                            });
                            confetti({
                                particleCount: 2,
                                angle: 120,
                                spread: 55,
                                origin: { x: 1 },
                                colors: ['#F47F7F', '#FFD6D6', '#ffeeee']
                            });

                            if (Date.now() < end) {
                                requestAnimationFrame(frame);
                            }
                        };
                        frame();
                    }
                }
            } catch (err) {
                const error = err as Error;
                if (process.env.NODE_ENV === 'development') {
                    console.error("Failed to load recommendations", error);
                }
                if (isMounted) {
                    setError(error.message || "Bilinmeyen bir hata oluştu");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchRecommendations();

        return () => { isMounted = false; };
    }, [state]);

    const handleStartOver = () => {
        dispatch({ type: 'RESET' });
        router.push('/wizard');
    };

    // Share handlers
    const handleShare = () => {
        setShowSharePanel(true);
    };

    const handleCopyLink = async () => {
        try {
            const shareUrl = window.location.href;
            await navigator.clipboard.writeText(shareUrl);
            setCopyFeedback(true);
            setTimeout(() => setCopyFeedback(false), 2000);
        } catch (err) {
            if (process.env.NODE_ENV === 'development') {
                console.error('Failed to copy link:', err);
            }
        }
    };

    const handleWhatsAppShare = () => {
        const shareText = "bilmem.net ile bana özel hediye önerileri buldum 🎁";
        const shareUrl = window.location.href;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        window.open(whatsappUrl, '_blank');
        setShowSharePanel(false);
    };

    const handleTwitterShare = () => {
        const shareText = "bilmem.net ile bana özel hediye önerileri buldum 🎁";
        const shareUrl = window.location.href;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, '_blank');
        setShowSharePanel(false);
    };

    if (!state.recipient) {
        return (
            <div className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-[#FFFDFD] px-4">
                <Card className="max-w-md text-center shadow-2xl">
                    <div className="mb-6 text-5xl">🛍️</div>
                    <h2 className="mb-4 text-2xl font-black text-slate-800">Henüz Veri Yok</h2>
                    <Button variant="primary" fullWidth onClick={() => router.push('/wizard')}>
                        Sihirbazı Başlat
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="relative min-h-[calc(100vh-56px)] overflow-hidden bg-gradient-to-b from-[#FFFDFD] via-white to-white py-12 sm:py-20 text-slate-800">
            {/* Animated Background Orbs */}
            <div className="animate-float pointer-events-none absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#F47F7F]/10 to-[#FFD6D6]/5 opacity-30 blur-[100px]" />
            <div className="animate-float-delayed pointer-events-none absolute bottom-0 -left-20 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-blue-50/10 to-[#F47F7F]/5 opacity-20 blur-[120px]" />

            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">

                {/* Content for Successful Scan */}
                {!isLoading && !error && (
                    <>
                        {/* Analysis Header (Restored) */}
                        <div className="mb-12 animate-fade-up text-center lg:text-left">
                            <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-end">
                                <div className="max-w-3xl">
                                    <h1 className="mb-6 text-5xl font-black leading-[1.1] tracking-tighter text-slate-800 sm:text-7xl lg:text-8xl">
                                        <span className="text-[#F47F7F]">{recipientLabel}</span> İçin <br />
                                        <span className="bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">En İyi 3 Öneri</span>
                                    </h1>
                                    <p className="text-xl font-medium leading-relaxed text-slate-500/80">
                                        {interestLabels && <span className="text-[#F47F7F]">#{interestLabels}</span>} odaklı, <span className="font-bold text-slate-800">₺{state.budget.toLocaleString('tr-TR')}</span> altı seçimler.
                                    </p>
                                </div>
                                {/* Floating Check Again & Edit Buttons */}
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <Button
                                        variant="ghost"
                                        className="group text-lg border-2 border-slate-100 hover:border-[#F47F7F]/30 cursor-pointer font-bold uppercase tracking-wider whitespace-nowrap"
                                        onClick={handleStartOver}
                                    >
                                        <span className="relative mr-3 flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                        </span>
                                        Baştan Başla
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="group text-lg border-2 border-slate-100 hover:border-slate-300 cursor-pointer bg-white text-slate-600 font-bold uppercase tracking-wider whitespace-nowrap"
                                        onClick={() => router.push('/wizard')}
                                    >
                                        <span className="mr-2">✎</span> SEÇİMLERİ DÜZENLE
                                    </Button>
                                    <button
                                        onClick={() => setShowSharePanel(true)}
                                        className="group flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-100 bg-white px-6 py-3 text-lg font-bold uppercase tracking-wider text-slate-600 transition-all duration-200 hover:border-[#F47F7F]/30 hover:bg-slate-50 hover:text-[#F47F7F]"
                                        title="Önerileri Paylaş"
                                    >
                                        <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Optimized Results Grid (Top 3 Focus) */}
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            {recommendations.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="animate-fade-up"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <Card className="group h-full flex flex-col overflow-hidden border-none p-0 shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_40px_70px_rgba(244,127,127,0.1)]">
                                        {/* Premium Product Visualizer */}
                                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-50">
                                            {/* Shimmer placeholder */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-shimmer" />

                                            <img
                                                src={item.imageUrl || '/placeholder-gift.jpg'}
                                                alt={item.title}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                referrerPolicy="no-referrer"
                                                onLoad={(e) => {
                                                    // Remove shimmer when image loads
                                                    const shimmer = (e.target as HTMLImageElement).previousElementSibling;
                                                    if (shimmer) shimmer.remove();
                                                }}
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/placeholder-gift.jpg';
                                                    // Remove shimmer on error too
                                                    const shimmer = target.previousElementSibling;
                                                    if (shimmer) shimmer.remove();
                                                }}
                                            />

                                            {/* Category Badge */}
                                            <div className="absolute top-6 left-6">
                                                <span className="rounded-full bg-white/95 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-800 shadow-xl backdrop-blur-md">
                                                    {item.category}
                                                </span>
                                            </div>

                                            {/* Price Tag - Black Border as Requested */}
                                            <div className="absolute bottom-4 right-4 z-20">
                                                <div className="flex flex-col items-end">
                                                    <div className="rounded-xl bg-white/95 px-5 py-3 shadow-xl backdrop-blur-md border border-slate-900 group-hover:border-[#F47F7F] transition-colors duration-300">
                                                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5 text-right">
                                                            Ortalama Fiyat
                                                        </div>
                                                        <span className="text-xl font-black text-slate-900">
                                                            {item.avgPrice ? (
                                                                <>₺{item.avgPrice.toLocaleString('tr-TR')}</>
                                                            ) : (
                                                                <span className="text-lg">{item.priceRange.replace(/tahmini:?\s*/i, '').replace('TL', '').trim()} TL</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="flex flex-1 flex-col p-8">
                                            {/* Title with AI Tooltip - P1-3 */}
                                            <div className="flex items-start justify-between gap-2 mb-4">
                                                <h3 className="text-2xl font-black leading-tight text-slate-800 flex-1">
                                                    {item.title}
                                                </h3>

                                                {/* AI Transparency Tooltip */}
                                                <div className="group/tooltip relative">
                                                    <button className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 transition-all hover:bg-[#F47F7F] hover:text-white hover:scale-110">
                                                        ?
                                                    </button>

                                                    {/* Tooltip Content */}
                                                    <div className="pointer-events-none absolute right-0 top-8 z-30 w-64 opacity-0 transition-all duration-200 group-hover/tooltip:pointer-events-auto group-hover/tooltip:opacity-100">
                                                        <div className="rounded-2xl bg-slate-900 p-4 shadow-2xl">
                                                            <div className="mb-2 text-xs font-black uppercase tracking-wider text-[#F47F7F]">
                                                                AI Neden Bunu Seçti?
                                                            </div>
                                                            <div className="space-y-2 text-sm text-slate-300">
                                                                {state.interests.length > 0 && (
                                                                    <div>
                                                                        <span className="font-bold text-white">İlgi Alanları:</span> {state.interests.map(id => INTERESTS.find(i => i.id === id)?.label || id).join(', ')}
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <span className="font-bold text-white">Bütçe Uyumu:</span> ₺{state.budget.toLocaleString('tr-TR')} limitine uygun
                                                                </div>
                                                                <div>
                                                                    <span className="font-bold text-white">İlişki:</span> {CLOSENESS_LEVELS.find(c => c.id === state.closeness)?.label || state.closeness}
                                                                </div>
                                                                {state.occasion && (
                                                                    <div>
                                                                        <span className="font-bold text-white">Özel Gün:</span> {OCCASIONS.find(o => o.id === state.occasion)?.label || state.occasion}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="mb-8 text-base font-medium leading-relaxed text-slate-500/90">
                                                {item.description}
                                            </p>

                                            {/* CTA Section - Black Button (Ink) */}
                                            <div className="flex gap-4 mt-auto">
                                                <a
                                                    href={item.buyLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => {
                                                        // Track affiliate click for monetization
                                                        if (typeof window !== 'undefined' && window.trackEvent) {
                                                            window.trackEvent('product_cta_click', {
                                                                product_index: index + 1,
                                                                product_title: item.title
                                                            });
                                                        }
                                                    }}
                                                    className="group/btn relative flex-1 overflow-hidden rounded-2xl bg-slate-900 py-5 text-sm font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-slate-800 active:scale-95 text-center shadow-lg hover:shadow-xl cursor-pointer"
                                                >
                                                    <div className="absolute inset-0 translate-x-[-100%] bg-white/10 transition-transform duration-1000 group-hover/btn:translate-x-[100%]" />
                                                    <span className="flex items-center justify-center gap-2">
                                                        ÜRÜNÜ İNCELE <span className="text-xl leading-none">→</span>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>

                                    </Card>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Premium Skeleton Loader - P1-1 */}
                {isLoading && (
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {[0, 1, 2].map((index) => (
                            <div
                                key={index}
                                className="animate-fade-up"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <Card className="h-full flex flex-col overflow-hidden border-none p-0 shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
                                    {/* Image Skeleton */}
                                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
                                        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-shimmer" />
                                    </div>

                                    {/* Content Skeleton */}
                                    <div className="flex flex-1 flex-col p-8 gap-4">
                                        {/* Title Skeleton */}
                                        <div className="h-7 bg-slate-100 rounded-lg w-3/4 animate-pulse" />

                                        {/* Description Skeleton - 2 lines */}
                                        <div className="space-y-2">
                                            <div className="h-4 bg-slate-100 rounded w-full animate-pulse" />
                                            <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse" />
                                        </div>

                                        {/* Button Skeleton */}
                                        <div className="mt-auto">
                                            <div className="h-14 bg-slate-100 rounded-2xl w-full animate-pulse" />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error Display */}
                {!isLoading && error && (
                    <div className="flex animate-fade-up flex-col items-center py-20">
                        <Card className="max-w-xl rounded-[3.5rem] bg-red-50/50 p-10 text-center border-dashed border-2 border-red-200">
                            <div className="mb-6 text-4xl">⚠️</div>
                            <h2 className="mb-4 text-2xl font-black text-red-800 uppercase tracking-tighter">Bir Hata Oluştu</h2>
                            <p className="mb-8 text-base font-bold text-red-600 bg-red-100 p-4 rounded-xl font-mono text-sm break-all">
                                {error}
                            </p>
                            <Button variant="primary" size="lg" onClick={handleStartOver} className="mt-4">
                                Tekrar Dene
                            </Button>
                        </Card>
                    </div>
                )}

                {/* No Product Found Strategy */}
                {!isLoading && !error && recommendations.length === 0 && (
                    <div className="flex animate-fade-up flex-col items-center py-20">
                        <Card className="max-w-xl rounded-[3.5rem] bg-slate-50/50 p-16 text-center border-dashed border-2 border-slate-200">
                            <div className="mb-8 text-5xl">🔍</div>
                            <h2 className="mb-4 text-3xl font-black text-slate-800 uppercase tracking-tighter">İdeal 3 Öneri Bulunamadı</h2>
                            <p className="mb-10 text-lg font-medium text-slate-500">
                                Bütçenizi biraz genişletmeyi veya farklı ilgi alanları eklemeyi deneyin.
                            </p>
                            <Button variant="primary" size="lg" onClick={handleStartOver} className="px-12">
                                Yeni Kriterler Belirle
                            </Button>
                        </Card>
                    </div>
                )}
            </div>

            {/* Upsell Section - Monetization */}
            {!isLoading && !error && recommendations.length > 0 && (
                <UpsellSection />
            )}

            {/* Elegant Spacer */}
            <div className="h-32" />

            {/* Share Panel */}
            <SharePanel isOpen={showSharePanel} onClose={() => setShowSharePanel(false)} />
        </div>
    );
}
