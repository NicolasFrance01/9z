import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { TransitionProvider } from './context/TransitionContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageTransitionOverlay } from './components/PageTransition';
import { HomePage } from './pages/HomePage';
import { RosterPage } from './pages/RosterPage';
import { NoticiasPage } from './pages/NoticiasPage';
import { SobreNosotrosPage } from './pages/SobreNosotrosPage';
import { ContactoPage } from './pages/ContactoPage';

function AppShell() {
    useEffect(() => {
        const cursor = document.getElementById('customCursor');
        const glow = document.getElementById('customCursorGlow');

        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;
            if (cursor) cursor.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
            if (glow)   glow.style.transform   = `translate(${x - 18}px, ${y - 18}px)`;
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;
            if (target.closest('a') || target.closest('.nav-item')) {
                document.body.classList.add('link-hover');
            } else if (target.closest('button') || target.closest('.lang-btn') || target.closest('.lang-option')) {
                document.body.classList.add('btn-hover');
            } else {
                document.body.classList.remove('link-hover', 'btn-hover');
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <div className="custom-cursor" id="customCursor"></div>
            <div className="custom-cursor-glow" id="customCursorGlow"></div>

            <div className="cyber-grid-container">
                <div className="cyber-grid"></div>
            </div>

            <Navbar />

            {/* Overlay de transición — por encima de todo */}
            <PageTransitionOverlay />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/equipos" element={<RosterPage />} />
                <Route path="/sobre" element={<SobreNosotrosPage />} />
                <Route path="/noticias" element={<NoticiasPage />} />
                <Route path="/contacto" element={<ContactoPage />} />
            </Routes>

            <Footer />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <LanguageProvider>
                <TransitionProvider>
                    <AppShell />
                </TransitionProvider>
            </LanguageProvider>
        </BrowserRouter>
    );
}

export default App;
