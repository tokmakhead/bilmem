'use client';

import { useState, useRef, useEffect } from 'react';

// Email regex validation
const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function FeedbackButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [messageError, setMessageError] = useState('');

    // Rate limiting for client-side UI spam prevention
    const lastSubmitTime = useRef<number>(0);

    // Form states
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
        email: '',
        type: 'suggestion', // suggestion, bug, other
        honeypot: '' // Spam trap
    });

    // Close on click outside
    const panelRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                panelRef.current &&
                !panelRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessageError('');

        // Client-side throttling (5 seconds)
        const now = Date.now();
        if (now - lastSubmitTime.current < 5000) {
            return; // Silently ignore rapid clicks
        }

        // Honeypot check
        if (formData.honeypot) {
            // Looks like a bot, pretend success
            setStatus('success');
            setTimeout(() => {
                setIsOpen(false);
                setStatus('idle');
                setFormData({ subject: '', message: '', email: '', type: 'suggestion', honeypot: '' });
            }, 2000);
            return;
        }

        // Validation
        if (!formData.message.trim()) {
            setMessageError('Lütfen bir mesaj yazın.');
            return;
        }

        if (formData.email && !isValidEmail(formData.email)) {
            setMessageError('Geçerli bir e-posta adresi girin.');
            return;
        }

        setIsLoading(true);
        lastSubmitTime.current = now;

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    url: window.location.href, // Send current page URL
                    userAgent: navigator.userAgent
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ subject: '', message: '', email: '', type: 'suggestion', honeypot: '' });
                // Close after success message
                setTimeout(() => {
                    setIsOpen(false);
                    setStatus('idle');
                }, 3000);
            } else {
                const data = await response.json();
                setMessageError(data.error || 'Bir hata oluştu.');
                setStatus('error');
            }
        } catch (error) {
            setMessageError('Bağlantı hatası.');
            setStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Trigger Button - Bottom Left Fixed */}
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 left-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full 
        bg-white/90 backdrop-blur-md border border-slate-200/60
        shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
        group outline-none focus-visible:ring-2 focus-visible:ring-[#F47F7F]/50
        active:scale-95 cursor-pointer
        ${isOpen ? 'bg-slate-50 scale-95 opacity-80' : 'hover:-translate-y-0.5'}
        `}
                aria-label="Geri bildirim gönder"
                aria-expanded={isOpen}
            >
                <div className={`relative flex items-center justify-center w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                    {isOpen ? (
                        // Close Icon (Static)
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        // Feedback Icon (Animated)
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[#F47F7F] animate-float-icon"
                        >
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                    )}
                </div>
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors cursor-pointer">
                    {isOpen ? 'Kapat' : 'Geri Bildirim'}
                </span>
            </button>

            {/* Popover Panel */}
            <div
                ref={panelRef}
                className={`fixed bottom-20 left-6 z-50 w-[calc(100vw-3rem)] sm:w-[360px] 
        bg-white rounded-2xl border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]
        origin-bottom-left transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${isOpen
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                        : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                    }
        `}
            >
                {status === 'success' ? (
                    <div className="p-8 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-1">Teşekkürler!</h3>
                        <p className="text-slate-500 text-sm">Geri bildirimin bize ulaştı. 2 dakikada okuyup değerlendireceğiz.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-5">
                        <div className="mb-5">
                            <h3 className="text-base font-semibold text-slate-800">Bize Fikrini Söyle</h3>
                            <p className="text-xs text-slate-500 mt-1">Daha iyi bir deneyim için önerilerini bekliyoruz.</p>
                        </div>

                        <div className="space-y-4">
                            {/* Type Selection - Enhanced with interactions */}
                            <div className="flex bg-slate-100/80 p-1.5 rounded-xl gap-1">
                                {[
                                    { id: 'suggestion', label: '✨ Öneri' },
                                    { id: 'bug', label: '🐛 Hata' },
                                    { id: 'other', label: '💬 Diğer' }
                                ].map(type => (
                                    <button
                                        key={type.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: type.id })}
                                        className={`flex-1 text-xs font-semibold py-2 px-2 rounded-lg transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#F47F7F]/50
                    active:scale-95 select-none cursor-pointer
                    ${formData.type === type.id
                                                ? 'bg-white text-[#F47F7F] shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/5'
                                                : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                                            }`}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>

                            {/* Subject - Enhanced Focus */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Konu (Kısaca)"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#F47F7F] focus:ring-4 focus:ring-[#F47F7F]/10 outline-none transition-all duration-200 placeholder:text-slate-400"
                                />
                            </div>

                            {/* Message - Enhanced Focus */}
                            <div>
                                <textarea
                                    placeholder="Aklındakileri bizimle paylaş..."
                                    rows={3}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#F47F7F] focus:ring-4 focus:ring-[#F47F7F]/10 outline-none transition-all duration-200 resize-none placeholder:text-slate-400 min-h-[100px]"
                                    required
                                />
                            </div>

                            {/* Email (Optional) - Enhanced Focus */}
                            <div>
                                <input
                                    type="email"
                                    placeholder="E-posta (geri dönüş istersen)"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#F47F7F] focus:ring-4 focus:ring-[#F47F7F]/10 outline-none transition-all duration-200 placeholder:text-slate-400"
                                />
                            </div>

                            {/* Spam Trap (Honeypot) - Hidden */}
                            <input
                                type="text"
                                name="honeypot"
                                style={{ display: 'none' }}
                                tabIndex={-1}
                                autoComplete="off"
                                value={formData.honeypot}
                                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                            />

                            {/* Status Message */}
                            {messageError && (
                                <div className="flex items-start gap-2 text-xs text-red-500 bg-red-50 p-2.5 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-1">
                                    <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                    <span>{messageError}</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors px-3 py-2 rounded-lg hover:bg-slate-50 active:scale-95 cursor-pointer"
                            >
                                Vazgeç
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                            >
                                {isLoading && (
                                    <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {isLoading ? 'Gönderiliyor...' : 'Gönder'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
