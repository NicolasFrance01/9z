import React, { useState, useEffect } from 'react';

interface HeroProps {
    onCtaClick: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
    // Definimos la fecha del próximo partido
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 14,
        minutes: 45,
        seconds: 30
    });

    useEffect(() => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 3);
        targetDate.setHours(targetDate.getHours() + 14);
        targetDate.setMinutes(targetDate.getMinutes() + 45);

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate.getTime() - now;

            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleAction = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, sectionId: string) => {
        e.preventDefault();
        onCtaClick(sectionId);
    };

    return (
        <section id="inicio" className="hero-section">
            <div className="hero-bg-overlay"></div>
            
            {/* Left Content Column */}
            <div className="hero-content">
                <div className="tag-glitch">#9ZFAMILY | PORTAL OFICIAL</div>
                <h1 className="hero-title">
                    TODO VIOLETA. <br />
                    <span className="purple-glow-text">SIEMPRE 9Z</span>
                </h1>
                <p className="hero-subtitle">
                    Mejoramos el portal oficial de 9z Team. Viví la experiencia definitiva de la organización de esports más influyente de la región. Seguí de cerca nuestras escuadras de CS2, Valorant y League of Legends.
                </p>
                <div className="hero-cta-group">
                    <a 
                        href="#roster" 
                        className="btn btn-primary btn-glow"
                        onClick={(e) => handleAction(e, 'roster')}
                    >
                        <i className="fa-solid fa-users"></i>
                        Ver Equipos
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
            </div>

            {/* Right Column: Countdown Widget */}
            <div className="countdown-widget">
                <div className="widget-header">
                    <span className="header-tag">
                        <span className="live-dot"></span> PRÓXIMO PARTIDO
                    </span>
                    <span className="widget-game-tag">CS2 - SUDAMÉRICA</span>
                </div>

                <div className="matchup-row">
                    {/* Home Team: 9z */}
                    <div className="match-team">
                        <svg className="team-shield" viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="#1a0933" stroke="#8b2dfb" strokeWidth="2.5" />
                            <polygon points="50,15 82,34 82,66 50,85 18,66 18,34" fill="#090514" stroke="#ff007a" strokeWidth="1.5" />
                            <path d="M42,35 C42,30, 58,30, 58,38 C58,46, 42,50, 42,62 L58,62 M38,62 L42,62 M40,62 C40,55, 52,50, 52,44 Z" stroke="#ff007a" strokeWidth="5" strokeLinecap="round" />
                            <path d="M38,62 L58,62 L42,72 L58,72" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="team-name">9z Team</span>
                    </div>

                    <div className="match-vs">VS</div>

                    {/* Away Team: IMPERIAL */}
                    <div className="match-team">
                        <svg className="team-shield" viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="#112d22" stroke="#00ff88" strokeWidth="2.5" />
                            {/* Inner Shield details representing Imperial Logo concept */}
                            <path d="M50,20 L75,35 L75,65 L50,80 L25,65 L25,35 Z" fill="#090514" stroke="#00ff88" strokeWidth="1.5" />
                            <circle cx="50" cy="50" r="15" fill="none" stroke="#ffffff" strokeWidth="3" />
                            <path d="M40,50 L60,50" stroke="#00ff88" strokeWidth="4.5" strokeLinecap="round" />
                        </svg>
                        <span className="team-name">Imperial</span>
                    </div>
                </div>

                {/* Clock Grid */}
                <div className="timer-grid">
                    <div className="timer-box">
                        <span className="time-val">{timeLeft.days.toString().padStart(2, '0')}</span>
                        <span className="time-lbl">Días</span>
                    </div>
                    <span className="timer-divider">:</span>
                    <div className="timer-box">
                        <span className="time-val">{timeLeft.hours.toString().padStart(2, '0')}</span>
                        <span className="time-lbl">Horas</span>
                    </div>
                    <span className="timer-divider">:</span>
                    <div className="timer-box">
                        <span className="time-val">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                        <span className="time-lbl">Minutos</span>
                    </div>
                    <span className="timer-divider">:</span>
                    <div className="timer-box">
                        <span className="time-val">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                        <span className="time-lbl">Segundos</span>
                    </div>
                </div>

                <div className="widget-footer">
                    <span>18:00 hs GMT-3</span>
                    <a 
                        href="#streams" 
                        className="widget-stream-link"
                        onClick={(e) => handleAction(e, 'streams')}
                    >
                        <i className="fa-brands fa-twitch"></i> VER STREAM OFICIAL
                    </a>
                </div>
            </div>
        </section>
    );
};
