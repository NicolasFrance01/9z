import React, { useState } from 'react';
import type { Match } from '../types';
import { audioEngine } from '../utils/audioEngine';

// Renderizador modular de escudos SVG para evitar dependencias de archivos rotos
export const TeamShield: React.FC<{ teamName: string; size?: number; glow?: boolean }> = ({ teamName, size = 36, glow = false }) => {
    const formatted = teamName.trim().toUpperCase();

    // Paleta de colores para los escudos
    let fill = '#a39cb5';
    let stroke = 'rgba(255,255,255,0.2)';
    let initials = 'VS';

    if (formatted.includes('9Z')) {
        fill = '#8b2dfb';
        stroke = '#ff007a';
        initials = '9Z';
    } else if (formatted.includes('FURIA')) {
        fill = '#1c2b36';
        stroke = '#00f0ff';
        initials = 'FU';
    } else if (formatted.includes('LEVIATÁN') || formatted.includes('LEVIATAN')) {
        fill = '#0a2342';
        stroke = '#00f0ff';
        initials = 'LEV';
    } else if (formatted.includes('KRÜ') || formatted.includes('KRU')) {
        fill = '#ff007a';
        stroke = '#ffffff';
        initials = 'KRU';
    } else if (formatted.includes('VITALITY')) {
        fill = '#e5b300';
        stroke = '#1a1a1a';
        initials = 'VIT';
    } else if (formatted.includes('IMPERIAL')) {
        fill = '#103f1b';
        stroke = '#00ff66';
        initials = 'IMP';
    }

    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            className="card-team-shield"
            style={glow ? { filter: `drop-shadow(0 0 6px ${stroke})` } : {}}
            xmlns="http://www.w3.org/2000/svg"
        >
            <polygon 
                points="50,5 90,28 90,72 50,95 10,72 10,28" 
                fill={fill} 
                stroke={stroke} 
                strokeWidth="4" 
            />
            <polygon 
                points="50,15 82,34 82,66 50,85 18,66 18,34" 
                fill="#090514" 
                stroke={fill} 
                strokeWidth="2" 
                opacity="0.8"
            />
            {/* Texto o Símbolo geométrico representativo en el centro */}
            <text 
                x="50" 
                y="58" 
                fill="#ffffff" 
                fontSize={initials.length > 2 ? "20" : "28"}
                fontFamily="Orbitron" 
                fontWeight="900" 
                textAnchor="middle"
                style={{ letterSpacing: '0px' }}
            >
                {initials}
            </text>
            <circle cx="50" cy="80" r="3" fill={stroke} />
        </svg>
    );
};

