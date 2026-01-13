'use client';

import { useWizard } from '@/context/WizardContext';
import { useRouter } from 'next/navigation';
import { WIZARD_STEPS, RECIPIENTS, CLOSENESS_LEVELS, INTERESTS, OCCASIONS, BUDGET_PRESETS, BUDGET_MIN, BUDGET_MAX, MAX_INTERESTS } from '@/lib/constants';
import { WizardAction, Occasion } from '@/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WizardPage() {
    const { state, dispatch, canProceed } = useWizard();
    const router = useRouter();
    const currentStepInfo = WIZARD_STEPS.find(s => s.number === state.currentStep);
    const [customInterest, setCustomInterest] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);

    // Otomatik yukarı kaydırma
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [state.currentStep]);

    const handleNext = () => {
        if (state.currentStep === 5) {
            router.push('/results');
        } else {
            dispatch({ type: 'NEXT_STEP' });
        }
    };

    const handlePrev = () => {
        if (state.currentStep === 1) {
            router.push('/');
        } else {
            dispatch({ type: 'PREV_STEP' });
        }
    };

    const handleAutoNext = (action: WizardAction) => {
        dispatch(action);
        setTimeout(() => {
            dispatch({ type: 'NEXT_STEP' });
        }, 300); // Küçük bir gecikme ile görsel geri bildirimi sağla
    };

    const formatBudget = (value: number) => {
        if (value >= 15000) return '₺15.000+';
        return `₺${value.toLocaleString('tr-TR')}`;
    };

    const handleAddCustomInterest = (e: React.FormEvent) => {
        e.preventDefault();
        if (customInterest.trim() && state.interests.length < MAX_INTERESTS) {
            dispatch({ type: 'TOGGLE_INTEREST', payload: customInterest.trim() });
            setCustomInterest('');
            setShowCustomInput(false);

            // Only scroll if we reached the max limit after adding this one
            if (state.interests.length + 1 === MAX_INTERESTS) {
                handleScrollToBottom();
            }
        }
    };

    const handleScrollToBottom = () => {
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
    };

    const handleInterestToggle = (id: string) => {
        const isSelected = state.interests.includes(id);
        dispatch({ type: 'TOGGLE_INTEREST', payload: id });

        // Auto scroll ONLY if we just added an item AND reached the limit
        if (!isSelected && state.interests.length + 1 === MAX_INTERESTS) {
            handleScrollToBottom();
        }
    };

    const handleOccasionSelect = (id: string) => {
        dispatch({ type: 'SET_OCCASION', payload: (state.occasion === id ? null : id) as Occasion | null });
        handleScrollToBottom();
    };

    return (
        <div className="relative min-h-[calc(100vh-56px)] overflow-hidden bg-gradient-to-b from-[#FFFDFD] via-white to-white py-12 sm:py-20">
            {/* Thin Progress Bar - P1-2 */}
            <div className="fixed top-16 left-0 right-0 z-40 h-1 bg-slate-100">
                <div
                    className="h-full bg-gradient-to-r from-[#F47F7F] to-[#FF8A8A] transition-all duration-500 ease-out"
                    style={{ width: `${(state.currentStep / 5) * 100}%` }}
                />
            </div>

            {/* Animated Background Orbs */}
            <div className="animate-float pointer-events-none absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-[#F47F7F]/10 to-[#FFD6D6]/5 opacity-40 blur-[80px]" />
            <div className="animate-float-delayed pointer-events-none absolute bottom-0 -left-20 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-50/20 to-[#F47F7F]/5 opacity-30 blur-[100px]" />

            <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
                {/* PREMİUM PROGRESS TRACKER */}
                <div className="mb-12 flex items-center justify-center">
                    <div className="inline-flex items-center gap-1 rounded-2xl bg-white/40 p-1.5 shadow-xl shadow-slate-100/50 backdrop-blur-xl ring-1 ring-slate-200/50">
                        {WIZARD_STEPS.map((step) => {
                            const isActive = step.number === state.currentStep;
                            const isCompleted = step.number < state.currentStep;
                            return (
                                <div
                                    key={step.number}
                                    className={`relative flex h-10 w-10 items-center justify-center rounded-xl text-xs font-black transition-all duration-300 ${isActive
                                        ? 'bg-[#F47F7F] text-white shadow-lg shadow-[#F47F7F]/30 scale-110'
                                        : isCompleted
                                            ? 'bg-[#F47F7F]/10 text-[#F47F7F]'
                                            : 'bg-white/50 text-slate-300'
                                        }`}
                                >
                                    {isCompleted ? '✓' : step.number}
                                    {isActive && (
                                        <div className="absolute -bottom-1 h-1 w-1 rounded-full bg-white" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* STEP HERO */}
                <div key={state.currentStep} className="animate-fade-up mb-12 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#F47F7F]/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#F47F7F] ring-1 ring-[#F47F7F]/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F47F7F] opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F47F7F]"></span>
                        </span>
                        Aşama 0{state.currentStep} / 05
                    </div>
                    <h1 className="mb-4 text-4xl font-black tracking-tighter text-slate-800 sm:text-5xl">
                        {currentStepInfo?.title}
                    </h1>
                    <p className="mx-auto max-w-lg text-lg font-medium text-slate-500/80">
                        {currentStepInfo?.description}
                    </p>
                </div>

                {/* STEP CONTENT CONTAINER */}
                <div className="mb-12">
                    {/* Step 1: Recipient */}
                    {state.currentStep === 1 && (
                        <div className="animate-fade-up grid gap-4 sm:grid-cols-2">
                            {RECIPIENTS.map((recipient) => (
                                <button
                                    key={recipient.id}
                                    onClick={() => handleAutoNext({ type: 'SET_RECIPIENT', payload: recipient.id })}
                                    className={`group flex items-center gap-4 rounded-[2rem] border-2 p-6 text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${state.recipient === recipient.id
                                        ? 'border-[#F47F7F] bg-white shadow-xl shadow-[#F47F7F]/10'
                                        : 'border-white bg-white/60 shadow-sm hover:border-slate-200 hover:bg-white backdrop-blur-sm'
                                        }`}
                                >
                                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition-colors ${state.recipient === recipient.id ? 'bg-[#F47F7F]/10' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
                                        {recipient.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-lg font-bold ${state.recipient === recipient.id ? 'text-[#F47F7F]' : 'text-slate-700'}`}>
                                            {recipient.label}
                                        </span>
                                        <span className="text-xs font-medium text-slate-400">{recipient.tagline}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 2: Closeness */}
                    {state.currentStep === 2 && (
                        <div className="animate-fade-up flex flex-col gap-4">
                            {CLOSENESS_LEVELS.map((level) => (
                                <button
                                    key={level.id}
                                    onClick={() => handleAutoNext({ type: 'SET_CLOSENESS', payload: level.id })}
                                    className={`group flex items-center gap-6 rounded-[2rem] border-2 p-6 text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${state.closeness === level.id
                                        ? 'border-[#F47F7F] bg-white shadow-xl shadow-[#F47F7F]/10'
                                        : 'border-white bg-white/60 shadow-sm hover:border-slate-200 hover:bg-white backdrop-blur-sm'
                                        }`}
                                >
                                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 transition-all ${state.closeness === level.id ? 'border-[#F47F7F] bg-[#F47F7F]' : 'border-slate-100'}`}>
                                        {state.closeness === level.id && <div className="h-2 w-2 rounded-full bg-white" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-lg font-bold ${state.closeness === level.id ? 'text-[#F47F7F]' : 'text-slate-700'}`}>
                                            {level.label}
                                        </span>
                                        <span className="text-sm font-medium text-slate-400">{level.description}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 3: Budget */}
                    {state.currentStep === 3 && (
                        <div className="animate-fade-up rounded-[2.5rem] bg-white/60 p-8 shadow-xl shadow-slate-100/50 backdrop-blur-xl ring-1 ring-white/40 sm:p-12">
                            <div className="flex flex-col gap-10">
                                {/* Current Value Display */}
                                <div className="text-center">
                                    <div className="mb-2 text-6xl font-black tracking-tighter text-[#F47F7F]">
                                        {formatBudget(state.budget)}
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">MAKSİMUM BÜTÇE LİMİTİ</div>
                                </div>

                                {/* Slider Container */}
                                <div className="px-4">
                                    <input
                                        type="range"
                                        min={BUDGET_MIN}
                                        max={BUDGET_MAX}
                                        step={100}
                                        value={state.budget}
                                        onChange={(e) => dispatch({ type: 'SET_BUDGET', payload: Number(e.target.value) })}
                                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-100 accent-[#F47F7F]"
                                    />
                                    <div className="mt-4 flex justify-between text-[11px] font-black tracking-widest text-slate-300">
                                        <span>₺{BUDGET_MIN}</span>
                                        <span>₺{BUDGET_MAX.toLocaleString('tr-TR')}</span>
                                    </div>
                                </div>

                                {/* Preset Buttons */}
                                <div className="flex flex-wrap justify-center gap-3 mt-4">
                                    {BUDGET_PRESETS.map((preset) => (
                                        <button
                                            key={preset}
                                            onClick={() => dispatch({ type: 'SET_BUDGET', payload: preset })}
                                            className={`rounded-2xl px-6 py-3 text-sm font-bold transition-all duration-300 ${state.budget === preset
                                                ? 'bg-[#F47F7F] text-white shadow-lg shadow-[#F47F7F]/30 scale-105'
                                                : 'bg-white text-slate-500 shadow-sm ring-1 ring-slate-100 hover:bg-slate-50'
                                                }`}
                                        >
                                            {formatBudget(preset)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Interests */}
                    {state.currentStep === 4 && (
                        <div className="animate-fade-up">
                            <div className="mb-8 flex items-center justify-between rounded-2xl bg-white/60 p-4 shadow-sm backdrop-blur-sm">
                                <span className="text-sm font-bold text-slate-500">Seçilen İlgi Alanları</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-black text-[#F47F7F]">{state.interests.length}</span>
                                    <span className="text-xs font-bold text-slate-300">/ {MAX_INTERESTS}</span>
                                </div>
                            </div>
                            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                                {INTERESTS.map((interest) => {
                                    const isSelected = state.interests.includes(interest.id) || state.interests.includes(interest.label);
                                    const isDisabled = !isSelected && state.interests.length >= MAX_INTERESTS;

                                    if (interest.id === 'diger') {
                                        return (
                                            <div key="diger-container" className="col-span-2 sm:col-span-1">
                                                {!showCustomInput ? (
                                                    <button
                                                        onClick={() => setShowCustomInput(true)}
                                                        disabled={isDisabled}
                                                        className={`group relative flex flex-col items-center justify-center gap-4 rounded-[2.5rem] border-2 p-8 text-center transition-all duration-300 hover:scale-[1.05] w-full h-full border-white bg-white/60 shadow-sm hover:border-slate-200 hover:bg-white backdrop-blur-sm min-h-[160px] cursor-pointer ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                                                    >
                                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl bg-slate-100 group-hover:bg-slate-200 transition-all">
                                                            {interest.icon}
                                                        </div>
                                                        <span className="text-sm font-black tracking-tight text-slate-600">
                                                            {interest.label}
                                                        </span>
                                                    </button>
                                                ) : (
                                                    <form onSubmit={handleAddCustomInterest} className="h-full flex flex-col gap-2">
                                                        <input
                                                            autoFocus
                                                            type="text"
                                                            value={customInterest}
                                                            onChange={(e) => setCustomInterest(e.target.value)}
                                                            placeholder="Bekliyorum..."
                                                            className="w-full rounded-2xl border-2 border-[#F47F7F] bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-lg outline-none"
                                                        />
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="submit"
                                                                className="flex-1 rounded-xl bg-[#F47F7F] py-2 text-xs font-black text-white"
                                                            >
                                                                EKLE
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowCustomInput(false)}
                                                                className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-400"
                                                            >
                                                                X
                                                            </button>
                                                        </div>
                                                    </form>
                                                )}
                                            </div>
                                        );
                                    }

                                    return (
                                        <button
                                            key={interest.id}
                                            onClick={() => handleInterestToggle(interest.id)}
                                            disabled={isDisabled}
                                            className={`group relative flex flex-col items-center justify-center gap-4 rounded-[2.5rem] border-2 p-6 sm:p-8 text-center transition-all duration-300 hover:scale-[1.05] min-h-[44px] sm:min-h-[160px] cursor-pointer ${isSelected
                                                ? 'border-[#F47F7F] bg-white shadow-xl shadow-[#F47F7F]/10'
                                                : isDisabled
                                                    ? 'cursor-not-allowed border-transparent bg-slate-50 opacity-40'
                                                    : 'border-white bg-white/60 shadow-sm hover:border-slate-200 hover:bg-white backdrop-blur-sm'
                                                }`}
                                        >
                                            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition-all ${isSelected ? 'bg-[#F47F7F] text-white' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
                                                {interest.icon}
                                            </div>
                                            <span className={`text-sm font-black tracking-tight ${isSelected ? 'text-[#F47F7F]' : 'text-slate-600'}`}>
                                                {interest.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Gösterilenler - Özel Eklenenler */}
                            {state.interests.some(id => !INTERESTS.find(i => i.id === id)) && (
                                <div className="mt-6 flex flex-wrap gap-2 animate-fade-up">
                                    {state.interests.filter(id => !INTERESTS.find(i => i.id === id)).map(custom => (
                                        <span key={custom} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#F47F7F] shadow-sm ring-1 ring-[#F47F7F]/20">
                                            {custom}
                                            <button onClick={() => dispatch({ type: 'TOGGLE_INTEREST', payload: custom })} className="text-slate-300 hover:text-red-500">×</button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 5: Occasion */}
                    {state.currentStep === 5 && (
                        <div className="animate-fade-up grid gap-4 grid-cols-2 sm:grid-cols-3">
                            {OCCASIONS.map((occasion) => (
                                <button
                                    key={occasion.id}
                                    onClick={() => handleOccasionSelect(occasion.id)}
                                    className={`group flex flex-col items-center justify-center gap-4 rounded-[2.5rem] border-2 p-8 text-center transition-all duration-300 hover:scale-[1.05] min-h-[160px] cursor-pointer ${state.occasion === occasion.id
                                        ? 'border-[#F47F7F] bg-white shadow-xl shadow-[#F47F7F]/10'
                                        : 'border-white bg-white/60 shadow-sm hover:border-slate-200 hover:bg-white backdrop-blur-sm'
                                        }`}
                                >
                                    <div className={`flex h-20 w-20 items-center justify-center rounded-[2rem] text-4xl transition-all ${state.occasion === occasion.id ? 'bg-[#F47F7F]/10 scale-110' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
                                        {occasion.icon}
                                    </div>
                                    <span className={`text-sm font-bold ${state.occasion === occasion.id ? 'text-[#F47F7F]' : 'text-slate-700'}`}>
                                        {occasion.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* PREMIUM NAVIGATION */}
                <div className="flex flex-col-reverse items-center justify-between gap-6 sm:flex-row">
                    <button
                        onClick={handlePrev}
                        className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-slate-600"
                    >
                        ← {state.currentStep === 1 ? 'Anasayfaya Dön' : 'Geri Dön'}
                    </button>

                    <div className={`group relative w-full sm:w-auto ${(state.currentStep === 1 || state.currentStep === 2) ? 'invisible' : ''}`}>
                        <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#F47F7F] to-[#FFD6D6] opacity-30 blur-xl transition duration-1000 group-hover:opacity-60 ${!canProceed ? 'hidden' : ''}`} />
                        <button
                            disabled={!canProceed}
                            onClick={handleNext}
                            className={`relative block w-full overflow-hidden rounded-2xl px-12 py-5 text-lg font-black tracking-wide text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:shadow-none ${canProceed
                                ? 'bg-gradient-to-br from-[#F47F7F] via-[#FF8A8A] to-[#E66A6A] shadow-2xl shadow-[#F47F7F]/30 hover:scale-[1.02]'
                                : 'bg-slate-200 text-slate-400'
                                }`}
                        >
                            {/* Shimmer Effect */}
                            {canProceed && <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />}

                            <div className="flex items-center justify-center gap-3">
                                <span>{state.currentStep === 5 ? 'ÖNERİLERİ GÖR' : 'SONRAKİ ADIM'}</span>
                                <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
