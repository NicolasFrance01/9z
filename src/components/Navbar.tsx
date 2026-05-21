import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import type { Lang } from '../i18n/translations';

const LANGS: { code: Lang; flag: string; label: string }[] = [
    { code: 'es', flag: '🇦🇷', label: 'Español' },
    { code: 'en', flag: '🇺🇸', label: 'English' },
    { code: 'pt', flag: '🇧🇷', label: 'Português' },
];

export const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const location = useLocation();
    const { lang, setLang, t } = useLang();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
        setLangOpen(false);
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Close lang dropdown on outside click
    useEffect(() => {
        if (!langOpen) return;
        const close = () => setLangOpen(false);
        window.addEventListener('click', close);
        return () => window.removeEventListener('click', close);
    }, [langOpen]);

    const navItems = [
        { path: '/', label: t.nav.inicio, icon: 'fa-house' },
        { path: '/equipos', label: t.nav.equipos, icon: 'fa-users' },
        { path: '/sobre', label: t.nav.sobre, icon: 'fa-star' },
        { path: '/noticias', label: t.nav.noticias, icon: 'fa-newspaper' },
        { path: '/contacto', label: t.nav.contacto, icon: 'fa-satellite-dish' },
    ];

    const activeLang = LANGS.find((l) => l.code === lang)!;

    return (
        <header className={`command-center ${scrolled ? 'scrolled' : ''}`}>
            <div className="cc-container">
                {/* Brand Logo */}
                <Link to="/" className="logo-link">
                    <img
                        src="/src/assets/9z_logo.png"
                        alt="9Z Team Logo"
                        className="team-logo"
                        style={{ width: '70px', height: 'auto', filter: 'drop-shadow(0px 0px 5px rgba(255,255,255,0.3))' }}
                    />
                    <div className="brand-text">
                        <span className="brand-name" style={{ color: '#ffffff' }}>9Z Team</span>
                        <span className="brand-sub" style={{ color: '#8b2dfb' }}>#TODOVILETA</span>
                    </div>
                </Link>

                {/* Navigation Menu */}
                <nav className={`nav-menu ${mobileMenuOpen ? 'show' : ''}`}>
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                                >
                                    <i className={`fa-solid ${item.icon}`}></i>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a
                                href="https://shop.9z.gg/shop"
                                target="_blank"
                                rel="noreferrer"
                                className="nav-item nav-item-store"
                            >
                                <i className="fa-solid fa-shirt"></i>
                                {t.nav.tienda}
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Right side: Lang switcher + Hamburger */}
                <div className="system-controls">
                    {/* Language Switcher */}
                    <div
                        className="lang-switcher"
                        onClick={(e) => { e.stopPropagation(); setLangOpen(!langOpen); }}
                    >
                        <button className="lang-btn" aria-label="Cambiar idioma">
                            <span className="lang-flag">{activeLang.flag}</span>
                            <span className="lang-code">{activeLang.code.toUpperCase()}</span>
                            <i className={`fa-solid fa-chevron-${langOpen ? 'up' : 'down'} lang-arrow`}></i>
                        </button>

                        {langOpen && (
                            <div className="lang-dropdown">
                                {LANGS.map((l) => (
                                    <button
                                        key={l.code}
                                        className={`lang-option ${lang === l.code ? 'active' : ''}`}
                                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                                    >
                                        <span className="lang-flag">{l.flag}</span>
                                        <span>{l.label}</span>
                                        {lang === l.code && <i className="fa-solid fa-check lang-check"></i>}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
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
