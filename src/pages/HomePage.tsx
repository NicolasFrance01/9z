import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sponsors } from '../components/Sponsors';
import { useLang } from '../context/LanguageContext';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useLang();
    const h = t.hero;

    return (
        <>
            <section id="inicio" className="hero-section centered">
                <div className="hero-bg-overlay"></div>

                <div className="hero-content-centered">
                    <div className="hero-badge">
                        <span className="live-pulse"></span>
                        {h.badge}
                    </div>

                    <h1 className="hero-title centered">
                        {h.title} <br />
                        <span className="purple-glow-text">{h.titleAccent}</span>
                    </h1>

                    <p className="hero-subtitle centered">{h.subtitle}</p>

                    <div className="hero-cta-group centered">
                        <button
                            className="btn btn-primary btn-glow"
                            onClick={() => navigate('/equipos')}
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

                    <div className="scroll-indicator" onClick={() => navigate('/equipos')}>
                        <span className="scroll-text">{h.scrollText}</span>
                        <i className="fa-solid fa-angles-down scroll-icon"></i>
                    </div>
                </div>
            </section>

            <Sponsors />
        </>
    );
};
