import React from 'react';
import { audioEngine } from '../utils/audioEngine';

export const Sponsors: React.FC = () => {
    const playHover = () => audioEngine.playHover();

    // Patrocinadores oficiales de 9z Team
    const sponsorBrands = [
        'GLOBANT',
        'AORUS GAMING',
        'LOGITECH G',
        'RED BULL',
        'MONSTER ENERGY',
        'AMD RYZEN',
        'DIRECTV GO',
        'DUX GAMING'
    ];

    // Duplicamos la lista para asegurar un loop continuo impecable sin saltos visuales
    const doubleBrands = [...sponsorBrands, ...sponsorBrands];

    return (
        <section className="sponsors-section">
            <div className="sponsors-marquee-container">
                <span className="sponsors-title">COLABORADORES DE ÉLITE:</span>
                
                <div className="sponsors-marquee" onMouseEnter={playHover}>
                    <div className="marquee-track">
                        {doubleBrands.map((brand, idx) => (
                            <span 
                                key={idx} 
                                className="sponsor-logo"
                                onMouseEnter={playHover}
                            >
                                {brand}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
