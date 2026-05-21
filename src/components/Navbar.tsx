import React, { useState, useEffect } from 'react';

interface NavbarProps {
    activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
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

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
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

    const navItems = [
        { id: 'inicio', label: 'Inicio', icon: 'fa-house' },
        { id: 'roster', label: 'Equipos', icon: 'fa-users' },
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
                >
                    <svg 
                        className="team-logo" 
                        width="45" 
                        height="45" 
                        viewBox="0 0 100 100" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Outer Hexagon with 9z Violet theme */}
                        <polygon 
                            points="50,5 90,28 90,72 50,95 10,72 10,28" 
                            fill="url(#hexGradient)" 
                            stroke="#8b2dfb" 
                            strokeWidth="2.5" 
                            filter="drop-shadow(0px 0px 8px rgba(139, 45, 251, 0.6))"
                        />
                        {/* Inner Hexagon border */}
                        <polygon 
                            points="50,15 82,34 82,66 50,85 18,66 18,34" 
                            fill="#090514" 
                            stroke="#ff007a" 
                            strokeWidth="1.5" 
                            opacity="0.8"
                        />
                        {/* The stylized 9z logo mark */}
                        <path 
                            d="M 38 32 C 38 28, 62 28, 62 38 C 62 48, 38 52, 38 68 L 62 68" 
                            stroke="#ff007a" 
                            strokeWidth="6" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            filter="drop-shadow(0px 0px 4px rgba(255, 0, 122, 0.8))"
                        />
                        <path 
                            d="M 35 68 L 65 68 L 38 82 L 65 82" 
                            stroke="#ffffff" 
                            strokeWidth="4.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            opacity="0.95"
                        />
                        <defs>
                            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#1a0933" />
                                <stop offset="100%" stopColor="#090514" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="brand-text">
                        <span className="brand-name" style={{color: '#ffffff'}}>9Z Team</span>
                        <span className="brand-sub" style={{color: '#8b2dfb'}}>#TODOVILETA</span>
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
                    >
                        <span className="live-dot"></span>
                        STREAM LIVE
                    </a>

                    {/* Mobile Hamburger menu */}
                    <button 
                        className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
