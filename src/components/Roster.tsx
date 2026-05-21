import React, { useState } from 'react';
import type { Player } from '../types';
import { audioEngine } from '../utils/audioEngine';

// Generador programático de Avatares Cyberpunk SVG de alta fidelidad
const PlayerAvatarSVG: React.FC<{ hairColor: string; visorColor: string }> = ({ hairColor, visorColor }) => {
    return (
        <svg 
            className="player-avatar-svg" 
            viewBox="0 0 200 240" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="cyberBackground" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a0933" />
                    <stop offset="100%" stopColor="#090514" />
                </linearGradient>
                <linearGradient id="jerseyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b2dfb" />
                    <stop offset="50%" stopColor="#5d10c4" />
                    <stop offset="100%" stopColor="#ff007a" />
                </linearGradient>
                <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fddbb0" />
                    <stop offset="100%" stopColor="#e2a876" />
                </linearGradient>
            </defs>

            {/* Background geometric grid glow */}
            <rect width="200" height="240" rx="10" fill="url(#cyberBackground)" />
            <path d="M 0,40 L 200,40 M 0,80 L 200,80 M 0,120 L 200,120 M 0,160 L 200,160 M 0,200 L 200,200" stroke="#8b2dfb" strokeWidth="0.5" opacity="0.1" />
            <path d="M 40,0 L 40,240 M 80,0 L 80,240 M 120,0 L 120,240 M 160,0 L 160,240" stroke="#8b2dfb" strokeWidth="0.5" opacity="0.1" />

            {/* Glowing tech ring */}
            <circle cx="100" cy="110" r="70" stroke={visorColor} strokeWidth="1" strokeDasharray="5, 5" opacity="0.3" />

            {/* Neck & Shoulders (Jersey) */}
            <path d="M 60,190 L 40,240 L 160,240 L 140,190 Z" fill="url(#jerseyGrad)" />
            {/* Jersey V-Neck details */}
            <path d="M 80,190 L 100,210 L 120,190" fill="#090514" stroke="#ff007a" strokeWidth="2" />
            <path d="M 100,210 L 100,240" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3, 3" />

            {/* Face/Head Base */}
            <path d="M 70,100 C 70,75 130,75 130,100 C 130,135 120,150 100,160 C 80,150 70,135 70,100 Z" fill="url(#skinGrad)" />
            {/* Neck */}
            <path d="M 88,145 L 88,192 L 112,192 L 112,145 Z" fill="#cf905b" />

            {/* Cybernetic Visor Glasses (Glow) */}
            <path 
                d="M 65,95 L 135,95 L 130,112 L 70,112 Z" 
                fill={visorColor} 
                stroke="#ffffff" 
                strokeWidth="1.5" 
                filter={`drop-shadow(0 0 6px ${visorColor})`}
                opacity="0.9"
            />
            {/* Visor hud highlights */}
            <line x1="72" y1="100" x2="128" y2="100" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
            <line x1="75" y1="105" x2="90" y2="105" stroke="#ffffff" strokeWidth="0.8" />

            {/* Ear tech/headset */}
            <rect x="58" y="93" width="12" height="24" rx="4" fill="#1b1c21" stroke={visorColor} strokeWidth="1" />
            <rect x="130" y="93" width="12" height="24" rx="4" fill="#1b1c21" stroke={visorColor} strokeWidth="1" />

            {/* Futuristic Hair styling */}
            <path 
                d="M 70,82 C 60,65, 80,45, 100,45 C 120,45, 140,65, 130,82 C 140,70, 135,55, 120,52 C 110,50, 90,50, 80,52 C 65,55, 60,70, 70,82 Z" 
                fill={hairColor} 
                filter={`drop-shadow(0 0 4px ${hairColor})`}
            />

            {/* Holographic light overlay */}
            <ellipse cx="100" cy="230" rx="60" ry="10" fill="#00f0ff" opacity="0.2" filter="blur(8px)" />
        </svg>
    );
};

