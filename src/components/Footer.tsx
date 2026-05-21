import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { audioEngine } from '../utils/audioEngine';
import { useLang } from '../context/LanguageContext';

export const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [subbed, setSubbed] = useState(false);
    const { t } = useLang();
    const f = t.footer;

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

    return (
        <footer className="footer-command">
            <div className="footer-top">
                {/* Brand */}
                <div className="footer-brand">
                    <div className="footer-logo-row">
                        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="#8b2dfb" stroke="#ff007a" strokeWidth="2.5" />
                            <polygon points="50,15 82,34 82,66 50,85 18,66 18,34" fill="#090514" stroke="#8b2dfb" strokeWidth="1.5" />
                            <path d="M42,32 C42,26, 58,26, 58,36 C58,45, 42,48, 42,62 L58,62 M35,62 L58,62" stroke="#00f0ff" strokeWidth="5" strokeLinecap="round" />
                            <path d="M35,62 L58,62 L42,72 L58,72" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="footer-brand-title">9z Team</span>
                    </div>
                    <p className="footer-desc">{f.desc}</p>
                    <div className="footer-socials" onMouseEnter={playHover}>
                        <a href="https://x.com/9zteam" target="_blank" rel="noreferrer" onClick={playClick}><i className="fa-brands fa-x-twitter"></i></a>
                        <a href="https://instagram.com/9zteam" target="_blank" rel="noreferrer" onClick={playClick}><i className="fa-brands fa-instagram"></i></a>
                        <a href="https://youtube.com/9zteam" target="_blank" rel="noreferrer" onClick={playClick}><i className="fa-brands fa-youtube"></i></a>
                        <a href="https://twitch.tv/9zteam" target="_blank" rel="noreferrer" onClick={playClick}><i className="fa-brands fa-twitch"></i></a>
                        <a href="https://discord.gg/9z" target="_blank" rel="noreferrer" onClick={playClick}><i className="fa-brands fa-discord"></i></a>
                    </div>
                </div>

                <div className="footer-links-grid">
                    {/* Portal links */}
                    <div className="link-column">
                        <h4 className="col-title">{f.portalTitle}</h4>
                        <ul>
                            <li><Link to="/" onMouseEnter={playHover} onClick={playClick}>{f.links.inicio}</Link></li>
                            <li><Link to="/equipos" onMouseEnter={playHover} onClick={playClick}>{f.links.equipos}</Link></li>
                            <li><Link to="/sobre" onMouseEnter={playHover} onClick={playClick}>{f.links.sobre}</Link></li>
                            <li><Link to="/noticias" onMouseEnter={playHover} onClick={playClick}>{f.links.noticias}</Link></li>
                            <li><Link to="/contacto" onMouseEnter={playHover} onClick={playClick}>{f.links.contacto}</Link></li>
                        </ul>
                    </div>

                    {/* Org links */}
                    <div className="link-column">
                        <h4 className="col-title">{f.supportTitle}</h4>
                        <ul>
                            <li><a href="https://shop.9z.gg/shop" target="_blank" rel="noreferrer" onMouseEnter={playHover} onClick={playClick}>{f.links.tienda}</a></li>
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
