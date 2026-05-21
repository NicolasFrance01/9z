import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Matches } from './components/Matches';
import { Roster } from './components/Roster';
import { Stream } from './components/Stream';
import { Shop, InteractiveJerseySVG } from './components/Shop';
import { News } from './components/News';
import { Sponsors } from './components/Sponsors';
import { Footer } from './components/Footer';

import type { NewsItem } from './types';
import { audioEngine } from './utils/audioEngine';

function App() {
    const [audioEnabled, setAudioEnabled] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');

    // Estado del modal de Checkout
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [checkoutProduct, setCheckoutProduct] = useState<{
        editionId: string;
        editionName: string;
        size: string;
        price: string;
    } | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'mp'>('card');
    const [checkoutStep, setCheckoutStep] = useState<'form' | 'loading' | 'success'>('form');

    // Campos de Checkout Form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        cardNum: '',
        cardExp: '',
        cardCvv: ''
    });

    // Estado del modal de Noticias
    const [newsOpen, setNewsOpen] = useState(false);
    const [activeNews, setActiveNews] = useState<NewsItem | null>(null);

    const playHover = () => audioEngine.playHover();
    const playClick = () => audioEngine.playClick();

    // 1. Efecto de Cursor Personalizado y Foco de Luz Ambiental
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
            
            // Detección de elementos interactivos para el escalado del cursor personalizado
            if (target.closest('a') || target.closest('.nav-item')) {
                document.body.classList.add('link-hover');
            } else if (
                target.closest('button') || 
                target.closest('.color-dot') || 
                target.closest('.size-btn') || 
                target.closest('.pay-selector') ||
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

    // 2. Rastreo de la sección activa al hacer Scroll (Intersection Mock)
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['inicio', 'partidos', 'roster', 'streams', 'tienda', 'noticias'];
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

    // 3. Abrir preventa / checkout modal
    const openCheckout = (params: typeof checkoutProduct) => {
        playClick();
        setCheckoutProduct(params);
        setCheckoutStep('form');
        setCheckoutOpen(true);
        // Reseteo form
        setFormData({ name: '', email: '', address: '', cardNum: '', cardExp: '', cardCvv: '' });
    };

    // 4. Procesar el pago simulado con animaciones
    const handleSubmitPayment = (e: React.FormEvent) => {
        e.preventDefault();
        playClick();
        setCheckoutStep('loading');

        // Simula la llamada bancaria
        setTimeout(() => {
            setCheckoutStep('success');
            // Sonido de victoria / arpegio de confirmación
            audioEngine.playNotification();
        }, 2200);
    };

    // 5. Lectura de Crónica (Noticia)
    const openNews = (news: NewsItem) => {
        setActiveNews(news);
        setNewsOpen(true);
    };

    const closeNewsModal = () => {
        playClick();
        setNewsOpen(false);
    };

    const closeCheckoutModal = () => {
        playClick();
        setCheckoutOpen(false);
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
            <Navbar 
                audioEnabled={audioEnabled} 
                setAudioEnabled={setAudioEnabled} 
                activeSection={activeSection} 
            />

            {/* Contenido Principal */}
            <main>
                <Hero onCtaClick={handleCtaNavigate} />
                <Matches />
                <Roster />
                <Stream />
                <Shop onBuyClick={openCheckout} />
                <News onNewsClick={openNews} />
                <Sponsors />
            </main>

            {/* Footer */}
            <Footer />

            {/* ==========================================
                MODAL 1: CHECKOUT PREVENTA INDUMENTARIA
                ========================================== */}
            <div className={`modal-overlay ${checkoutOpen ? 'show' : ''}`} onClick={closeCheckoutModal}>
                <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={closeCheckoutModal} onMouseEnter={playHover}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    {checkoutStep === 'form' && checkoutProduct && (
                        <>
                            <div className="modal-header">
                                <h3 className="modal-title">
                                    <i className="fa-solid fa-cart-shopping text-purple"></i> CHECKOUT SEGURO
                                </h3>
                                <p className="modal-subtitle">Completá tus datos de calibración para facturar la armadura 9z.</p>
                            </div>

                            {/* Resumen de Compra */}
                            <div className="order-summary-box">
                                <div className="summary-img-wrapper">
                                    <InteractiveJerseySVG edition={checkoutProduct.editionId} />
                                </div>
                                <div className="summary-details">
                                    <h4>{checkoutProduct.editionName}</h4>
                                    <p className="summary-meta-text">Talle Seleccionado: <strong style={{color: '#fff'}}>{checkoutProduct.size}</strong> | Cantidad: 1</p>
                                    <p className="summary-price">{checkoutProduct.price} ARS</p>
                                </div>
                            </div>

                            {/* Formulario */}
                            <form onSubmit={handleSubmitPayment} className="checkout-form-grid">
                                <div className="form-group full">
                                    <label>Nombre Completo</label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="Mariano Postiglione" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        onFocus={playHover}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        required 
                                        placeholder="user@family9z.gg" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        onFocus={playHover}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Dirección de Envío</label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="Av. del Libertador 4400, CABA" 
                                        value={formData.address}
                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                        onFocus={playHover}
                                    />
                                </div>

                                {/* Selección de Método de Pago */}
                                <div className="form-group full">
                                    <label>Método de Pago</label>
                                    <div className="payment-method-selectors" onMouseEnter={playHover}>
                                        <button 
                                            type="button"
                                            className={`pay-selector ${paymentMethod === 'card' ? 'active' : ''}`}
                                            onClick={() => { playClick(); setPaymentMethod('card'); }}
                                        >
                                            <i className="fa-solid fa-credit-card"></i> TARJETA DE CRÉDITO
                                        </button>
                                        <button 
                                            type="button"
                                            className={`pay-selector ${paymentMethod === 'mp' ? 'active' : ''}`}
                                            onClick={() => { playClick(); setPaymentMethod('mp'); }}
                                        >
                                            <i className="fa-solid fa-wallet"></i> MERCADO PAGO
                                        </button>
                                    </div>
                                </div>

                                {paymentMethod === 'card' ? (
                                    <>
                                        <div className="form-group full">
                                            <label>Número de Tarjeta</label>
                                            <input 
                                                type="text" 
                                                required 
                                                pattern="\d{16}" 
                                                maxLength={16}
                                                placeholder="4517 8900 1200 4567" 
                                                value={formData.cardNum}
                                                onChange={(e) => setFormData({...formData, cardNum: e.target.value})}
                                                onFocus={playHover}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Vencimiento (MM/AA)</label>
                                            <input 
                                                type="text" 
                                                required 
                                                placeholder="12/28" 
                                                value={formData.cardExp}
                                                onChange={(e) => setFormData({...formData, cardExp: e.target.value})}
                                                onFocus={playHover}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>CVV / Cód. Seguridad</label>
                                            <input 
                                                type="password" 
                                                required 
                                                pattern="\d{3}" 
                                                maxLength={3}
                                                placeholder="932" 
                                                value={formData.cardCvv}
                                                onChange={(e) => setFormData({...formData, cardCvv: e.target.value})}
                                                onFocus={playHover}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="form-group full" style={{ padding: '15px', background: 'rgba(0,186,255,0.05)', border: '1px solid rgba(0,186,255,0.2)', borderRadius: '4px', textAlign: 'center', fontSize: '13px' }}>
                                        <i className="fa-solid fa-circle-info" style={{color: '#00c0ff', marginRight: '6px'}}></i> Se te redireccionará en forma segura para completar tu saldo en Mercado Pago tras dar click.
                                    </div>
                                )}

                                <button type="submit" className="btn btn-primary btn-glow full-width mt-10" style={{ gridColumn: 'span 2' }}>
                                    <i className="fa-solid fa-shield-halved"></i> AUTORIZAR TRANSACCIÓN Y PEDIDO
                                </button>
                            </form>
                        </>
                    )}

                    {checkoutStep === 'loading' && (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <div className="glitch-spinner" style={{ margin: '0 auto 20px auto' }}></div>
                            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '18px', letterSpacing: '1px' }}>PROCESANDO COMPRA PREVENTA</h4>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginTop: '10px' }}>Encriptando conexión con red de seguridad de 9z Team...</p>
                        </div>
                    )}

                    {checkoutStep === 'success' && checkoutProduct && (
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <i className="fa-solid fa-circle-check" style={{ color: 'var(--color-cyan)', fontSize: '64px', filter: 'drop-shadow(0 0 10px rgba(0,240,255,0.5))', marginBottom: '20px' }}></i>
                            <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '24px', marginBottom: '10px' }}>¡COMPRA AUTORIZADA!</h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: '1.6', maxWidth: '400px', margin: '0 auto 25px auto' }}>
                                Felicitaciones, <strong style={{color: '#fff'}}>{formData.name}</strong>. Has adquirido tu <strong style={{color: 'var(--color-secondary)'}}>{checkoutProduct.editionName}</strong> (Talle {checkoutProduct.size}) en preventa exclusiva. Recibirás la confirmación a <strong>{formData.email}</strong>.
                            </p>
                            
                            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '15px', borderRadius: '6px', fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '30px', textAlign: 'left' }}>
                                <div style={{ marginBottom: '5px' }}><strong style={{color:'#fff'}}>ID de Transacción:</strong> 9Z-TX-9381029C</div>
                                <div><strong style={{color:'#fff'}}>Despacho Estimado:</strong> En 48 horas hábiles con código de seguimiento.</div>
                            </div>

                            <button className="btn btn-primary" onClick={closeCheckoutModal} onMouseEnter={playHover}>
                                VOLVER AL PORTAL
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ==========================================
                MODAL 2: CRÓNICA DE NOTICIAS
                ========================================== */}
            <div className={`modal-overlay ${newsOpen ? 'show' : ''}`} onClick={closeNewsModal}>
                <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={closeNewsModal} onMouseEnter={playHover}>
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
                                <button className="btn btn-secondary" onClick={closeNewsModal} onMouseEnter={playHover}>
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
