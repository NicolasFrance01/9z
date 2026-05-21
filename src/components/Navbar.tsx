import React, { useState, useEffect } from 'react';
import { audioEngine } from '../utils/audioEngine';

interface NavbarProps {
    audioEnabled: boolean;
    setAudioEnabled: (val: boolean) => void;
    activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ audioEnabled, setAudioEnabled, activeSection }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const playHoverSound = () => {
        audioEngine.playHover();
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        audioEngine.playClick();
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const toggleAudio = () => {
        const newState = !audioEnabled;
        const result = audioEngine.toggle(newState);
        setAudioEnabled(result);
    };

    const navItems = [
        { id: 'inicio', label: 'Inicio', icon: 'fa-house' },
        { id: 'partidos', label: 'Partidos', icon: 'fa-gamepad' },
        { id: 'roster', label: 'Roster', icon: 'fa-users' },
        { id: 'streams', label: 'Streams', icon: 'fa-tv' },
        { id: 'tienda', label: 'Tienda', icon: 'fa-shirt' },
        { id: 'noticias', label: 'Noticias', icon: 'fa-newspaper' }
    ];

    return (
        <header className={`command-center ${scrolled ? 'scrolled' : ''}`}>
            <div className="cc-container">
                {/* Brand Logo */}
                <a 
                    href="#inicio" 
                    className="logo-link" 
                    onClick={(e) => handleNavClick(e, 'inicio')}
                    onMouseEnter={playHoverSound}
                >
                    <svg 
                        className="team-logo" 
                        width="45" 
                        height="45" 
                        viewBox="0 0 100 100" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Outer Glowing Hexagon */}
                        <polygon 
                            points="50,5 90,28 90,72 50,95 10,72 10,28" 
                            fill="url(#hexGradient)" 
                            stroke="#ff007a" 
                            strokeWidth="2.5" 
                            filter="drop-shadow(0px 0px 8px rgba(255, 0, 122, 0.7))"
                        />
                        {/* Inner Tech Lines */}
                        <polygon 
                            points="50,15 82,34 82,66 50,85 18,66 18,34" 
                            fill="#090514" 
                            stroke="#8b2dfb" 
                            strokeWidth="1.5" 
                            opacity="0.8"
                        />
                        {/* Stylized '9' and 'Z' overlapping dynamically */}
                        <path 
                            d="M 38 32 C 38 28, 62 28, 62 38 C 62 48, 38 52, 38 68 L 62 68" 
                            stroke="#00f0ff" 
                            strokeWidth="6" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            filter="drop-shadow(0px 0px 4px rgba(0, 240, 255, 0.8))"
                        />
                        <path 
                            d="M 38 38 C 38 44, 45 44, 45 38 C 45 32, 38 32, 38 38 Z" 
                            fill="#00f0ff" 
                            opacity="0.3"
                        />
                        <path 
                            d="M 35 68 L 65 68 L 38 82 L 65 82" 
                            stroke="#ffffff" 
                            strokeWidth="4" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            opacity="0.9"
                        />
                        <defs>
                            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8b2dfb" />
                                <stop offset="100%" stopColor="#ff007a" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="brand-text">
                        <span className="brand-name">9Z Team</span>
                        <span className="brand-sub">COMMAND CENTER</span>
                    </div>
                </a>

                {/* Navigation Menu */}
                <nav className={`nav-menu ${mobileMenuOpen ? 'show' : ''}`}>
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <a 
                                    href={`#${item.id}`} 
                                    className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                                    onClick={(e) => handleNavClick(e, item.id)}
                                    onMouseEnter={playHoverSound}
                                >
                                    <i className={`fa-solid ${item.icon}`}></i>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* System Controls */}
                <div className="system-controls">
                    {/* Live indicator linked to the stream page */}
                    <a 
                        href="#streams" 
                        className="live-status-pill"
                        onClick={(e) => handleNavClick(e, 'streams')}
                        onMouseEnter={playHoverSound}
                    >
                        <span className="live-dot"></span>
                        LIVE STREAMING
                    </a>

                    {/* Audio Synthesizer Toggle */}
                    <button 
                        className={`audio-control-btn ${audioEnabled ? 'active' : ''}`}
                        onClick={toggleAudio}
                        onMouseEnter={playHoverSound}
                        title={audioEnabled ? "Silenciar audio ambiental" : "Activar experiencia sonora 9z"}
                    >
                        <i className={`fa-solid ${audioEnabled ? 'fa-volume-high' : 'fa-volume-xmark'}`}></i>
                        <span className="audio-tooltip">
                            {audioEnabled ? "AUDIO: EN LÍNEA" : "AUDIO: MUDO (CLIC PARA ACTIVAR)"}
                        </span>
                    </button>

                    {/* Mobile Hamburger menu */}
                    <button 
                        className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
                        onClick={() => {
                            audioEngine.playClick();
                            setMobileMenuOpen(!mobileMenuOpen);
                        }}
                        onMouseEnter={playHoverSound}
                        aria-label="Abrir menú"
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>
            </div>
        </header>
    );
};
