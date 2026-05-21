import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { HomePage } from './pages/HomePage';
import { RosterPage } from './pages/RosterPage';
import { NoticiasPage } from './pages/NoticiasPage';
import { SobreNosotrosPage } from './pages/SobreNosotrosPage';
import { ContactoPage } from './pages/ContactoPage';

function AppShell() {
    useEffect(() => {
        const cursor = document.getElementById('customCursor');
        const glow = document.getElementById('customCursorGlow');
        const ambient = document.getElementById('ambientGlow');

        const handleMouseMove = (e: MouseEvent) => {
            if (cursor) { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; }
            if (glow) { glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; }
            if (ambient) { ambient.style.left = `${e.clientX}px`; ambient.style.top = `${e.clientY}px`; }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;
            if (target.closest('a') || target.closest('.nav-item')) {
                document.body.classList.add('link-hover');
            } else if (
                target.closest('button') ||
                target.closest('.color-dot') ||
                target.closest('.filter-chip') ||
                target.closest('.tab-btn') ||
                target.closest('.roster-tab-btn') ||
                target.closest('.lang-btn') ||
                target.closest('.lang-option')
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

    return (
        <>
            <div className="custom-cursor" id="customCursor"></div>
            <div className="custom-cursor-glow" id="customCursorGlow"></div>
            <div className="ambient-glow" id="ambientGlow"></div>

            <div className="cyber-grid-container">
                <div className="cyber-grid"></div>
                <div className="scanline"></div>
            </div>

            <Navbar />

            <PageTransition>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/equipos" element={<RosterPage />} />
                    <Route path="/sobre" element={<SobreNosotrosPage />} />
                    <Route path="/noticias" element={<NoticiasPage />} />
                    <Route path="/contacto" element={<ContactoPage />} />
                </Routes>
            </PageTransition>

            <Footer />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <LanguageProvider>
                <AppShell />
            </LanguageProvider>
        </BrowserRouter>
    );
}

export default App;
