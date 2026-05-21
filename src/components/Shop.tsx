import React, { useState } from 'react';
import type { JerseyEdition } from '../types';

// Renderizador vectorial reactivo de la camiseta oficial de 9z Team
export const InteractiveJerseySVG: React.FC<{ edition: string; sizeClass?: string }> = ({ edition, sizeClass = '' }) => {
    // Definimos colores según la edición seleccionada
    let bodyGradientStart = '#8b2dfb';
    let bodyGradientEnd = '#251249';
    let collarColor = '#ff007a';
    let sleeveColor = '#8b2dfb';
    let stripeColor = '#ff007a';
    let stripeGlow = 'rgba(255, 0, 122, 0.6)';
    let logoColor = '#00f0ff';
    let detailsColor = '#ffffff';

    if (edition === 'black') {
        bodyGradientStart = '#202023';
        bodyGradientEnd = '#090514';
        collarColor = '#8b2dfb';
        sleeveColor = '#121214';
        stripeColor = '#8b2dfb';
        stripeGlow = 'rgba(139, 45, 251, 0.6)';
        logoColor = '#ff007a';
        detailsColor = '#a39cb5';
    } else if (edition === 'white') {
        bodyGradientStart = '#ffffff';
        bodyGradientEnd = '#e5e5ea';
        collarColor = '#ffb800'; // Gold
        sleeveColor = '#f3f1f6';
        stripeColor = '#ffb800';
        stripeGlow = 'rgba(255, 184, 0, 0.4)';
        logoColor = '#8b2dfb';
        detailsColor = '#090514';
    }

    return (
        <svg 
            className={`jersey-svg ${sizeClass}`} 
            viewBox="0 0 200 240" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="jerseyBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={bodyGradientStart} />
                    <stop offset="100%" stopColor={bodyGradientEnd} />
                </linearGradient>
            </defs>

            {/* Glowing Aura Background */}
            <circle cx="100" cy="120" r="70" fill={stripeColor} opacity="0.15" filter="blur(25px)" />

            {/* Left Sleeve */}
            <path 
                d="M 62,65 L 20,90 L 35,122 L 68,102 Z" 
                fill={sleeveColor} 
                stroke={stripeColor} 
                strokeWidth="1.5" 
            />
            {/* Left Sleeve Cuff detail */}
            <path d="M 20,90 L 35,122" stroke={stripeColor} strokeWidth="3" />

            {/* Right Sleeve */}
            <path 
                d="M 138,65 L 180,90 L 165,122 L 132,102 Z" 
                fill={sleeveColor} 
                stroke={stripeColor} 
                strokeWidth="1.5" 
            />
            {/* Right Sleeve Cuff detail */}
            <path d="M 180,90 L 165,122" stroke={stripeColor} strokeWidth="3" />

            {/* Jersey Body trunk */}
            <path 
                d="M 68,60 C 80,68 120,68 132,60 L 142,190 L 58,190 Z" 
                fill="url(#jerseyBodyGrad)" 
                stroke={stripeColor} 
                strokeWidth="2" 
            />

            {/* Dynamic visual stripes */}
            <path 
                d="M 72,110 L 88,175 M 128,110 L 112,175" 
                stroke={stripeColor} 
                strokeWidth="2" 
                opacity="0.8"
                style={{ filter: `drop-shadow(0 0 4px ${stripeGlow})` }}
            />
            <path 
                d="M 60,182 L 140,182" 
                stroke={stripeColor} 
                strokeWidth="3" 
            />

            {/* V-Collar/Neckline */}
            <path 
                d="M 78,58 C 78,74 122,74 122,58" 
                fill="#090514" 
                stroke={collarColor} 
                strokeWidth="3" 
            />

            {/* 9z Crest on the Chest */}
            <g transform="translate(82, 85) scale(0.36)" style={{ filter: `drop-shadow(0 0 5px ${logoColor})` }}>
                <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="#090514" stroke={logoColor} strokeWidth="4.5" />
                <path d="M42,32 C42,26, 58,26, 58,36 C58,45, 42,48, 42,62 L58,62 M35,62 L58,62 M40,62 C40,55, 52,50, 52,44 Z" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
                <path d="M35,62 L58,62 L42,72 L58,72" stroke={collarColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Sponsor Prints */}
            <text 
                x="100" 
                y="145" 
                fill={detailsColor} 
                fontFamily="Orbitron" 
                fontSize="11" 
                fontWeight="900" 
                letterSpacing="1"
                textAnchor="middle" 
                opacity="0.85"
            >
                GLOBANT
            </text>

            <text 
                x="100" 
                y="160" 
                fill={stripeColor} 
                fontFamily="Rajdhani" 
                fontSize="8" 
                fontWeight="700" 
                letterSpacing="2"
                textAnchor="middle" 
                opacity="0.9"
            >
                #9ZFAMILY
            </text>
        </svg>
    );
};

