import React, { useState, useEffect, useRef } from 'react';
import type { Streamer } from '../types';
import { audioEngine } from '../utils/audioEngine';

export const Stream: React.FC = () => {
    const [activeStreamer, setActiveStreamer] = useState<string>('frank');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [viewers, setViewers] = useState<string>('12,450');
    const [title, setTitle] = useState<string>('¡COBRANDO EN EL VALORANT CON LA FAMILIA! | !merch !sorteo');
    const [game, setGame] = useState<string>('Valorant');
    
    // Lista de mensajes de chat simulados
    const [chatMessages, setChatMessages] = useState<Array<{ id: number; username: string; text: string; role: 'user' | 'vip' | 'mod' | 'viewer'; time: string }>>([
        { id: 1, username: 'ViviVioleta', text: '¡VAMOS 9Z CARAJO!', role: 'vip', time: '21:05' },
        { id: 2, username: 'FrankSub_1', text: '¡Frankkaster prendido fuego!', role: 'viewer', time: '21:05' },
        { id: 3, username: 'GamerArg', text: '¿Sale sorteo de camiseta hoy?', role: 'viewer', time: '21:06' },
        { id: 4, username: 'Tomi_9z', text: 'MODS ban al pesado de recién porfa', role: 'mod', time: '21:06' },
        { id: 5, username: 'dgt_fan', text: '¡Qué locura el partido contra Vitality!', role: 'vip', time: '21:07' },
        { id: 6, username: 'HeavyGunner', text: 'Ataquen A muchachos, dejen de rotar', role: 'viewer', time: '21:07' }
    ]);
    const [userMessage, setUserMessage] = useState<string>('');

    const chatEndRef = useRef<HTMLDivElement>(null);

    const playHover = () => audioEngine.playHover();
    const playClick = () => audioEngine.playClick();

    // Streamers configurados
    const streamers: Streamer[] = [
        {
            id: 'frank',
            name: 'Frankkaster',
            tagline: 'Fundador / IRL & Variety',
            avatar: 'F',
            title: '¡COBRANDO EN EL VALORANT CON LA FAMILIA! | !merch !sorteo',
            game: 'Valorant',
            viewers: '12,450',
            gameplaySeed: 'fps'
        },
        {
            id: 'max',
            name: 'maxGx',
            tagline: 'Capitán CS2 / FPS Tactics',
            avatar: 'M',
            title: 'PRÁCTICA OFICIAL PREVIO AL EURO RMR | CON EL EQUIPO',
            game: 'Counter-Strike 2',
            viewers: '4,890',
            gameplaySeed: 'fps'
        },
        {
            id: 'luchov',
            name: 'Luchov Caster',
            tagline: 'Caster Profesional / League Hub',
            avatar: 'L',
            title: 'ANALIZANDO EL GRÁFICO DE BAN / PICKS CONTRA LEVIATÁN',
            game: 'League of Legends',
            viewers: '2,320',
            gameplaySeed: 'irl'
        }
    ];

    // Simular chatbot añadiendo mensajes periódicos
    useEffect(() => {
        const botMessages = [
            '¡GOOOO 9Z!',
            '¿Qué resolución usa max?',
            '¡QUÉ JUGADA DE DGT POR FAVOR!',
            'Esta camiseta es lo más hermoso del mundo entero.',
            'GG WP',
            'F en el chat por ese tiro fallado jajaja',
            '¡La #9zFamily está más fuerte que nunca!',
            '¡Imperial no la ve ni cuadrada!',
            '¿Cuándo juegan de vuelta?',
            '¡¡¡¡TERRIBLE EL ACE!!!!'
        ];
        const botUsernames = ['SantiGaming', '9zArmy_2', 'cs2_arg', 'ValoGod', 'Vivi_Violet', 'CasterPro', 'PurpleLover', 'NeoTactics'];
        const roles: Array<'vip' | 'mod' | 'viewer'> = ['vip', 'mod', 'viewer'];

        const interval = setInterval(() => {
            const randomUser = botUsernames[Math.floor(Math.random() * botUsernames.length)];
            const randomText = botMessages[Math.floor(Math.random() * botMessages.length)];
            const randomRole = roles[Math.floor(Math.random() * roles.length)];
            const now = new Date();
            const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

            setChatMessages(prev => [
                ...prev,
                {
                    id: Date.now(),
                    username: randomUser,
                    text: randomText,
                    role: randomRole,
                    time: timeStr
                }
            ]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Desplazar automáticamente el chat al fondo al recibir mensajes
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);

    // Manejar cambio de Streamer activo con pantalla de carga de "glitch"
    const handleStreamerChange = (streamerId: string) => {
        if (streamerId === activeStreamer) return;
        playClick();
        setIsLoading(true);
        setActiveStreamer(streamerId);
        
        const target = streamers.find(s => s.id === streamerId);
        if (target) {
            setTimeout(() => {
                setTitle(target.title);
                setViewers(target.viewers);
                setGame(target.game);
                setIsLoading(false);
                // Sintetiza arpegio corto de sintonización
                audioEngine.playNotification();
            }, 1200);
        }
    };

    // Agregar mensaje del usuario manualmente
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userMessage.trim()) return;

        playClick();
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        setChatMessages(prev => [
            ...prev,
            {
                id: Date.now(),
                username: 'Tú (9zFamily)',
                text: userMessage,
                role: 'user',
                time: timeStr
            }
        ]);
        setUserMessage('');
    };

    return (
        <section id="streams" className="section-container">
            <div className="section-header">
                <div>
                    <div className="sub-headline">
                        <i className="fa-brands fa-twitch"></i> TRANSMISIONES ACTIVADAS
                    </div>
                    <h2 className="section-title">
                        FRANKKASTER <span className="gradient-text">ARENA</span>
                    </h2>
                    <p className="section-subtitle">
                        Sintonizá en tiempo real a los streamers oficiales de 9z Team y conversá con la comunidad a través de nuestro simulador de chat hiperconectado.
                    </p>
                </div>
            </div>

            {/* Split Grid: Stream & Chat */}
            <div className="grid-2col">
                <div className="stream-visualizer">
                    {/* Simulated Screen */}
                    <div className="twitch-simulator">
                        <div className="stream-screen">
                            {/* Glitch Overlay Loader */}
                            <div className={`stream-overlay ${isLoading ? 'show' : ''}`}>
                                <div className="glitch-spinner"></div>
                                <span className="overlay-text">CALIBRANDO SINAL DIGITAL...</span>
                            </div>

                            {/* Programmatic Simulated Gameplay Visuals */}
                            <div className="mock-video-canvas">
                                <div className="fake-gameplay">
                                    {/* Action HUD Labels */}
                                    <span className="stream-action-tag">LIVE</span>
                                    <span className="streamer-watermark">
                                        <i className="fa-brands fa-twitch"></i> {streamers.find(s => s.id === activeStreamer)?.name}
                                    </span>

                                    {/* HUD Crosshairs representation inside the game */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '40px',
                                        height: '40px',
                                        border: '1px solid rgba(0, 240, 255, 0.4)',
                                        borderRadius: '50%',
                                        pointerEvents: 'none'
                                    }}>
                                        <div style={{ position: 'absolute', top: '50%', left: '0', width: '100%', height: '1px', backgroundColor: '#00f0ff', opacity: 0.5 }}></div>
                                        <div style={{ position: 'absolute', left: '50%', top: '0', width: '1px', height: '100%', backgroundColor: '#00f0ff', opacity: 0.5 }}></div>
                                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '4px', height: '4px', backgroundColor: '#ff007a', borderRadius: '50%' }}></div>
                                    </div>

                                    {/* Dynamic HUD Bars at the bottom */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '20px',
                                        left: '20px',
                                        background: 'rgba(9,5,20,0.8)',
                                        padding: '8px 15px',
                                        border: '1px solid rgba(139,45,251,0.3)',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        gap: '15px',
                                        fontSize: '10px',
                                        fontFamily: 'Orbitron',
                                        fontWeight: '700'
                                    }}>
                                        <span style={{ color: '#00f0ff' }}><i className="fa-solid fa-heart"></i> 100 HP</span>
                                        <span style={{ color: '#ffb800' }}><i className="fa-solid fa-shield"></i> 100 AP</span>
                                    </div>
                                    
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '20px',
                                        right: '20px',
                                        background: 'rgba(9,5,20,0.8)',
                                        padding: '8px 15px',
                                        border: '1px solid rgba(139,45,251,0.3)',
                                        borderRadius: '4px',
                                        fontSize: '10px',
                                        fontFamily: 'Orbitron',
                                        fontWeight: '700',
                                        color: '#ffffff'
                                    }}>
                                        AMMO: 30 / 90
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stream Title Bar */}
                        <div className="stream-footer-controls">
                            <div>
                                <h3 className="stream-title">{title}</h3>
                                <p className="stream-meta">
                                    Categoría: <span className="game-category">{game}</span> | Espectadores: <span className="viewers-count">{viewers}</span>
                                </p>
                            </div>

                            <div className="stream-actions">
                                <button className="btn-stream-action" onMouseEnter={playHover} title="Clip">
                                    <i className="fa-solid fa-scissors"></i>
                                </button>
                                <button className="btn-stream-action" onMouseEnter={playHover} title="Compartir">
                                    <i className="fa-solid fa-share-nodes"></i>
                                </button>
                                <a 
                                    href="https://twitch.tv/9zteam" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="twitch-link-btn"
                                    onMouseEnter={playHover}
                                    onClick={playClick}
                                >
                                    <i className="fa-brands fa-twitch"></i> IR A TWITCH
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Simulated Twitch Chat */}
                <div className="stream-chat-container">
                    <div className="chat-header">
                        <span><i className="fa-solid fa-comments"></i> CHAT DE LA COMUNIDAD</span>
                        <span className="chat-users-online">
                            <span className="live-dot" style={{ display: 'inline-block', marginRight: '5px' }}></span> 
                            {viewers} CONECTADOS
                        </span>
                    </div>

                    <div className="chat-messages">
                        {chatMessages.map(msg => (
                            <div key={msg.id} className={`chat-msg ${msg.role}`}>
                                <span className="chat-msg-time">{msg.time}</span>
                                <span className="chat-msg-username" style={
                                    msg.role === 'user' ? { color: '#00f0ff', textDecoration: 'underline' } : {}
                                }>
                                    {msg.role === 'mod' && <i className="fa-solid fa-shield-halved" style={{ fontSize: '10px', marginRight: '4px', color: '#00f0ff' }}></i>}
                                    {msg.role === 'vip' && <i className="fa-solid fa-gem" style={{ fontSize: '10px', marginRight: '4px', color: '#ff007a' }}></i>}
                                    {msg.username}:
                                </span>
                                <span className="chat-msg-text">{msg.text}</span>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    {/* User send input form */}
                    <form className="chat-input-form" onSubmit={handleSendMessage}>
                        <input 
                            type="text" 
                            id="chatInput" 
                            placeholder="Envía un mensaje al chat..." 
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            autoComplete="off"
                            onFocus={playHover}
                        />
                        <button type="submit" className="btn-chat-send" onMouseEnter={playHover}>
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>

            {/* Streamer Switch Grid */}
            <div className="streamer-selector-grid" onMouseEnter={playHover}>
                {streamers.map(s => (
                    <button 
                        key={s.id} 
                        className={`streamer-select-card ${activeStreamer === s.id ? 'active' : ''}`}
                        onClick={() => handleStreamerChange(s.id)}
                        onMouseEnter={playHover}
                    >
                        <div className="select-avatar">{s.avatar}</div>
                        <div className="select-meta" style={{ textAlign: 'left' }}>
                            <div className="select-name">{s.name}</div>
                            <div className="select-tagline">{s.tagline}</div>
                        </div>
                        <div className="select-indicator"></div>
                    </button>
                ))}
            </div>
        </section>
    );
};
