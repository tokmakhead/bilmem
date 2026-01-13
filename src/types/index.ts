// Wizard step types
export type Recipient =
  | 'sevgili-es'
  | 'arkadas'
  | 'anne'
  | 'baba'
  | 'kardes'
  | 'is-arkadasi';

export type Closeness = 'yakin' | 'normal' | 'resmi';

export type Occasion =
  | 'dogum-gunu'
  | 'yilbasi'
  | 'sevgililer-gunu'
  | 'mezuniyet'
  | 'sadece-jest'
  | null;

// Wizard state
export interface WizardState {
  currentStep: number;
  recipient: Recipient | null;
  closeness: Closeness | null;
  budget: number;
  interests: string[];
  occasion: Occasion;
}

// Gift recommendation
export interface GiftRecommendation {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  category: string;
  reason: string;
  buyLink: string;
  /** @deprecated Use imageUrl instead */
  imageKey?: string;
  imageUrl?: string | null;
  // New Price Data
  avgPrice?: number | null;
  priceCurrency?: string;
}

// Wizard context actions
export type WizardAction =
  | { type: 'SET_RECIPIENT'; payload: Recipient }
  | { type: 'SET_CLOSENESS'; payload: Closeness }
  | { type: 'SET_BUDGET'; payload: number }
  | { type: 'TOGGLE_INTEREST'; payload: string }
  | { type: 'SET_OCCASION'; payload: Occasion }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'RESET' }
  | { type: 'LOAD_STATE'; payload: WizardState };

// Option types for wizard UI
export interface RecipientOption {
  id: Recipient;
  label: string;
  icon: string;
  tagline: string;
}

export interface ClosenessOption {
  id: Closeness;
  label: string;
  description: string;
}

export interface OccasionOption {
  id: NonNullable<Occasion>;
  label: string;
  icon: string;
}

export interface InterestOption {
  id: string;
  label: string;
  icon: string;
}
