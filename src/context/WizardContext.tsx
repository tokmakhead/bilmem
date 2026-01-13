'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { WizardState, WizardAction } from '@/types';

const STORAGE_KEY = 'ai-hediye-wizard-state';

const initialState: WizardState = {
    currentStep: 1,
    recipient: null,
    closeness: null,
    budget: 1000,
    interests: [],
    occasion: null,
};

// Load state from localStorage
function loadState(): WizardState {
    if (typeof window === 'undefined') return initialState;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Failed to load wizard state:', error);
        }
    }
    return initialState;
}

// Save state to localStorage
function saveState(state: WizardState) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Failed to save wizard state:', error);
        }
    }
}

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
    let newState = state;

    switch (action.type) {
        case 'SET_RECIPIENT':
            newState = { ...state, recipient: action.payload };
            break;
        case 'SET_CLOSENESS':
            newState = { ...state, closeness: action.payload };
            break;
        case 'SET_BUDGET':
            newState = { ...state, budget: action.payload };
            break;
        case 'TOGGLE_INTEREST': {
            const interest = action.payload;
            const exists = state.interests.includes(interest);
            if (exists) {
                newState = {
                    ...state,
                    interests: state.interests.filter(i => i !== interest)
                };
            } else if (state.interests.length < 3) {
                newState = {
                    ...state,
                    interests: [...state.interests, interest]
                };
            } else {
                newState = state;
            }
            break;
        }
        case 'SET_OCCASION':
            newState = { ...state, occasion: action.payload };
            break;
        case 'NEXT_STEP':
            newState = { ...state, currentStep: Math.min(state.currentStep + 1, 5) };
            break;
        case 'PREV_STEP':
            newState = { ...state, currentStep: Math.max(state.currentStep - 1, 1) };
            break;
        case 'RESET':
            newState = initialState;
            // Clear localStorage on reset
            if (typeof window !== 'undefined') {
                localStorage.removeItem(STORAGE_KEY);
            }
            break;
        case 'LOAD_STATE':
            newState = action.payload;
            break;
        default:
            newState = state;
    }

    // Save to localStorage after every state change (except LOAD_STATE)
    if (action.type !== 'LOAD_STATE') {
        saveState(newState);
    }

    return newState;
}

interface WizardContextValue {
    state: WizardState;
    dispatch: React.Dispatch<WizardAction>;
    canProceed: boolean;
}

const WizardContext = createContext<WizardContextValue | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(wizardReducer, initialState);

    // Load state from localStorage on mount (client-side only)
    useEffect(() => {
        const savedState = loadState();
        if (JSON.stringify(savedState) !== JSON.stringify(initialState)) {
            dispatch({ type: 'LOAD_STATE', payload: savedState });
        }
    }, []);

    // Determine if user can proceed to next step
    const canProceed = (() => {
        switch (state.currentStep) {
            case 1:
                return state.recipient !== null;
            case 2:
                return state.closeness !== null;
            case 3:
                return state.budget > 0;
            case 4:
                return state.interests.length > 0;
            case 5:
                return true; // Occasion is optional
            default:
                return false;
        }
    })();

    return (
        <WizardContext.Provider value={{ state, dispatch, canProceed }}>
            {children}
        </WizardContext.Provider>
    );
}

export function useWizard() {
    const context = useContext(WizardContext);
    if (!context) {
        throw new Error('useWizard must be used within a WizardProvider');
    }
    return context;
}
