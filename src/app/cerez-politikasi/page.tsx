import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Çerez Politikası - AI Hediye',
    description: 'AI Hediye çerez politikası. Çerezlerin nasıl kullanıldığı hakkında bilgi.',
};

export default function CerezPolitikasiPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#F47F7F] mb-6">
                        ← Ana Sayfaya Dön
                    </Link>
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Çerez Politikası</h1>
                    <p className="text-sm text-slate-600">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
                </div>

                {/* Content */}
                <div className="prose prose-slate max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Çerez Nedir?</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Çerezler, web sitelerini ziyaret ettiğinizde cihazınıza kaydedilen küçük metin dosyalarıdır.
                            Çerezler, web sitesinin düzgün çalışmasını sağlamak ve kullanıcı deneyimini iyileştirmek için kullanılır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Kullandığımız Çerez Türleri</h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Zorunlu Çerezler</h3>
                                <p className="text-slate-700 leading-relaxed">
                                    Web sitesinin temel işlevlerini yerine getirmesi için gerekli çerezlerdir.
                                    Bu çerezler olmadan site düzgün çalışmaz.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Performans Çerezleri</h3>
                                <p className="text-slate-700 leading-relaxed">
                                    Ziyaretçilerin siteyi nasıl kullandığını anlamamıza yardımcı olan çerezlerdir.
                                    Bu bilgiler anonim olarak toplanır ve site performansını iyileştirmek için kullanılır.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">İşlevsellik Çerezleri</h3>
                                <p className="text-slate-700 leading-relaxed">
                                    Tercihlerinizi hatırlamamızı ve kişiselleştirilmiş özellikler sunmamızı sağlayan çerezlerdir.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Kullanım Amaçları</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Çerezleri şu amaçlarla kullanıyoruz:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li>Sihirbaz tercihlerinizi hatırlamak (localStorage)</li>
                            <li>Site performansını ölçmek ve iyileştirmek</li>
                            <li>Kullanıcı deneyimini kişiselleştirmek</li>
                            <li>Güvenlik önlemlerini uygulamak</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Çerez Yönetimi</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Çerezleri tarayıcı ayarlarınızdan yönetebilirsiniz:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li>Tüm çerezleri engelleyebilirsiniz</li>
                            <li>Sadece üçüncü taraf çerezleri engelleyebilirsiniz</li>
                            <li>Mevcut çerezleri silebilirsiniz</li>
                            <li>Çerez tercihlerinizi her zaman değiştirebilirsiniz</li>
                        </ul>
                        <p className="text-slate-700 leading-relaxed mt-4">
                            <strong>Not:</strong> Çerezleri engellerseniz, bazı site özellikleri düzgün çalışmayabilir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Üçüncü Taraf Çerezleri</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Sitemizde şu üçüncü taraf servisleri kullanılabilir:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-4">
                            <li>Google Analytics (site analizi)</li>
                            <li>Google Fonts (tipografi)</li>
                        </ul>
                        <p className="text-slate-700 leading-relaxed mt-4">
                            Bu servislerin kendi çerez politikaları vardır ve bunlar üzerinde kontrolümüz yoktur.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Değişiklikler</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Bu çerez politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler olduğunda
                            kullanıcılarımızı bilgilendireceğiz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">7. İletişim</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Çerez politikamız hakkında sorularınız için{' '}
                            <Link href="/iletisim" className="text-[#F47F7F] hover:underline">
                                iletişim sayfamızı
                            </Link>{' '}
                            kullanabilirsiniz.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
