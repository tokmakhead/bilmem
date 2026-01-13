'use client';

import Link from 'next/link';
import Card from '@/components/ui/Card';
import AntigravityCanvas from '@/components/home/AntigravityCanvas';

export default function Home() {
  const steps = [
    {
      number: 1,
      title: 'Bilgi Ver',
      description: 'Hediye alacağınız kişi hakkında birkaç basit soru yanıtlayın.',
      icon: '📝',
    },
    {
      number: 2,
      title: 'AI Analiz Etsin',
      description: 'Yapay zekamız tercihlerinize göre en uygun hediyeleri belirlesin.',
      icon: '🤖',
    },
    {
      number: 3,
      title: 'Hediye Seç',
      description: 'Kişiselleştirilmiş öneriler arasından size en uygununu seçin.',
      icon: '🎁',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* SECTION 1: Hero + Hediye Seç (Harmonized Flow) */}
      <section id="home" className="relative overflow-hidden bg-white pt-24 pb-32 sm:pt-32 sm:pb-48">
        <AntigravityCanvas />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* High-End Badge */}
            <div className="mb-8 inline-flex items-center gap-3 rounded-2xl bg-[#F47F7F]/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F47F7F] ring-1 ring-inset ring-[#F47F7F]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F47F7F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F47F7F]"></span>
              </span>
              AI-Powered Gifting
            </div>

            {/* Premium Heading */}
            <h1 className="mb-8 max-w-5xl text-5xl font-black leading-[1.1] tracking-tighter text-slate-800 sm:text-7xl lg:text-8xl">
              Doğru hediyeyi <br />
              <span className="bg-gradient-to-r from-[#F47F7F] via-[#FF8A8A] to-[#F47F7F] bg-clip-text text-transparent">saniyeler içinde</span> bulun
            </h1>

            {/* Refined Subtitle */}
            <p className="mb-14 max-w-2xl text-lg font-medium leading-relaxed text-slate-500/80 sm:text-xl">
              Hediye seçme stresini geride bırakın. Gelişmiş yapay zeka algoritmamızla sevdikleriniz için en anlamlı seçenekleri anında keşfedin.
            </p>

            {/* Unified CTA Area */}
            <div className="flex flex-col items-center gap-12">
              {/* High-Fidelity CTA Button */}
              <div className="group relative w-full sm:w-auto">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#F47F7F] to-[#FFD6D6] opacity-30 blur-xl transition duration-1000 group-hover:opacity-60 group-hover:duration-200" />
                <Link
                  href="/wizard"
                  className="relative block w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#F47F7F] via-[#FF8A8A] to-[#E66A6A] px-16 py-7 text-2xl font-black tracking-tight text-white shadow-2xl shadow-[#F47F7F]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {/* Shimmer Effect */}
                  <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                  <div className="flex items-center justify-center gap-3">
                    <span>HEDİYENİ BUL</span>
                    <span className="text-3xl transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              </div>

              {/* Technical Trust Metrics (Integrated) */}
              <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-xl font-black text-slate-700">98% Match</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F47F7F]/60">Accuracy</span>
                </div>
                <div className="hidden h-10 w-px bg-slate-200 sm:block" />
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-xl font-black text-slate-700">120ms</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F47F7F]/60">AI Sync</span>
                </div>
                <div className="hidden h-10 w-px bg-slate-200 sm:block" />
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-xl font-black text-slate-700">50k+ Products</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F47F7F]/60">Scan Engine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Nasıl Çalışır (Premium Soft Slate Tint) */}
      <section id="nasil-calisir" className="bg-[#F8FAFC] py-28 sm:py-36 border-y border-slate-200/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-4xl font-bold text-slate-700 sm:text-5xl">
              Nasıl Çalışır?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-500">
              Yapay zeka asistanımızla 3 kolay adımda mükemmel hediyeyi keşfedin.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <Card key={step.number} hover className="border-slate-200/50 bg-white p-10">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-[#FFF9F9] text-4xl shadow-sm ring-1 ring-[#FFD6D6]/50 transition-transform group-hover:scale-110">
                  {step.icon}
                </div>
                <div className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#F47F7F]">
                  ADIM 0{step.number}
                </div>
                <h3 className="mb-4 text-2xl font-bold text-slate-700">{step.title}</h3>
                <p className="leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: İstatistikler (Clean White) */}
      <section className="bg-white py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
            {[
              { label: 'Mutlu Kullanıcı', value: '10k+' },
              { label: 'Hediye Önerisi', value: '150k+' },
              { label: 'Başarı Oranı', value: '%99' },
            ].map((stat, idx) => (
              <div key={idx} className="group flex flex-col items-center text-center">
                <div className="mb-4 text-5xl font-black tracking-tighter text-slate-800 transition-colors group-hover:text-[#F47F7F] sm:text-7xl">
                  {stat.value}
                </div>
                <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
