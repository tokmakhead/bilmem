'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    const HEADER_HEIGHT = 56;

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - HEADER_HEIGHT;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <footer className="border-t border-slate-900 bg-slate-950 pt-24 pb-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <Link href="/" className="relative flex items-center w-fit transition-opacity hover:opacity-80">
                            <Image
                                src="/logo.png"
                                alt="AI Hediye Logo"
                                width={370}
                                height={130}
                                className="h-[40px] w-auto sm:h-[50px] object-contain"
                            />
                        </Link>
                        <p className="max-w-xs text-[15px] font-medium leading-relaxed text-slate-400">
                            Yapay zeka teknolojisi ile sevdikleriniz için en anlamlı hediyeleri saniyeler içinde keşfedin.
                        </p>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-2">
                        {/* Column 1: Ürün */}
                        <div className="flex flex-col gap-5">
                            <h4 className="text-[13px] font-black uppercase tracking-[0.2em] text-white">Ürün</h4>
                            <nav className="flex flex-col gap-3.5">
                                <Link href="/wizard" className="text-[14px] font-medium text-slate-400 transition-colors hover:text-[#F47F7F]">Hediye Sihirbazı</Link>
                                <a href="#nasil-calisir" onClick={(e) => handleSmoothScroll(e, 'nasil-calisir')} className="text-[14px] font-medium text-slate-400 transition-colors hover:text-[#F47F7F]">Nasıl Çalışır?</a>
                            </nav>
                        </div>

                        {/* Column 2: Şirket & Yasal */}
                        <div className="flex flex-col gap-5">
                            <h4 className="text-[13px] font-black uppercase tracking-[0.2em] text-white">Bilgi</h4>
                            <nav className="flex flex-col gap-3.5">
                                <Link href="/hakkimizda" className="text-[14px] font-medium text-slate-400 transition-colors hover:text-[#F47F7F]">Hakkımızda</Link>
                                <Link href="/blog" className="text-[14px] font-medium text-slate-400 transition-colors hover:text-[#F47F7F]">Blog</Link>
                                <Link href="/iletisim" className="text-[14px] font-medium text-slate-400 transition-colors hover:text-[#F47F7F]">İletişim</Link>
                                <Link href="/gizlilik" className="text-[14px] font-medium text-slate-400 transition-colors hover:text-[#F47F7F]">Gizlilik Politikası</Link>
                                <Link href="/kullanim-sartlari" className="text-[14px] font-medium text-slate-400 transition-colors hover:text-[#F47F7F]">Kullanım Şartları</Link>
                                <Link href="/cerez-politikasi" className="text-[14px] font-medium text-slate-400 transition-colors hover:text-[#F47F7F]">Çerez Politikası</Link>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="mt-24 border-t border-slate-900 pt-10">
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <p className="text-[13px] font-medium text-slate-500">
                            © {new Date().getFullYear()} AI Hediye. Tüm hakları saklıdır.
                        </p>
                        <div className="flex items-center gap-6">
                            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600">Geleceğin Hediye Deneyimi</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
