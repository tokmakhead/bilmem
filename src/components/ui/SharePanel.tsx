'use client';

import { useState } from 'react';

interface SharePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SharePanel({ isOpen, onClose }: SharePanelProps) {
    const [copyFeedback, setCopyFeedback] = useState(false);

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
        onClose();
    };

    const handleTwitterShare = () => {
        const shareText = "bilmem.net ile bana özel hediye önerileri buldum 🎁";
        const shareUrl = window.location.href;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, '_blank');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-fade-up"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-8 shadow-2xl transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="mb-6 text-center">
                    <h3 className="text-2xl font-black text-slate-800">Önerileri Paylaş</h3>
                    <p className="mt-2 text-sm text-slate-500">Arkadaşlarınla paylaş, onlar da keşfetsin</p>
                </div>

                {/* Share Options */}
                <div className="space-y-3">
                    {/* Copy Link */}
                    <button
                        onClick={handleCopyLink}
                        className="w-full flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white p-4 text-left transition-all hover:border-[#F47F7F]/30 hover:bg-slate-50"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                            <svg className="h-6 w-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-slate-800">Linki Kopyala</div>
                            {copyFeedback && <div className="text-xs text-[#F47F7F] font-bold">✓ Link kopyalandı</div>}
                        </div>
                    </button>

                    {/* WhatsApp */}
                    <button
                        onClick={handleWhatsAppShare}
                        className="w-full flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white p-4 text-left transition-all hover:border-green-500/30 hover:bg-green-50"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                            <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-slate-800">WhatsApp&apos;ta Paylaş</div>
                        </div>
                    </button>

                    {/* Twitter */}
                    <button
                        onClick={handleTwitterShare}
                        className="w-full flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white p-4 text-left transition-all hover:border-blue-500/30 hover:bg-blue-50"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                            <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-slate-800">X (Twitter)&apos;da Paylaş</div>
                        </div>
                    </button>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="mt-6 w-full rounded-2xl bg-slate-100 py-3 font-bold text-slate-600 transition-colors hover:bg-slate-200"
                >
                    Kapat
                </button>
            </div>
        </div>
    );
}
