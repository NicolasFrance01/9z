import React, { useState } from 'react';
import type { Streamer } from '../types';

export const Stream: React.FC = () => {
    const [activeStreamer, setActiveStreamer] = useState<string>('frank');
    
    // Streamers oficiales configurados
    const streamers: Streamer[] = [
        {
            id: 'frank',
            name: 'Frankkaster',
            tagline: 'Fundador / Creador de Contenido & IRL',
            avatar: 'F',
            title: '¡CHARLANDO CON LA FAMILIA TODO VIOLETA! | !sorteo !jersey',
            game: 'Just Chatting',
            viewers: '8,450',
            gameplaySeed: 'irl'
        },
        {
            id: 'max',
            name: 'maxGx',
            tagline: 'Capitán CS2 / FPS & Tactics',
            avatar: 'M',
            title: 'PRÁCTICA PREVIA AL RMR | CON LA ESCUADRA',
            game: 'Counter-Strike 2',
            viewers: '3,290',
            gameplaySeed: 'fps'
        },
        {
            id: 'luchov',
            name: 'Luchov',
            tagline: 'Caster Profesional / League Hub',
            avatar: 'L',
            title: 'ANALIZANDO LAS JUGADAS Y PICKS DE LIGA REGIONAL SUR',
            game: 'League of Legends',
            viewers: '1,920',
            gameplaySeed: 'irl'
        }
    ];

    const current = streamers.find(s => s.id === activeStreamer) || streamers[0];

    const getTwitchUrl = (id: string) => {
        if (id === 'frank') return 'https://twitch.tv/frankkaster';
        if (id === 'max') return 'https://twitch.tv/maxgx';
        return 'https://twitch.tv/9zteam';
    };

    return (
        <section id="streams" className="section-container">
            <div className="section-header">
                <div>
                    <div className="sub-headline">
                        <i className="fa-brands fa-twitch"></i> TRANSMISIONES ACTIVAS
                    </div>
                    <h2 className="section-title">
                        9Z TEAM <span className="gradient-text">STREAMS</span>
                    </h2>
                    <p className="section-subtitle">
                        Sintonizá a los creadores de contenido y jugadores de la escuadra en sus canales oficiales de Twitch.
                    </p>
                </div>
            </div>

            {/* Split Grid: Stream Showcase Card */}
            <div className="stream-visualizer-single">
                <div className="twitch-simulator" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {/* Simulated Premium Screen */}
                    <div className="stream-screen" style={{ height: '400px', background: '#0c0819', position: 'relative', overflow: 'hidden', border: '1px solid rgba(139,45,251,0.25)', borderRadius: '8px' }}>
                        {/* Elegant background gradients representing stream */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'radial-gradient(circle at 50% 30%, rgba(139, 45, 251, 0.2) 0%, transparent 70%)',
                            zIndex: 1
                        }}></div>
                        
                        {/* Decorative gaming hud overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: '20px',
                            border: '1px dashed rgba(255,0,122,0.15)',
                            borderRadius: '6px',
                            zIndex: 2,
                            pointerEvents: 'none'
                        }}></div>

                        {/* Centered content with official logo look */}
                        <div style={{
                            position: 'absolute',
                            top: '45%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            zIndex: 3
                        }}>
                            <div className="glitch-spinner" style={{ width: '60px', height: '60px', border: '3px solid #ff007a', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px auto' }}></div>
                            <h3 style={{ fontFamily: 'Orbitron', color: '#ffffff', letterSpacing: '2px', fontSize: '18px', marginBottom: '5px' }}>
                                TRANSMISIÓN DESTACADA: {current.name.toUpperCase()}
                            </h3>
                            <p style={{ color: '#8b2dfb', fontSize: '12px', letterSpacing: '1px', fontFamily: 'Rajdhani', fontWeight: 700 }}>
                                <i className="fa-solid fa-gamepad"></i> JUGANDO A {current.game.toUpperCase()}
                            </p>
                        </div>

                        {/* Status overlays */}
                        <div style={{ position: 'absolute', top: '25px', left: '25px', zIndex: 4, display: 'flex', gap: '10px' }}>
                            <span className="stream-action-tag" style={{ background: '#ff007a', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 900, fontFamily: 'Orbitron' }}>LIVE</span>
                            <span style={{ background: 'rgba(9,5,20,0.85)', border: '1px solid rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', color: '#ffffff', fontFamily: 'Orbitron' }}>
                                <i className="fa-solid fa-eye" style={{ color: '#00f0ff', marginRight: '4px' }}></i> {current.viewers} ESPECTADORES
                            </span>
                        </div>
                    </div>

                    {/* Stream Title Bar */}
                    <div className="stream-footer-controls" style={{ background: 'rgba(15,10,30,0.8)', border: '1px solid rgba(139,45,251,0.15)', borderTop: 'none', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                        <div>
                            <h3 className="stream-title" style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700, margin: '0 0 5px 0' }}>{current.title}</h3>
                            <p className="stream-meta" style={{ color: 'var(--color-text-muted)', fontSize: '12px', margin: 0 }}>
                                Streamer: <strong style={{ color: '#00f0ff' }}>{current.name}</strong> | Categoría: <span className="game-category">{current.game}</span>
                            </p>
                        </div>

                        <div className="stream-actions">
                            <a 
                                href={getTwitchUrl(current.id)}
                                target="_blank" 
                                rel="noreferrer"
                                className="twitch-link-btn"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#8b2dfb', color: '#ffffff', padding: '10px 20px', borderRadius: '4px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s ease' }}
                            >
                                <i className="fa-brands fa-twitch"></i> SINTONIZAR EN TWITCH
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Streamer Switch Grid */}
            <div className="streamer-selector-grid" style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px' }}>
                {streamers.map(s => (
                    <button 
                        key={s.id} 
                        className={`streamer-select-card ${activeStreamer === s.id ? 'active' : ''}`}
                        onClick={() => setActiveStreamer(s.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: activeStreamer === s.id ? 'rgba(139,45,251,0.1)' : 'rgba(9,5,20,0.5)', border: activeStreamer === s.id ? '1px solid #ff007a' : '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                    >
                        <div className="select-avatar" style={{ width: '40px', height: '40px', background: '#1a0933', color: '#8b2dfb', border: '1px solid #8b2dfb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontFamily: 'Orbitron' }}>{s.avatar}</div>
                        <div className="select-meta" style={{ textAlign: 'left' }}>
                            <div className="select-name" style={{ color: '#ffffff', fontSize: '14px', fontWeight: 700 }}>{s.name}</div>
                            <div className="select-tagline" style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>{s.tagline}</div>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
};
