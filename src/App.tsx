import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Roster } from './components/Roster';
import { News } from './components/News';
import { Sponsors } from './components/Sponsors';
import { Footer } from './components/Footer';

import type { NewsItem } from './types';

function App() {
    const [activeSection, setActiveSection] = useState('inicio');

    // Estado del modal de Noticias
    const [newsOpen, setNewsOpen] = useState(false);
    const [activeNews, setActiveNews] = useState<NewsItem | null>(null);

    // 1. Cursor Personalizado y Efecto Spotlight
    useEffect(() => {
        const cursor = document.getElementById('customCursor');
        const glow = document.getElementById('customCursorGlow');
        const ambient = document.getElementById('ambientGlow');
        
        const handleMouseMove = (e: MouseEvent) => {
            if (cursor) {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            }
            if (glow) {
                glow.style.left = `${e.clientX}px`;
                glow.style.top = `${e.clientY}px`;
            }
            if (ambient) {
                ambient.style.left = `${e.clientX}px`;
                ambient.style.top = `${e.clientY}px`;
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;
            
            if (target.closest('a') || target.closest('.nav-item')) {
                document.body.classList.add('link-hover');
            } else if (
                target.closest('button') || 
                target.closest('.color-dot') || 
                target.closest('.size-btn') || 
                target.closest('.filter-chip') ||
                target.closest('.tab-btn') ||
                target.closest('.roster-tab-btn')
            ) {
                document.body.classList.add('btn-hover');
            } else {
                document.body.classList.remove('link-hover', 'btn-hover');
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // 2. Rastreo de sección activa mediante Scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['inicio', 'roster', 'noticias'];
            const scrollPosition = window.scrollY + 180;

            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 3. Abrir modal de Noticias
    const openNews = (news: NewsItem) => {
        setActiveNews(news);
        setNewsOpen(true);
    };

    const closeNewsModal = () => {
        setNewsOpen(false);
    };

    // Desplazamiento desde el Hero CTA
    const handleCtaNavigate = (sectionId: string) => {
        const element = document.getElementById(sectionId);
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
        <>
            {/* Elementos de Cursor Personalizado y Efecto Spotlight */}
            <div className="custom-cursor" id="customCursor"></div>
            <div className="custom-cursor-glow" id="customCursorGlow"></div>
            <div className="ambient-glow" id="ambientGlow"></div>

            {/* Cyber Grid y Scanline overlay */}
            <div className="cyber-grid-container">
                <div className="cyber-grid"></div>
                <div className="scanline"></div>
            </div>

            {/* Barra de Navegación Header */}
            <Navbar activeSection={activeSection} />

            {/* Contenido Principal */}
            <main>
                <Hero onCtaClick={handleCtaNavigate} />
                <Roster />
                <News onNewsClick={openNews} />
                <Sponsors />
            </main>

            {/* Footer */}
            <Footer />

            {/* ==========================================
                MODAL DE CRÓNICA DE NOTICIAS
                ========================================== */}
            <div className={`modal-overlay ${newsOpen ? 'show' : ''}`} onClick={closeNewsModal}>
                <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={closeNewsModal}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    {activeNews && (
                        <article className="news-article-content">
                            <div className="news-article-header">
                                <span className="news-article-meta">{activeNews.tag} | PUBLICADO EL {activeNews.date}</span>
                                <h2 className="news-article-title">{activeNews.title}</h2>
                            </div>
                            
                            <div className="news-article-body">
                                {activeNews.body.split('\n\n').map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                                <button className="btn btn-secondary" onClick={closeNewsModal}>
                                    CERRAR CRÓNICA
                                </button>
                            </div>
                        </article>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
