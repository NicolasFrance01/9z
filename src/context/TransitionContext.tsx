import React, { createContext, useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export type TransitionPhase = 'idle' | 'cover' | 'uncover';

interface TransitionContextValue {
    phase: TransitionPhase;
    navigateTo: (path: string) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [phase, setPhase] = useState<TransitionPhase>('idle');
    const navigate = useNavigate();
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

    const navigateTo = (path: string) => {
        // Limpiar timers pendientes
        timers.current.forEach(clearTimeout);
        timers.current = [];

        // 1. Mostrar overlay (cover)
        setPhase('cover');

        // 2. Cuando el cover terminó (~460ms): navegar y comenzar uncover
        timers.current.push(setTimeout(() => {
            navigate(path);
            window.scrollTo(0, 0);
            setPhase('uncover');
        }, 460));

        // 3. Cuando el uncover terminó: volver a idle
        timers.current.push(setTimeout(() => {
            setPhase('idle');
        }, 900));
    };

    return (
        <TransitionContext.Provider value={{ phase, navigateTo }}>
            {children}
        </TransitionContext.Provider>
    );
};

export const usePageTransition = (): TransitionContextValue => {
    const ctx = useContext(TransitionContext);
    if (!ctx) throw new Error('usePageTransition must be used inside TransitionProvider');
    return ctx;
};
