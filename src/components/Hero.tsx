import React from 'react';

interface HeroProps {
    onCtaClick: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
    const handleAction = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, sectionId: string) => {
        e.preventDefault();
        onCtaClick(sectionId);
    };

    return (
        <section id="inicio" className="hero-section centered">
            <div className="hero-bg-overlay"></div>
            
            {/* Centered Premium Content */}
            <div className="hero-content-centered">
                {/* Tech logo badge */}
                <div className="hero-badge">
                    <span className="live-pulse"></span>
                    9Z GLOBANT OFFICIAL PORTAL
                </div>

                <div className="tag-glitch">#9ZFAMILY | #TODOVILETA</div>
                
                <h1 className="hero-title centered">
                    TODO VIOLETA. <br />
                    <span className="purple-glow-text">SIEMPRE 9Z</span>
                </h1>
                
                <p className="hero-subtitle centered">
                    Te damos la bienvenida al portal oficial de **9z Globant**. Viví la experiencia de la organización de esports más influyente y apasionada de la región. Seguí de cerca a nuestras escuadras competitivas de CS2, Valorant, Simracing, PUBG Mobile, Honor of Kings, Mobile Legends y Rainbow Six Siege.
                </p>

                {/* Cyberpunk Action Buttons */}
                <div className="hero-cta-group centered">
                    <a 
                        href="#roster" 
                        className="btn btn-primary btn-glow"
                        onClick={(e) => handleAction(e, 'roster')}
                    >
                        <i className="fa-solid fa-users"></i>
                        Explorar Escuadras
                    </a>
                    <a 
                        href="#tienda" 
                        className="btn btn-secondary"
                        onClick={(e) => handleAction(e, 'tienda')}
                    >
                        <i className="fa-solid fa-shirt"></i>
                        Tienda Oficial
                    </a>
                </div>

                {/* Animated scroll down indicator */}
                <div className="scroll-indicator" onClick={(e) => {
                    e.preventDefault();
                    onCtaClick('roster');
                }}>
                    <span className="scroll-text">VER EQUIPOS</span>
                    <i className="fa-solid fa-angles-down scroll-icon"></i>
                </div>
            </div>
        </section>
    );
};
