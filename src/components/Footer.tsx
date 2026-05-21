import React, { useState } from 'react';
import { audioEngine } from '../utils/audioEngine';
import { useLang } from '../context/LanguageContext';
import { usePageTransition } from '../context/TransitionContext';

export const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [subbed, setSubbed] = useState(false);
    const { t } = useLang();
    const f = t.footer;
    const { navigateTo } = usePageTransition();

    const playHover = () => audioEngine.playHover();
    const playClick = () => audioEngine.playClick();

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        playClick();
        audioEngine.playNotification();
        setSubbed(true);
        setEmail('');
        setTimeout(() => setSubbed(false), 5000);
    };

    const handleNav = (e: React.MouseEvent, path: string) => {
        e.preventDefault();
        playClick();
        navigateTo(path);
    };

    return (
        <footer className="footer-command">
            <div className="footer-top">
                {/* Brand */}
                <div className="footer-brand">
                    <div className="footer-logo-row">
                        <img src="/9z_logo.png" alt="9Z Team" style={{ width: '60px', height: 'auto' }} />
                        <span className="footer-brand-title">9z Team</span>
                    </div>
                    <p className="footer-desc">{f.desc}</p>
                    <div className="footer-socials" onMouseEnter={playHover}>
                        {/* X — SVG inline para evitar dependencia del ícono de FA */}
                        <a href="https://x.com/9zteam" target="_blank" rel="noreferrer" onClick={playClick} title="X / Twitter">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                            </svg>
                        </a>
                        <a href="https://instagram.com/9zteam" target="_blank" rel="noreferrer" onClick={playClick}><i className="fa-brands fa-instagram"></i></a>
                        <a href="https://youtube.com/9zteam" target="_blank" rel="noreferrer" onClick={playClick}><i className="fa-brands fa-youtube"></i></a>
                        <a href="https://twitch.tv/9zteam" target="_blank" rel="noreferrer" onClick={playClick}><i className="fa-brands fa-twitch"></i></a>
                        <a href="https://discord.gg/9z" target="_blank" rel="noreferrer" onClick={playClick}><i className="fa-brands fa-discord"></i></a>
                        <a href="https://tiktok.com/@9zteam" target="_blank" rel="noreferrer" onClick={playClick}><i className="fa-brands fa-tiktok"></i></a>
                    </div>
                </div>

                <div className="footer-links-grid">
                    {/* LINKS */}
                    <div className="link-column">
                        <h4 className="col-title">LINKS</h4>
                        <ul>
                            <li><a href="https://shop.9z.gg/shop" target="_blank" rel="noreferrer" onMouseEnter={playHover} onClick={playClick}>{f.links.tienda}</a></li>
                            <li><a href="/sobre" onMouseEnter={playHover} onClick={(e) => handleNav(e, '/sobre')}>{f.links.sobre}</a></li>
                            <li><a href="/noticias" onMouseEnter={playHover} onClick={(e) => handleNav(e, '/noticias')}>{f.links.noticias}</a></li>
                            <li><a href="/equipos" onMouseEnter={playHover} onClick={(e) => handleNav(e, '/equipos')}>{f.links.equipos}</a></li>
                            <li><a href="/contacto" onMouseEnter={playHover} onClick={(e) => handleNav(e, '/contacto')}>{f.links.contacto}</a></li>
                            <li><a href="https://9z.gg/9z-pro" target="_blank" rel="noreferrer" onMouseEnter={playHover} onClick={playClick}>9Z PRO</a></li>
                        </ul>
                    </div>

                    {/* INFO */}
                    <div className="link-column">
                        <h4 className="col-title">INFO</h4>
                        <ul>
                            <li><a href="/contacto" onMouseEnter={playHover} onClick={(e) => handleNav(e, '/contacto')}>{f.links.contacto}</a></li>
                            <li><a href="https://9z.gg/9z-pro" target="_blank" rel="noreferrer" onMouseEnter={playHover} onClick={playClick}>9Z PRO</a></li>
                            <li><a href="#" onMouseEnter={playHover}>{f.links.terminos}</a></li>
                            <li><a href="#" onMouseEnter={playHover}>{f.privacy}</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="link-column">
                        <h4 className="col-title">{f.newsletterTitle}</h4>
                        <p className="newsletter-sub-text">{f.newsletterDesc}</p>
                        {subbed ? (
                            <div style={{ color: 'var(--color-cyan)', fontSize: '13px', fontWeight: 'bold' }}>
                                <i className="fa-solid fa-circle-check"></i> {f.subscribed}
                            </div>
                        ) : (
                            <form className="newsletter-form" onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    placeholder={f.newsletterPlaceholder}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="off"
                                    onFocus={playHover}
                                    required
                                />
                                <button type="submit" className="btn btn-primary" onMouseEnter={playHover}>
                                    <i className="fa-solid fa-bell"></i>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <span>{f.copyright.replace('{year}', String(new Date().getFullYear()))}</span>
                <div className="footer-policy-links">
                    <a href="#" onMouseEnter={playHover}>{f.privacy}</a>
                    <span>|</span>
                    <a href="#" onMouseEnter={playHover}>{f.cookies}</a>
                </div>
            </div>
        </footer>
    );
};
