import React from 'react';
import { usePageTransition } from '../context/TransitionContext';

export const PageTransitionOverlay: React.FC = () => {
    const { phase } = usePageTransition();

    if (phase === 'idle') return null;

    return (
        <div className={`pt-overlay pt-${phase}`} aria-hidden="true">
            <span className="pt-echo pt-echo-1">9Z</span>
            <span className="pt-echo pt-echo-2">9Z</span>
            <span className="pt-echo pt-echo-3">9Z</span>
            <div className="pt-center">
                <img src="/9z.png" alt="" className="pt-logo" />
                <div className="pt-scanline-h" />
            </div>
        </div>
    );
};
