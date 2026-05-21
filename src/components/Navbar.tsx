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
        { id: 'tienda', label: 'Tienda', icon: 'fa-shirt', external: 'https://shop.9z.gg/shop' },
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
                    <img 
                        src="/src/assets/9z_logo.png" 
                        alt="9Z Team Logo" 
                        className="team-logo" 
                        style={{ width: '70px', height: 'auto', filter: 'drop-shadow(0px 0px 5px rgba(255,255,255,0.3))' }}
                    />
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
                                {item.external ? (
                                    <a 
                                        href={item.external}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="nav-item"
                                    >
                                        <i className={`fa-solid ${item.icon}`}></i>
                                        {item.label}
                                    </a>
                                ) : (
                                    <a 
                                        href={`#${item.id}`} 
                                        className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                                        onClick={(e) => handleNavClick(e, item.id)}
                                    >
                                        <i className={`fa-solid ${item.icon}`}></i>
                                        {item.label}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* System Controls */}
                <div className="system-controls">

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
