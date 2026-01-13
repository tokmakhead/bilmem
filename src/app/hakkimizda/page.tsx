import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hakkımızda - AI Hediye',
    description: 'AI Hediye hakkında bilgi edinin. Yapay zeka ile hediye önerisi sunma misyonumuz.',
};

export default function HakkimizdaPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#F47F7F] mb-6">
                        ← Ana Sayfaya Dön
                    </Link>
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Hakkımızda</h1>
                    <p className="text-xl text-slate-600">Yapay zeka ile hediye seçimini kolaylaştırıyoruz</p>
                </div>

                {/* Content */}
                <div className="prose prose-slate max-w-none">
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Misyonumuz</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            AI Hediye, sevdikleriniz için mükemmel hediyeyi bulma sürecini yapay zeka teknolojisi ile kolaylaştırmak için tasarlandı.
                            Hediye seçimi bazen zor ve zaman alıcı olabilir. Biz bu süreci basitleştirerek, kişiselleştirilmiş ve anlamlı
                            hediye önerileri sunuyoruz.
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                            Amacımız, her özel gün ve her ilişki için en uygun hediye fikirlerini saniyeler içinde sunarak,
                            hediye verme deneyimini daha keyifli hale getirmektir.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Nasıl Çalışır?</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Gelişmiş yapay zeka modellerimiz, hediye alacağınız kişinin özelliklerini, ilgi alanlarını,
                            bütçenizi ve özel günü analiz ederek size özel öneriler sunar. Her öneri, kişiye özel olarak
                            hazırlanır ve neden bu hediyenin uygun olduğu açıklanır.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Teknolojimiz</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Google Gemini AI teknolojisini kullanarak, milyonlarca hediye seçeneği arasından
                            size en uygun olanları belirliyoruz. Sistemimiz sürekli öğreniyor ve gelişiyor.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">İletişim</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Sorularınız, önerileriniz veya geri bildirimleriniz için{' '}
                            <Link href="/iletisim" className="text-[#F47F7F] hover:underline">
                                iletişim sayfamızı
                            </Link>{' '}
                            ziyaret edebilirsiniz.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