interface ShopProps {
    onBuyClick: (jerseyParams: { editionId: string; editionName: string; size: string; price: string }) => void;
}

export const Shop: React.FC<ShopProps> = ({ onBuyClick }) => {
    const [selectedEdition, setSelectedEdition] = useState<'violet' | 'black' | 'white'>('violet');
    const [selectedSize, setSelectedSize] = useState<string>('M');

    // Modelado de ediciones y detalles
    const editions: { [key: string]: JerseyEdition } = {
        violet: {
            title: 'Traditional Violet 2026',
            price: '$45.000',
            gradient: '#8b2dfb',
            neck: 'Negro mate con costuras de refuerzo fucsia',
            sleeve: 'Manga corta fit con ribete elástico de alto rendimiento',
            stripes: 'Líneas reflectantes fucsias con glow reactivo a focos led',
            name: 'Edición Tradicional Violeta'
        },
        black: {
            title: 'Dark Void Black Edition',
            price: '$49.000',
            gradient: '#2c2c2e',
            neck: 'Violeta eléctrico con hilado premium anti-transpiración',
            sleeve: 'Manga deportiva de fibra de carbono ultra elástica',
            stripe: 'Líneas violetas de alto contraste reflectante',
            name: 'Edición Limitada Dark Void'
        } as any,
        white: {
            title: 'White Gold Premium Kit',
            price: '$52.000',
            gradient: '#e5e5ea',
            neck: 'Doble costura elástica bañada en detalles oro',
            sleeve: 'Algodón deportivo peinado blanco nieve transpirable',
            stripe: 'Detalles ornamentales en oro líquido holográfico',
            name: 'Edición Exclusiva White Gold'
        } as any
    };

    const activeInfo = editions[selectedEdition];

    return (
        <section id="tienda" className="section-container">
            <div className="section-header">
                <div>
                    <div className="sub-headline">
                        <i className="fa-solid fa-shirt"></i> INDUMENTARIA OFICIAL
                    </div>
                    <h2 className="section-title">
                        9Z TEAM <span className="gradient-text">MERCH</span>
                    </h2>
                    <p className="section-subtitle">
                        Conseguí la armadura oficial de 9z Team diseñada con materiales elásticos de alta respirabilidad y tecnología reflex reactiva.
                    </p>
                </div>
            </div>

            {/* Showcase Grid */}
            <div className="merch-showcase">
                {/* Left side: Interactive Jersey Card */}
                <div className="merch-gallery">
                    <div className="product-card" style={{ background: 'rgba(9,5,20,0.5)', border: '1px solid rgba(139,45,251,0.15)', borderRadius: '8px', padding: '30px' }}>
                        <span className="product-badge" style={{ background: '#ff007a' }}>PREVENTA 2026</span>
                        <div className="prenda-container" style={{ position: 'relative', height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className="prenda-glow" style={{
                                position: 'absolute',
                                width: '200px',
                                height: '200px',
                                background: `radial-gradient(circle, ${activeInfo.gradient}33 0%, transparent 70%)`
                            }}></div>
                            <InteractiveJerseySVG edition={selectedEdition} />
                        </div>
                    </div>
                </div>

                {/* Right side: Product Configurator */}
                <div className="merch-info">
                    <h3 className="merch-product-title" style={{ fontFamily: 'Orbitron', color: '#ffffff', fontSize: '22px' }}>{activeInfo.title}</h3>
                    
                    <div className="product-price-row" style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '15px 0' }}>
                        <span className="current-price" style={{ color: '#00f0ff', fontSize: '20px', fontWeight: 900 }}>{activeInfo.price} ARS</span>
                        <span className="old-price" style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)', fontSize: '14px' }}>$58.000 ARS</span>
                    </div>

                    <p className="merch-description" style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', fontSize: '13px' }}>
                        La nueva camiseta deportiva oficial de 9z Team. Tejido premium microperforado de alta tecnología sublimado en alta definición. Ideal para competiciones de alta intensidad.
                    </p>

                    {/* Selector de Color */}
                    <div className="option-group" style={{ margin: '20px 0' }}>
                        <span className="option-label" style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: '#ffffff', marginBottom: '8px' }}>
                            SELECCIONAR EDICIÓN: <span className="value-highlight" style={{ color: '#8b2dfb' }}>{activeInfo.name}</span>
                        </span>
                        <div className="color-selectors" style={{ display: 'flex', gap: '12px' }}>
                            <button 
                                className={`color-dot violet ${selectedEdition === 'violet' ? 'active' : ''}`}
                                onClick={() => setSelectedEdition('violet')}
                                style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#8b2dfb', border: selectedEdition === 'violet' ? '2px solid #ffffff' : 'none', cursor: 'pointer' }}
                                title="Edición Tradicional Violeta"
                            ></button>
                            <button 
                                className={`color-dot black ${selectedEdition === 'black' ? 'active' : ''}`}
                                onClick={() => setSelectedEdition('black')}
                                style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#202023', border: selectedEdition === 'black' ? '2px solid #ffffff' : 'none', cursor: 'pointer' }}
                                title="Edición Dark Void"
                            ></button>
                            <button 
                                className={`color-dot white ${selectedEdition === 'white' ? 'active' : ''}`}
                                onClick={() => setSelectedEdition('white')}
                                style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ffffff', border: selectedEdition === 'white' ? '2px solid #8b2dfb' : 'none', cursor: 'pointer' }}
                                title="Edición White Gold"
                            ></button>
                        </div>
                    </div>

                    {/* Selector de Talle */}
                    <div className="option-group" style={{ margin: '20px 0' }}>
                        <span className="option-label" style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: '#ffffff', marginBottom: '8px' }}>
                            SELECCIONAR TALLE: <span className="value-highlight" style={{ color: '#00f0ff' }}>TALLE {selectedSize}</span>
                        </span>
                        <div className="size-selectors" style={{ display: 'flex', gap: '8px' }}>
                            {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                                <button 
                                    key={sz}
                                    className={`size-btn ${selectedSize === sz ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(sz)}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        background: selectedSize === sz ? '#ff007a' : 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '4px',
                                        color: '#ffffff',
                                        fontWeight: 700,
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {sz}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Botón de Compra */}
                    <div className="shop-action-box" style={{ marginTop: '25px' }}>
                        <button 
                            className="btn btn-primary btn-glow full-width"
                            onClick={() => onBuyClick({
                                editionId: selectedEdition,
                                editionName: activeInfo.title,
                                size: selectedSize,
                                price: activeInfo.price
                            })}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', fontSize: '14px' }}
                        >
                            <i className="fa-solid fa-cart-shopping"></i> Comprar Armadura Oficial
                        </button>
                        <span className="shop-shipping-info" style={{ display: 'block', marginTop: '10px', fontSize: '11px', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                            <i className="fa-solid fa-truck-fast"></i> Despachos y envíos nacionales e internacionales.
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};