export const Matches: React.FC = () => {
    const [statusFilter, setStatusFilter] = useState<'upcoming' | 'past'>('upcoming');
    const [gameFilter, setGameFilter] = useState<'all' | 'cs2' | 'valorant' | 'lol'>('all');

    const playHover = () => audioEngine.playHover();
    const playClick = () => audioEngine.playClick();

    // Mock data fuertemente tipada de partidos de 9z
    const matchesData: Match[] = [
        {
            id: 1,
            game: 'cs2',
            league: 'PGL Major Europe RMR',
            status: 'upcoming',
            teamHome: '9z Team',
            teamHomeShield: '9z',
            teamAway: 'Team Vitality',
            teamAwayShield: 'vitality',
            scoreHome: '-',
            scoreAway: '-',
            date: 'Hoy, 20:30 hs',
            isLive: true,
            streamUrl: '#streams'
        },
        {
            id: 2,
            game: 'valorant',
            league: 'VCT Americas Stage 1',
            status: 'upcoming',
            teamHome: '9z Team',
            teamHomeShield: '9z',
            teamAway: 'KRÜ Esports',
            teamAwayShield: 'kru',
            scoreHome: '-',
            scoreAway: '-',
            date: 'Mañana, 18:00 hs',
            isLive: false
        },
        {
            id: 3,
            game: 'lol',
            league: 'LLA Apertura Play-Offs',
            status: 'upcoming',
            teamHome: '9z Team',
            teamHomeShield: '9z',
            teamAway: 'Leviatán Esports',
            teamAwayShield: 'leviatan',
            scoreHome: '-',
            scoreAway: '-',
            date: 'Mayo 25, 21:00 hs',
            isLive: false
        },
        // Past matches (Resultados)
        {
            id: 4,
            game: 'cs2',
            league: 'IEM Chengdu 2026',
            status: 'past',
            teamHome: '9z Team',
            teamHomeShield: '9z',
            teamAway: 'FURIA',
            teamAwayShield: 'furia',
            scoreHome: '2',
            scoreAway: '1',
            date: 'Mayo 18, 2026',
            result: 'win'
        },
        {
            id: 5,
            game: 'valorant',
            league: 'VCT Americas Kickoff',
            status: 'past',
            teamHome: '9z Team',
            teamHomeShield: '9z',
            teamAway: 'Leviatán Esports',
            teamAwayShield: 'leviatan',
            scoreHome: '0',
            scoreAway: '2',
            date: 'Mayo 12, 2026',
            result: 'lose'
        },
        {
            id: 6,
            game: 'cs2',
            league: 'ESL Pro League S19',
            status: 'past',
            teamHome: '9z Team',
            teamHomeShield: '9z',
            teamAway: 'Imperial Esports',
            teamAwayShield: 'imperial',
            scoreHome: '2',
            scoreAway: '0',
            date: 'Mayo 08, 2026',
            result: 'win'
        }
    ];

    const filteredMatches = matchesData.filter(m => {
        const matchesStatus = m.status === statusFilter;
        const matchesGame = gameFilter === 'all' || m.game === gameFilter;
        return matchesStatus && matchesGame;
    });

    const handleStatusTab = (status: 'upcoming' | 'past') => {
        playClick();
        setStatusFilter(status);
    };

    const handleGameFilter = (game: 'all' | 'cs2' | 'valorant' | 'lol') => {
        playClick();
        setGameFilter(game);
    };

    return (
        <section id="partidos" className="section-container">
            <div className="section-header">
                <div>
                    <div className="sub-headline">
                        <i className="fa-solid fa-calendar-days"></i> CALENDARIO ACTIVADO
                    </div>
                    <h2 className="section-title">
                        ARENA DE <span className="gradient-text">PARTIDOS</span>
                    </h2>
                    <p className="section-subtitle">
                        Seguí los fixtures en vivo, partidos históricos y récords competitivos de la escuadra violeta en sus distintas divisiones.
                    </p>
                </div>
                
                {/* Tabs for Upcoming vs Past */}
                <div className="btn-group-tabs" onMouseEnter={playHover}>
                    <button 
                        className={`tab-btn ${statusFilter === 'upcoming' ? 'active' : ''}`}
                        onClick={() => handleStatusTab('upcoming')}
                    >
                        Próximos
                    </button>
                    <button 
                        className={`tab-btn ${statusFilter === 'past' ? 'active' : ''}`}
                        onClick={() => handleStatusTab('past')}
                    >
                        Resultados
                    </button>
                </div>
            </div>

            {/* Game Filters Grid */}
            <div className="game-filters" onMouseEnter={playHover}>
                <button 
                    className={`filter-chip ${gameFilter === 'all' ? 'active' : ''}`}
                    onClick={() => handleGameFilter('all')}
                >
                    <i className="fa-solid fa-circle-nodes"></i> Todos
                </button>
                <button 
                    className={`filter-chip ${gameFilter === 'cs2' ? 'active' : ''}`}
                    onClick={() => handleGameFilter('cs2')}
                >
                    <i className="fa-solid fa-gun"></i> CS2
                </button>
                <button 
                    className={`filter-chip ${gameFilter === 'valorant' ? 'active' : ''}`}
                    onClick={() => handleGameFilter('valorant')}
                >
                    <i className="fa-solid fa-bullseye"></i> Valorant
                </button>
                <button 
                    className={`filter-chip ${gameFilter === 'lol' ? 'active' : ''}`}
                    onClick={() => handleGameFilter('lol')}
                >
                    <i className="fa-solid fa-gamepad"></i> League of Legends
                </button>
            </div>

            {/* Dynamic Matches Grid */}
            <div className="matches-grid">
                {filteredMatches.length > 0 ? (
                    filteredMatches.map((match) => (
                        <div 
                            key={match.id} 
                            className={`match-card ${match.status === 'past' ? match.result : ''}`}
                            onMouseEnter={playHover}
                        >
                            <div className="card-top">
                                <span className="card-game">{match.game.toUpperCase()}</span>
                                <span className="card-league">{match.league}</span>
                            </div>

                            <div className="card-versus-row">
                                {/* Home Team */}
                                <div className="card-team">
                                    <TeamShield teamName={match.teamHome} glow={statusFilter === 'upcoming'} />
                                    <span className="card-team-name">{match.teamHome}</span>
                                </div>

                                {/* Dynamic Score / VS separator */}
                                <div className="card-score">
                                    {match.status === 'past' ? (
                                        <>
                                            <span className={match.result === 'win' ? 'win-score' : ''}>{match.scoreHome}</span>
                                            <span> - </span>
                                            <span className={match.result === 'lose' ? 'win-score' : ''}>{match.scoreAway}</span>
                                        </>
                                    ) : (
                                        match.isLive ? <span className="status-live-score" style={{color: '#ff007a'}}>VS</span> : 'VS'
                                    )}
                                </div>

                                {/* Away Team */}
                                <div className="card-team away">
                                    <span className="card-team-name">{match.teamAway}</span>
                                    <TeamShield teamName={match.teamAway} glow={statusFilter === 'upcoming'} />
                                </div>
                            </div>

                            <div className="card-bottom">
                                <span className="card-time">
                                    <i className="fa-solid fa-clock"></i> {match.date}
                                </span>

                                {/* Blip Status Badge */}
                                {match.status === 'upcoming' ? (
                                    match.isLive ? (
                                        <a 
                                            href="#streams" 
                                            className="card-status-badge status-live"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                playClick();
                                                const element = document.getElementById('streams');
                                                if (element) element.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                        >
                                            ● EN VIVO
                                        </a>
                                    ) : (
                                        <span className="card-status-badge status-upcoming">PROGRAMADO</span>
                                    )
                                ) : (
                                    <span className="card-status-badge status-finished">
                                        {match.result === 'win' ? 'VICTORIA' : 'DERROTA'}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="form-group full" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)', border: '1px dashed var(--color-border)', borderRadius: '8px' }}>
                        <i className="fa-solid fa-circle-exclamation" style={{ fontSize: '24px', marginBottom: '10px', color: 'var(--color-secondary)' }}></i>
                        <p>No se encontraron partidos programados para esta categoría.</p>
                    </div>
                )}
            </div>
        </section>
    );
};
