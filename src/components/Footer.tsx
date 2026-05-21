import React, { useState } from 'react';
import { audioEngine } from '../utils/audioEngine';

export const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [subbed, setSubbed] = useState(false);

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

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        playClick();
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

    return (
        <footer className="footer-command">
            <div className="footer-top">
                {/* Brand description and social media icons */}
                <div className="footer-brand">
                    <div className="footer-logo-row">
                        <svg 
                            width="40" 
                            height="40" 
                            viewBox="0 0 100 100" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="#8b2dfb" stroke="#ff007a" strokeWidth="2.5" />
                            <polygon points="50,15 82,34 82,66 50,85 18,66 18,34" fill="#090514" stroke="#8b2dfb" strokeWidth="1.5" />
                            <path d="M42,32 C42,26, 58,26, 58,36 C58,45, 42,48, 42,62 L58,62 M35,62 L58,62" stroke="#00f0ff" strokeWidth="5" strokeLinecap="round" />
                            <path d="M35,62 L58,62 L42,72 L58,72" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="footer-brand-title">9z Team</span>
                    </div>
                    <p className="footer-desc">
                        La escuadra de esports más influyente del cono sur, fundada por Francisco "Frankkaster" Postiglione en 2018. Compitiendo al máximo nivel internacional. #9zFamily
                    </p>
                    <div className="footer-socials" onMouseEnter={playHover}>
                        <a href="https://x.com/9zteam" target="_blank" rel="noreferrer" onMouseEnter={playHover} onClick={playClick}>
                            <i className="fa-brands fa-x-twitter"></i>
                        </a>
                        <a href="https://instagram.com/9zteam" target="_blank" rel="noreferrer" onMouseEnter={playHover} onClick={playClick}>
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://youtube.com/9zteam" target="_blank" rel="noreferrer" onMouseEnter={playHover} onClick={playClick}>
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                        <a href="https://twitch.tv/9zteam" target="_blank" rel="noreferrer" onMouseEnter={playHover} onClick={playClick}>
                            <i className="fa-brands fa-twitch"></i>
                        </a>
                        <a href="https://discord.gg/9z" target="_blank" rel="noreferrer" onMouseEnter={playHover} onClick={playClick}>
                            <i className="fa-brands fa-discord"></i>
                        </a>
                    </div>
                </div>

                {/* Navigation and Newsletter columns */}
                <div className="footer-links-grid">
                    {/* Navigation Columns */}
                    <div className="link-column">
                        <h4 className="col-title">Portal</h4>
                        <ul>
                            <li><a href="#inicio" onClick={(e) => handleAnchorClick(e, 'inicio')} onMouseEnter={playHover}>Inicio</a></li>
                            <li><a href="#partidos" onClick={(e) => handleAnchorClick(e, 'partidos')} onMouseEnter={playHover}>Partidos</a></li>
                            <li><a href="#roster" onClick={(e) => handleAnchorClick(e, 'roster')} onMouseEnter={playHover}>Roster</a></li>
                            <li><a href="#streams" onClick={(e) => handleAnchorClick(e, 'streams')} onMouseEnter={playHover}>Streams</a></li>
                        </ul>
                    </div>

                    <div className="link-column">
                        <h4 className="col-title">Soporte</h4>
                        <ul>
                            <li><a href="#tienda" onClick={(e) => handleAnchorClick(e, 'tienda')} onMouseEnter={playHover}>Tienda Oficial</a></li>
                            <li><a href="#noticias" onClick={(e) => handleAnchorClick(e, 'noticias')} onMouseEnter={playHover}>Noticias</a></li>
                            <li><a href="#privacidad" onMouseEnter={playHover}>Términos de Uso</a></li>
                            <li><a href="#contacto" onMouseEnter={playHover}>Contacto</a></li>
                        </ul>
                    </div>

                    {/* Subscription Newsletter */}
                    <div className="link-column">
                        <h4 className="col-title">Newsletter</h4>
                        <p className="newsletter-sub-text">Suscribite para recibir notificaciones de preventa, drops y cupones.</p>
                        {subbed ? (
                            <div style={{ color: 'var(--color-cyan)', fontSize: '13px', fontWeight: 'bold' }}>
                                <i className="fa-solid fa-circle-check"></i> ¡SUSCRIPCIÓN ACTIVADA!
                            </div>
                        ) : (
                            <form className="newsletter-form" onSubmit={handleSubscribe}>
                                <input 
                                    type="email" 
                                    placeholder="correo@dominio.com" 
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

            {/* Bottom copyright and policies */}
            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} 9z Team Esports. Todos los derechos reservados. Rediseño React Premium.</span>
                <div className="footer-policy-links">
                    <a href="#politicas" onMouseEnter={playHover}>Política de Privacidad</a>
                    <span>|</span>
                    <a href="#cookies" onMouseEnter={playHover}>Cookies</a>
                </div>
            </div>
        </footer>
    );
};
