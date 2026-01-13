import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog - AI Hediye',
    description: 'Hediye fikirleri, özel günler ve yapay zeka hakkında yazılarımız.',
};

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#F47F7F] mb-6">
                        ← Ana Sayfaya Dön
                    </Link>
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Blog</h1>
                    <p className="text-xl text-slate-600">Hediye fikirleri ve özel günler rehberi</p>
                </div>

                {/* Coming Soon */}
                <div className="text-center py-20">
                    <div className="text-6xl mb-6">📝</div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Yakında Burada Olacak!</h2>
                    <p className="text-slate-600 mb-8 max-w-md mx-auto">
                        Hediye fikirleri, özel günler için rehberler ve yapay zeka ile hediye seçimi hakkında
                        ilginç içerikler hazırlıyoruz.
                    </p>
                    <Link
                        href="/wizard"
                        className="inline-flex items-center justify-center rounded-full bg-[#F47F7F] px-8 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#E66A6A] hover:shadow-md"
                    >
                        Hediye Bulmaya Başla
                    </Link>
                </div>
            </div>
        </div>
    );
}
