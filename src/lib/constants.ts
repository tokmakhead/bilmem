import {
    RecipientOption,
    ClosenessOption,
    OccasionOption,
    InterestOption
} from '@/types';

// Step 1: Recipients
export const RECIPIENTS: RecipientOption[] = [
    { id: 'sevgili-es', label: 'Sevgili / Eş', icon: '💕', tagline: 'Hayatınızın aşkı için en özeli' },
    { id: 'arkadas', label: 'Arkadaş', icon: '🤝', tagline: 'Dostluğunuzu pekiştirecek seçimler' },
    { id: 'anne', label: 'Anne', icon: '👩', tagline: 'Dünyanın en kıymetlisine küçük bir teşekkür' },
    { id: 'baba', label: 'Baba', icon: '👨', tagline: 'Kahramanınıza yakışacak hediyeler' },
    { id: 'kardes', label: 'Kardeş', icon: '👫', tagline: 'Birlikte büyüdüğünüz o eşsiz bağ için' },
    { id: 'is-arkadasi', label: 'İş Arkadaşı', icon: '💼', tagline: 'Ofis günlerini güzelleştirecek detaylar' },
];

// Step 2: Closeness levels
export const CLOSENESS_LEVELS: ClosenessOption[] = [
    { id: 'yakin', label: 'Yakın', description: 'Çok samimi, her şeyi paylaşırız' },
    { id: 'normal', label: 'Normal', description: 'Düzenli görüşürüz, iyi anlaşırız' },
    { id: 'resmi', label: 'Resmi', description: 'Profesyonel veya mesafeli ilişki' },
];

// Step 3: Budget presets
export const BUDGET_PRESETS = [500, 1000, 2000, 5000, 15000];
export const BUDGET_MIN = 100;
export const BUDGET_MAX = 15000;

// Step 4: Interest categories
export const INTERESTS: InterestOption[] = [
    { id: 'teknoloji', label: 'Teknoloji', icon: '💻' },
    { id: 'moda', label: 'Moda', icon: '👗' },
    { id: 'spor', label: 'Spor & Fitness', icon: '🏃' },
    { id: 'muzik', label: 'Müzik', icon: '🎵' },
    { id: 'kitap', label: 'Kitap & Okuma', icon: '📚' },
    { id: 'yemek', label: 'Yemek & Mutfak', icon: '🍳' },
    { id: 'oyun', label: 'Oyun & Gaming', icon: '🎮' },
    { id: 'seyahat', label: 'Seyahat', icon: '✈️' },
    { id: 'sanat', label: 'Sanat & El İşi', icon: '🎨' },
    { id: 'bahce', label: 'Bahçe & Doğa', icon: '🌱' },
    { id: 'fotograf', label: 'Fotoğrafçılık', icon: '📷' },
    { id: 'guzellik', label: 'Güzellik & Bakım', icon: '💄' },
    { id: 'ev', label: 'Ev & Dekorasyon', icon: '🏠' },
    { id: 'koleksiyon', label: 'Koleksiyon', icon: '🏆' },
    { id: 'evcil', label: 'Evcil Hayvan', icon: '🐾' },
    { id: 'diger', label: 'Sen Belirt', icon: '✨' },
];

export const MAX_INTERESTS = 3;

// Step 5: Occasions
export const OCCASIONS: OccasionOption[] = [
    { id: 'dogum-gunu', label: 'Doğum Günü', icon: '🎂' },
    { id: 'yilbasi', label: 'Yılbaşı', icon: '🎄' },
    { id: 'sevgililer-gunu', label: 'Sevgililer Günü', icon: '❤️' },
    { id: 'mezuniyet', label: 'Mezuniyet', icon: '🎓' },
    { id: 'sadece-jest', label: 'Sadece Bir Jest', icon: '🎁' },
];

// Wizard step titles
export const WIZARD_STEPS = [
    { number: 1, title: 'Kime?', description: 'Hediye alacağınız kişi' },
    { number: 2, title: 'Yakınlık', description: 'İlişki türünüz' },
    { number: 3, title: 'Bütçe', description: 'Harcama limitiniz' },
    { number: 4, title: 'İlgi Alanları', description: 'Nelerden hoşlanır?' },
    { number: 5, title: 'Özel Gün', description: 'Hediye vesilesi' },
];
