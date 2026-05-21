import React, { useState, useEffect } from 'react';
import { audioEngine } from '../utils/audioEngine';

interface HeroProps {
    onCtaClick: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
    // Definimos la fecha del próximo partido: 3 días, 14 horas, 45 minutos a partir de ahora, o una fecha fija futura
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 14,
        minutes: 45,
        seconds: 30
    });

    useEffect(() => {
        // Obtenemos una fecha futura coherente
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

    const playHover = () => audioEngine.playHover();
    const playClick = () => audioEngine.playClick();

    const handleAction = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, sectionId: string) => {
        e.preventDefault();
        playClick();
        onCtaClick(sectionId);
    };

    return (
        <section id="inicio" className="hero-section">
            <div className="hero-bg-overlay"></div>
            
            {/* Left Content Column */}
            <div className="hero-content">
                <div className="tag-glitch">#9ZFAMILY | OFICIAL PORTAL</div>
                <h1 className="hero-title">
                    EL FUTURO ES <br />
                    <span className="purple-glow-text">AHORA MISM0</span>
                </h1>
                <p className="hero-subtitle">
                    Portal gaming interactivo de alto rendimiento para el equipo de esports más grande de Latinoamérica. Explorá fixtures reactivos, rosters holográficos 3D y nuestra tienda de preventa premium.
                </p>
                <div className="hero-cta-group">
                    <a 
                        href="#partidos" 
                        className="btn btn-primary btn-glow"
                        onClick={(e) => handleAction(e, 'partidos')}
                        onMouseEnter={playHover}
                    >
                        <i className="fa-solid fa-crosshairs"></i>
                        Ver Fixture
                    </a>
                    <a 
                        href="#tienda" 
                        className="btn btn-secondary"
                        onClick={(e) => handleAction(e, 'tienda')}
                        onMouseEnter={playHover}
                    >
                        <i className="fa-solid fa-shirt"></i>
                        Conseguir Jersey
                    </a>
                </div>
            </div>

            {/* Right Column: Countdown Widget */}
            <div className="countdown-widget">
                <div className="widget-header">
                    <span className="header-tag">
                        <span className="live-dot"></span> PRÓXIMO ENCUENTRO
                    </span>
                    <span className="widget-game-tag">CS2 - MAJOR</span>
                </div>

                <div className="matchup-row">
                    {/* Home Team: 9z */}
                    <div className="match-team" onMouseEnter={playHover}>
                        <svg className="team-shield" viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="#8b2dfb" stroke="#ffffff" strokeWidth="2.5" />
                            <polygon points="50,15 82,34 82,66 50,85 18,66 18,34" fill="#090514" stroke="#ff007a" strokeWidth="1.5" />
                            <path d="M42,35 C42,30, 58,30, 58,38 C58,46, 42,50, 42,62 L58,62 M38,62 L42,62 M40,62 C40,55, 52,50, 52,44 Z" stroke="#00f0ff" strokeWidth="5" strokeLinecap="round" />
                            <path d="M38,62 L58,62 L42,72 L58,72" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="team-name">9z Team</span>
                    </div>

                    <div className="match-vs">VS</div>

                    {/* Away Team: FURIA */}
                    <div className="match-team" onMouseEnter={playHover}>
                        <svg className="team-shield" viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="#1c2b36" stroke="#00f0ff" strokeWidth="2.5" />
                            {/* Glowing Neon Cyan Panter Head design representation */}
                            <path 
                                d="M 30,60 C 25,50 25,35 40,25 C 50,18 65,22 75,30 C 85,38 80,55 70,65 C 60,75 40,75 30,60 Z" 
                                fill="#090514" 
                                stroke="#00f0ff" 
                                strokeWidth="2"
                            />
                            {/* Eyes and ears of custom wolf/panther shield */}
                            <polygon points="35,28 42,34 33,35" fill="#ff007a" />
                            <polygon points="75,32 68,36 76,40" fill="#ff007a" />
                            <path d="M42,50 C48,46, 54,46, 60,50 L51,60 Z" fill="#00f0ff" />
                            <path d="M28,68 L32,60 C38,68, 62,68, 68,60 L72,68" stroke="#ff007a" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className="team-name">FURIA</span>
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
                    <span>14:30 hs GMT-3</span>
                    <a 
                        href="#streams" 
                        className="widget-stream-link"
                        onClick={(e) => handleAction(e, 'streams')}
                        onMouseEnter={playHover}
                    >
                        <i className="fa-brands fa-twitch"></i> SINTONIZAR EN VIVO
                    </a>
                </div>
            </div>
        </section>
    );
};
