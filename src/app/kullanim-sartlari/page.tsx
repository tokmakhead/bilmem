import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kullanım Şartları - AI Hediye',
    description: 'AI Hediye kullanım şartları ve koşulları.',
};

export default function KullanimSartlariPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#F47F7F] mb-6">
                        ← Ana Sayfaya Dön
                    </Link>
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Kullanım Şartları</h1>
                    <p className="text-sm text-slate-600">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
                </div>

                {/* Content */}
                <div className="prose prose-slate max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Hizmetin Kabul Edilmesi</h2>
                        <p className="text-slate-700 leading-relaxed">
                            AI Hediye hizmetini kullanarak, bu kullanım şartlarını kabul etmiş sayılırsınız.
                            Şartları kabul etmiyorsanız, lütfen hizmeti kullanmayınız.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Hizmet Açıklaması</h2>
                        <p className="text-slate-700 leading-relaxed">
                            AI Hediye, yapay zeka teknolojisi kullanarak kişiselleştirilmiş hediye önerileri sunan
                            ücretsiz bir web uygulamasıdır. Öneriler bilgilendirme amaçlıdır ve garanti teşkil etmez.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Kullanıcı Sorumlulukları</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Hizmeti kullanırken:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li>Doğru ve güncel bilgiler sağlamalısınız</li>
                            <li>Hizmeti yasalara uygun şekilde kullanmalısınız</li>
                            <li>Sisteme zarar verecek faaliyetlerden kaçınmalısınız</li>
                            <li>Diğer kullanıcıların haklarına saygı göstermelisiniz</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Fikri Mülkiyet Hakları</h2>
                        <p className="text-slate-700 leading-relaxed">
                            AI Hediye platformu, içeriği, tasarımı ve tüm materyalleri telif hakkı ve diğer
                            fikri mülkiyet yasaları ile korunmaktadır. İzinsiz kullanım yasaktır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Sorumluluk Reddi</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            AI Hediye:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li>Önerilerin doğruluğunu garanti etmez</li>
                            <li>Üçüncü taraf sitelerin içeriğinden sorumlu değildir</li>
                            <li>Hizmetin kesintisiz olacağını garanti etmez</li>
                            <li>Kullanıcıların kararlarından sorumlu tutulamaz</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Hizmet Değişiklikleri</h2>
                        <p className="text-slate-700 leading-relaxed">
                            AI Hediye, hizmeti dilediği zaman değiştirme, askıya alma veya sonlandırma hakkını saklı tutar.
                            Önemli değişiklikler kullanıcılara bildirilecektir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Gizlilik</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Kişisel verilerinizin işlenmesi hakkında detaylı bilgi için{' '}
                            <Link href="/gizlilik" className="text-[#F47F7F] hover:underline">
                                Gizlilik Politikası
                            </Link>{' '}
                            sayfamızı inceleyiniz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Uygulanacak Hukuk</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Bu kullanım şartları Türkiye Cumhuriyeti yasalarına tabidir.
                            Uyuşmazlıklar Türkiye mahkemelerinde çözümlenecektir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">9. İletişim</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Kullanım şartları hakkında sorularınız için{' '}
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
