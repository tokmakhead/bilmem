'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function UpsellSection() {
    const [showNotification, setShowNotification] = useState(false);

    const handleClick = () => {
        // Track upsell click (analytics)
        if (typeof window !== 'undefined' && window.trackEvent) {
            window.trackEvent('upsell_click', { type: 'more_recommendations' });
        }

        // Show premium notification
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);

        // Don't reload, just show notification
        // onGenerateMore();
    };

    return (
        <>
            {/* Premium Notification Toast */}
            {showNotification && (
                <div className="fixed top-6 right-6 z-50 animate-fade-up">
                    <div className="rounded-2xl bg-gradient-to-r from-[#F47F7F] to-[#FF8A8A] p-6 shadow-2xl">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                <span className="text-xl">✨</span>
                            </div>
                            <div>
                                <div className="text-lg font-black text-white">Yakında</div>
                                <div className="text-sm text-white/90">Bu özellik çok yakında aktif olacak</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-20 mb-12 animate-fade-up" style={{ animationDelay: '400ms' }}>
                <Card className="max-w-3xl mx-auto border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-10 text-center shadow-lg">
                    <div className="mb-6">
                        <h3 className="text-3xl font-black text-slate-800 mb-3">
                            Daha Fazla Seçenek Görmek İster misin?
                        </h3>
                        <p className="text-lg text-slate-600 font-medium">
                            Yapay zeka ile 6 yeni, farklı öneri üret.
                        </p>
                    </div>

                    <Button
                        variant="secondary"
                        size="lg"
                        className="text-lg px-8 border-2 border-slate-300 hover:border-[#F47F7F] hover:bg-white"
                        onClick={handleClick}
                    >
                        <span className="mr-2">✨</span>
                        +6 Yeni Öneri Üret
                    </Button>

                    {/* Premium Teaser */}
                    <div className="mt-6 pt-6 border-t border-slate-200">
                        <p className="text-sm text-slate-500 font-medium">
                            <span className="inline-flex items-center gap-2 bg-[#F47F7F]/10 text-[#F47F7F] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                Yakında
                            </span>
                            <span className="ml-2">Sınırsız öneri + fiyat karşılaştırma</span>
                        </p>
                    </div>

                    {/* Trust & Transparency */}
                    <div className="mt-4">
                        <p className="text-xs text-slate-400 italic">
                            Öneriler yapay zeka tarafından üretilir, sponsorlu değildir.
                        </p>
                    </div>
                </Card>
            </div>
        </>
    );
}
