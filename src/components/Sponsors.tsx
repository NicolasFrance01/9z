import React from 'react';
import { audioEngine } from '../utils/audioEngine';
import { useLang } from '../context/LanguageContext';

export const Sponsors: React.FC = () => {
    const playHover = () => audioEngine.playHover();
    const { t } = useLang();

    const sponsorBrands = [
        'GLOBANT', 'AORUS GAMING', 'LOGITECH G', 'RED BULL',
        'MONSTER ENERGY', 'AMD RYZEN', 'DIRECTV GO', 'DUX GAMING',
    ];

    const doubleBrands = [...sponsorBrands, ...sponsorBrands];

    return (
        <section className="sponsors-section">
            <div className="sponsors-marquee-container">
                <span className="sponsors-title">{t.sponsors.label}</span>
                <div className="sponsors-marquee" onMouseEnter={playHover}>
                    <div className="marquee-track">
                        {doubleBrands.map((brand, idx) => (
                            <span key={idx} className="sponsor-logo" onMouseEnter={playHover}>
                                {brand}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
