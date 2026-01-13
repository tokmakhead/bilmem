import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'İletişim - AI Hediye',
    description: 'AI Hediye ile iletişime geçin. Sorularınız ve önerileriniz için bize ulaşın.',
};

export default function IletisimPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#F47F7F] mb-6">
                        ← Ana Sayfaya Dön
                    </Link>
                    <h1 className="text-4xl font-black text-slate-900 mb-4">İletişim</h1>
                    <p className="text-xl text-slate-600">Bizimle iletişime geçin</p>
                </div>

                {/* Content */}
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Contact Info */}
                    <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">İletişim Bilgileri</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-700 mb-1">E-posta</h3>
                                <a href="mailto:info@aihediye.com" className="text-[#F47F7F] hover:underline">
                                    info@aihediye.com
                                </a>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-slate-700 mb-1">Destek</h3>
                                <a href="mailto:destek@aihediye.com" className="text-[#F47F7F] hover:underline">
                                    destek@aihediye.com
                                </a>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-slate-700 mb-1">Çalışma Saatleri</h3>
                                <p className="text-slate-600">Pazartesi - Cuma: 09:00 - 18:00</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Hızlı Linkler</h2>

                        <div className="space-y-3">
                            <Link href="/hakkimizda" className="block text-slate-700 hover:text-[#F47F7F] transition-colors">
                                → Hakkımızda
                            </Link>
                            <Link href="/gizlilik" className="block text-slate-700 hover:text-[#F47F7F] transition-colors">
                                → Gizlilik Politikası
                            </Link>
                            <Link href="/kullanim-sartlari" className="block text-slate-700 hover:text-[#F47F7F] transition-colors">
                                → Kullanım Şartları
                            </Link>
                            <Link href="/wizard" className="block text-slate-700 hover:text-[#F47F7F] transition-colors">
                                → Hediye Sihirbazı
                            </Link>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-12 rounded-2xl bg-slate-100 p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Sık Sorulan Sorular</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-2">AI Hediye ücretsiz mi?</h3>
                            <p className="text-slate-700">Evet, hediye önerisi alma servisi tamamen ücretsizdir.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-2">Verilerim güvende mi?</h3>
                            <p className="text-slate-700">Evet, verileriniz güvenli bir şekilde saklanır ve üçüncü taraflarla paylaşılmaz.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-2">Öneriler ne kadar sürede hazırlanır?</h3>
                            <p className="text-slate-700">Yapay zeka önerilerinizi genellikle 10-15 saniye içinde hazırlar.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