export const Roster: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'cs2' | 'valorant' | 'lol' | 'creators'>('cs2');

    const playHover = () => audioEngine.playHover();
    const playClick = () => audioEngine.playClick();

    // Roster de jugadores reales 2026 de 9z Team
    const playersData: { [key: string]: Player[] } = {
        cs2: [
            {
                nick: 'max',
                name: 'Maximiliano González',
                role: 'IGL / IN-GAME LEADER',
                number: '10',
                stat1: '1.08', lbl1: 'RATING 2.0',
                stat2: '76.8', lbl2: 'ADR',
                stat3: '68.9%', lbl3: 'KAST',
                signature: 'maxGx_#'
            },
            {
                nick: 'dgt',
                name: 'Franco García',
                role: 'LURKER / RIFLER',
                number: '07',
                stat1: '1.24', lbl1: 'RATING 2.0',
                stat2: '84.6', lbl2: 'ADR',
                stat3: '74.2%', lbl3: 'KAST',
                signature: 'dgt_1'
            },
            {
                nick: 'HUASOPEEK',
                name: 'Matías Ibáñez',
                role: 'RIFLER / SUPPORT',
                number: '88',
                stat1: '1.12', lbl1: 'RATING 2.0',
                stat2: '79.2', lbl2: 'ADR',
                stat3: '70.4%', lbl3: 'KAST',
                signature: 'hpeek_#'
            },
            {
                nick: 'luchov',
                name: 'Luciano Herrera',
                role: 'ENTRY FRAGGER',
                number: '19',
                stat1: '1.10', lbl1: 'RATING 2.0',
                stat2: '78.1', lbl2: 'ADR',
                stat3: '71.0%', lbl3: 'KAST',
                signature: 'luchov_V'
            },
            {
                nick: 'meyern',
                name: 'Ignacio Meyer',
                role: 'RIFLER / ENTRY',
                number: '09',
                stat1: '1.15', lbl1: 'RATING 2.0',
                stat2: '81.5', lbl2: 'ADR',
                stat3: '72.3%', lbl3: 'KAST',
                signature: 'meyern_#'
            }
        ],
        valorant: [
            {
                nick: 'MiradaNinja',
                name: 'Waldo Barahona',
                role: 'DUELISTA PRINCIPAL',
                number: '01',
                stat1: '256', lbl1: 'ACS',
                stat2: '1.28', lbl2: 'K/D RATIO',
                stat3: '36.4%', lbl3: 'HEADSHOT',
                signature: 'MiradaNinja_#'
            },
            {
                nick: 'KIMB0',
                name: 'Dylan Pintos',
                role: 'INICIADOR / ASSIST',
                number: '03',
                stat1: '210', lbl1: 'ACS',
                stat2: '1.15', lbl2: 'K/D RATIO',
                stat3: '28.2%', lbl3: 'HEADSHOT',
                signature: 'KIMB0_V'
            },
            {
                nick: 'skyppervz',
                name: 'Lucas Pizarro',
                role: 'CENTINELA / ANCHOR',
                number: '05',
                stat1: '204', lbl1: 'ACS',
                stat2: '1.18', lbl2: 'K/D RATIO',
                stat3: '32.1%', lbl3: 'HEADSHOT',
                signature: 'skypp_#'
            },
            {
                nick: 'Tuli',
                name: 'Giulliano Pozo',
                role: 'CONTROLADOR / IGL',
                number: '08',
                stat1: '201', lbl1: 'ACS',
                stat2: '1.09', lbl2: 'K/D RATIO',
                stat3: '25.4%', lbl3: 'HEADSHOT',
                signature: 'Tuli_V'
            },
            {
                nick: 'M1key',
                name: 'Luciano Pensa',
                role: 'INICIADOR / FLEX',
                number: '02',
                stat1: '215', lbl1: 'ACS',
                stat2: '1.12', lbl2: 'K/D RATIO',
                stat3: '29.8%', lbl3: 'HEADSHOT',
                signature: 'M1key_#'
            }
        ],
        lol: [
            {
                nick: 'Nate',
                name: 'Damián Rea',
                role: 'TOP LANER',
                number: '04',
                stat1: '3.82', lbl1: 'KDA',
                stat2: '62.4%', lbl2: 'PART. KILLS',
                stat3: '8.5', lbl3: 'CS / MINUTO',
                signature: 'Nate_#'
            },
            {
                nick: 'Apoka',
                name: 'Mario Pessoa',
                role: 'JUNGLE',
                number: '05',
                stat1: '4.12', lbl1: 'KDA',
                stat2: '71.5%', lbl2: 'PART. KILLS',
                stat3: '6.2', lbl3: 'CS / MINUTO',
                signature: 'Apoka_V'
            },
            {
                nick: 'Aloned',
                name: 'Tomás Díaz',
                role: 'MID LANER',
                number: '09',
                stat1: '4.54', lbl1: 'KDA',
                stat2: '68.9%', lbl2: 'PART. KILLS',
                stat3: '9.1', lbl3: 'CS / MINUTO',
                signature: 'Aloned_#'
            },
            {
                nick: 'Fix',
                name: 'Nicolás Sayago',
                role: 'BOT LANER (ADC)',
                number: '10',
                stat1: '4.88', lbl1: 'KDA',
                stat2: '74.2%', lbl2: 'PART. KILLS',
                stat3: '9.5', lbl3: 'CS / MINUTO',
                signature: 'Fix_#'
            },
            {
                nick: 'Coscu',
                name: 'Martín Pérez Disalvo',
                role: 'SUPPORT / CREATOR',
                number: '99',
                stat1: '3.20', lbl1: 'KDA',
                stat2: '58.1%', lbl2: 'PART. KILLS',
                stat3: '1.2', lbl3: 'CS / MINUTO',
                signature: 'Coscu_#'
            }
        ],
        creators: [
            {
                nick: 'Frankkaster',
                name: 'Francisco Postiglione',
                role: 'FUNDADOR & CREADOR',
                number: '99',
                stat1: '1.2M', lbl1: 'SEGUIDORES',
                stat2: 'IRL / CHAT', lbl2: 'CATEGORÍA',
                stat3: '10K+', lbl3: 'PROMEDIO',
                signature: 'Frankk_#'
            },
            {
                nick: 'Momo',
                name: 'Gerónimo Benavides',
                role: 'EMBAJADOR / IRL',
                number: '11',
                stat1: '1.1M', lbl1: 'SEGUIDORES',
                stat2: 'IRL / HISTORIA', lbl2: 'CATEGORÍA',
                stat3: '8K+', lbl3: 'PROMEDIO',
                signature: 'Momo_V'
            },
            {
                nick: 'Joaco',
                name: 'Joaco López',
                role: 'CREADOR / FPS',
                number: '12',
                stat1: '450K', lbl1: 'SEGUIDORES',
                stat2: 'FPS & IRL', lbl2: 'CATEGORÍA',
                stat3: '3K+', lbl3: 'PROMEDIO',
                signature: 'Joaco_#'
            },
            {
                nick: 'Pimpeano',
                name: 'Galíndez',
                role: 'CREADOR / COMEDIA',
                number: '14',
                stat1: '700K', lbl1: 'SEGUIDORES',
                stat2: 'HUMOR / FPS', lbl2: 'CATEGORÍA',
                stat3: '4K+', lbl3: 'PROMEDIO',
                signature: 'Pimpe_#'
            }
        ]
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Rotación máxima de 12 grados
        const rotateX = ((centerY - y) / centerY) * 12;
        const rotateY = ((x - centerX) / centerX) * 12;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Desplazamiento del sheen holográfico
        const sheen = card.querySelector('.hologram-sheet') as HTMLDivElement;
        if (sheen) {
            const pctX = (x / rect.width) * 100;
            const pctY = (y / rect.height) * 100;
            sheen.style.backgroundPosition = `${pctX}% ${pctY}%`;
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        
        const sheen = card.querySelector('.hologram-sheet') as HTMLDivElement;
        if (sheen) {
            sheen.style.backgroundPosition = '0% 0%';
        }
    };

    const handleTabClick = (tab: 'cs2' | 'valorant' | 'lol' | 'creators') => {
        playClick();
        setActiveTab(tab);
    };

    // Parámetros estéticos para los avatares según división
    const getAvatarConfig = (nick: string) => {
        if (activeTab === 'cs2') {
            return { hairColor: '#8b2dfb', visorColor: '#ff007a' };
        } else if (activeTab === 'valorant') {
            return { hairColor: '#ff0055', visorColor: '#00f0ff' };
        } else if (activeTab === 'lol') {
            return { hairColor: '#ffb800', visorColor: '#00f0ff' };
        } else {
            // Creators
            if (nick === 'Frankkaster') {
                return { hairColor: '#8b2dfb', visorColor: '#ff007a' };
            }
            return { hairColor: '#ffffff', visorColor: '#8b2dfb' };
        }
    };

    return (
        <section id="roster" className="section-container">
            <div className="section-header text-center">
                <div className="sub-headline">
                    <i className="fa-solid fa-users"></i> INTEGRANTES DEL CLUB
                </div>
                <h2 className="section-title">
                    ROSTER <span className="gradient-text">OFICIAL</span>
                </h2>
                <p className="section-subtitle">
                    Miembros activos de la escuadra violeta en sus respectivas disciplinas competitivas y canales oficiales.
                </p>

                {/* Tabs for Division selection */}
                <div className="roster-tabs" onMouseEnter={playHover}>
                    <button 
                        className={`roster-tab-btn ${activeTab === 'cs2' ? 'active' : ''}`}
                        onClick={() => handleTabClick('cs2')}
                    >
                        Counter-Strike 2
                    </button>
                    <button 
                        className={`roster-tab-btn ${activeTab === 'valorant' ? 'active' : ''}`}
                        onClick={() => handleTabClick('valorant')}
                    >
                        Valorant
                    </button>
                    <button 
                        className={`roster-tab-btn ${activeTab === 'lol' ? 'active' : ''}`}
                        onClick={() => handleTabClick('lol')}
                    >
                        League of Legends
                    </button>
                    <button 
                        className={`roster-tab-btn ${activeTab === 'creators' ? 'active' : ''}`}
                        onClick={() => handleTabClick('creators')}
                    >
                        Creadores
                    </button>
                </div>
            </div>

            {/* 3D Holographic Card Grid */}
            <div className="roster-grid">
                {playersData[activeTab].map((player) => {
                    const avatarConfig = getAvatarConfig(player.nick);
                    return (
                        <div 
                            key={player.nick}
                            className="player-card-3d"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            onMouseEnter={playHover}
                        >
                            {/* Holographic Reflection Sheet */}
                            <div className="hologram-sheet"></div>

                            {/* Programmatic Cyberpunk Avatar */}
                            <div className="player-avatar-container">
                                <PlayerAvatarSVG 
                                    hairColor={avatarConfig.hairColor} 
                                    visorColor={avatarConfig.visorColor} 
                                
                                />
                            </div>

                            {/* Overlay Badges */}
                            <div className="player-role-badge">{player.role}</div>
                            <div className="player-number">{player.number}</div>

                            {/* Player Info Footer overlay */}
                            <div className="player-info-footer">
                                <h3 className="player-nick">{player.nick}</h3>
                                <p className="player-real-name">{player.name}</p>

                                {/* Performance Stats HUD */}
                                <div className="player-stats-row">
                                    <div className="stat-item">
                                        <span className="stat-val">{player.stat1}</span>
                                        <span className="stat-lbl">{player.lbl1}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-val">{player.stat2}</span>
                                        <span className="stat-lbl">{player.lbl2}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-val">{player.stat3}</span>
                                        <span className="stat-lbl">{player.lbl3}</span>
                                    </div>
                                </div>

                                <div className="player-signature">{player.signature}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
