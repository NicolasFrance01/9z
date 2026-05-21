import React from 'react';
import { Sponsors } from '../components/Sponsors';
import { useLang } from '../context/LanguageContext';
import { usePageTransition } from '../context/TransitionContext';

export const HomePage: React.FC = () => {
    const { t } = useLang();
    const { navigateTo } = usePageTransition();
    const h = t.hero;

    return (
        <>
            <section id="inicio" className="hero-section centered">
                <div className="hero-bg-overlay"></div>

                <div className="hero-content-centered">
                    <h1 className="hero-title centered" style={{ color: '#beb3cf' }}>
                        {h.title}
                    </h1>

                    <p className="hero-subtitle centered">{h.subtitle}</p>

                    <div className="hero-cta-group centered">
                        <button
                            className="btn btn-primary btn-glow"
                            onClick={() => navigateTo('/equipos')}
                        >
                            <i className="fa-solid fa-users"></i>
                            {h.ctaEquipos}
                        </button>
                        <a
                            href="https://shop.9z.gg/shop"
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-secondary"
                        >
                            <i className="fa-solid fa-shirt"></i>
                            {h.ctaTienda}
                        </a>
                    </div>
                </div>
            </section>

            <Sponsors />
        </>
    );
};
