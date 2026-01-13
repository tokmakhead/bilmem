import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'sm' | 'md' | 'lg';
}

export default function Card({
    children,
    className = '',
    hover = false,
    padding = 'md',
}: CardProps) {
    const paddings = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            className={`
        rounded-2xl bg-white border border-slate-200/50 shadow-sm
        ${hover ? 'transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/40 hover:border-slate-300/50 hover:-translate-y-1' : ''}
        ${paddings[padding]}
        ${className}
      `}
        >
            {children}
        </div>
    );
}
