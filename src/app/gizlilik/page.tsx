import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gizlilik Politikası - AI Hediye',
    description: 'AI Hediye gizlilik politikası. Verilerinizin nasıl toplandığı ve kullanıldığı hakkında bilgi.',
};

export default function GizlilikPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#F47F7F] mb-6">
                        ← Ana Sayfaya Dön
                    </Link>
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Gizlilik Politikası</h1>
                    <p className="text-sm text-slate-600">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
                </div>

                {/* Content */}
                <div className="prose prose-slate max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Genel Bilgiler</h2>
                        <p className="text-slate-700 leading-relaxed">
                            AI Hediye olarak, kullanıcılarımızın gizliliğini korumayı en önemli önceliklerimizden biri olarak görüyoruz.
                            Bu gizlilik politikası, kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Toplanan Bilgiler</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Hizmetimizi kullanırken aşağıdaki bilgileri toplayabiliriz:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li>Hediye sihirbazında girdiğiniz tercihler (alıcı bilgisi, bütçe, ilgi alanları)</li>
                            <li>Tarayıcı türü ve cihaz bilgileri</li>
                            <li>IP adresi ve konum bilgisi (anonim)</li>
                            <li>Kullanım istatistikleri ve etkileşim verileri</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Bilgilerin Kullanımı</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Topladığımız bilgileri şu amaçlarla kullanırız:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li>Kişiselleştirilmiş hediye önerileri sunmak</li>
                            <li>Hizmet kalitesini iyileştirmek</li>
                            <li>Kullanıcı deneyimini optimize etmek</li>
                            <li>Teknik sorunları tespit etmek ve çözmek</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Veri Güvenliği</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Verilerinizi korumak için endüstri standardı güvenlik önlemleri kullanıyoruz.
                            Tüm veri iletişimi şifrelenmiş kanallar üzerinden gerçekleşir. Kişisel verileriniz
                            üçüncü taraflarla paylaşılmaz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Çerezler</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Hizmetimizi iyileştirmek için çerezler kullanıyoruz. Çerez kullanımı hakkında detaylı bilgi için{' '}
                            <Link href="/cerez-politikasi" className="text-[#F47F7F] hover:underline">
                                Çerez Politikası
                            </Link>{' '}
                            sayfamızı ziyaret edebilirsiniz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Kullanıcı Hakları</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            KVKK kapsamında aşağıdaki haklara sahipsiniz:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                            <li>İşlenen verileriniz hakkında bilgi talep etme</li>
                            <li>Verilerin düzeltilmesini veya silinmesini isteme</li>
                            <li>İşlemeye itiraz etme</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">7. İletişim</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Gizlilik politikamız hakkında sorularınız için{' '}
                            <Link href="/iletisim" className="text-[#F47F7F] hover:underline">
                                iletişim sayfamızı
                            </Link>{' '}
                            kullanabilirsiniz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Değişiklikler</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler olduğunda
                            kullanıcılarımızı bilgilendireceğiz.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
