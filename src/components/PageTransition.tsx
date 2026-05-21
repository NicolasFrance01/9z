import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

type Phase = 'idle' | 'cover' | 'uncover';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const [phase, setPhase] = useState<Phase>('idle');
    const prevPath = useRef(location.pathname);

    useEffect(() => {
        if (prevPath.current === location.pathname) return;
        prevPath.current = location.pathname;

        setPhase('cover');

        const uncoverTimer = setTimeout(() => setPhase('uncover'), 480);
        const idleTimer = setTimeout(() => setPhase('idle'), 900);

        return () => {
            clearTimeout(uncoverTimer);
            clearTimeout(idleTimer);
        };
    }, [location.pathname]);

    return (
        <>
            {children}

            {phase !== 'idle' && (
                <div className={`pt-overlay pt-${phase}`} aria-hidden="true">
                    {/* Decorative 9Z echoes — different purple tones */}
                    <span className="pt-echo pt-echo-1">9Z</span>
                    <span className="pt-echo pt-echo-2">9Z</span>
                    <span className="pt-echo pt-echo-3">9Z</span>

                    {/* Center logo mark */}
                    <div className="pt-center">
                        <img src="/9z.png" alt="" className="pt-logo" />
                        <div className="pt-scanline-h" />
                    </div>
                </div>
            )}
        </>
    );
};
