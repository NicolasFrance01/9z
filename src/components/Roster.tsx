import React, { useState } from 'react';
import { audioEngine } from '../utils/audioEngine';

// Interfaz interna para extender la tipificación de jugadores con redes sociales y fotos
interface RosterPlayer {
    nick: string;
    name: string;
    role: string;
    number: string;
    stat1: string;
    lbl1: string;
    stat2: string;
    lbl2: string;
    stat3: string;
    lbl3: string;
    signature: string;
    photoUrl?: string; // Para cuando el usuario agregue las imágenes reales
    socials: {
        twitter?: string;
        instagram?: string;
        twitch?: string;
    };
}

interface GameDivision {
    id: string;
    title: string;
    genre: string;
    coverBg: string; // Portada programática / gradiente
    icon: string;
    description: string;
    coach: string;
    players: RosterPlayer[];
}

export const Roster: React.FC = () => {
    const [selectedGame, setSelectedGame] = useState<GameDivision | null>(null);
    const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);

    const playHover = () => audioEngine.playHover();
    const playClick = () => audioEngine.playClick();

    // Data Real de Escuadras de 9z Globant 2026
    const divisionsData: GameDivision[] = [
        {
            id: 'cs2',
            title: 'Counter-Strike 2',
            genre: 'Tactical Shooter',
            coverBg: 'url(/covers/cs2.png) center/cover',
            icon: 'fa-gun',
            description: 'La división insignia de 9z Globant, consagrada como el orgullo de Sudamérica tras sus históricas clasificaciones a Majors de la mano del coach bit y del capitán max.',
            coach: 'Rodrigo "bit" Fukuda',
            players: [
                {
                    nick: 'max',
                    name: 'Maximiliano González',
                    role: 'IGL / In-Game Leader',
                    number: '10',
                    stat1: '1.08', lbl1: 'RATING 2.0',
                    stat2: '76.8', lbl2: 'ADR',
                    stat3: '68.9%', lbl3: 'KAST',
                    signature: 'maxGx_#',
                    photoUrl: '', // Dejado en blanco para usar el emoji de persona por defecto
                    socials: { twitter: 'maxg0n', instagram: 'maxg0nzalez', twitch: 'maxgonzalez' }
                },
                {
                    nick: 'dgt',
                    name: 'Franco García',
                    role: 'Lurker / Rifler',
                    number: '07',
                    stat1: '1.24', lbl1: 'RATING 2.0',
                    stat2: '84.6', lbl2: 'ADR',
                    stat3: '74.2%', lbl3: 'KAST',
                    signature: 'dgt_1',
                    photoUrl: '',
                    socials: { twitter: 'dgtcs', instagram: 'francodgt', twitch: 'dgtcs' }
                },
                {
                    nick: 'HUASOPEEK',
                    name: 'Matías Ibáñez',
                    role: 'Rifler / Support',
                    number: '88',
                    stat1: '1.12', lbl1: 'RATING 2.0',
                    stat2: '79.2', lbl2: 'ADR',
                    stat3: '70.4%', lbl3: 'KAST',
                    signature: 'hpeek_#',
                    photoUrl: '',
                    socials: { twitter: 'huasopeek', instagram: 'huasopeek', twitch: 'huasopeek' }
                },
                {
                    nick: 'luchov',
                    name: 'Luciano Herrera',
                    role: 'Entry Fragger',
                    number: '19',
                    stat1: '1.10', lbl1: 'RATING 2.0',
                    stat2: '78.1', lbl2: 'ADR',
                    stat3: '71.0%', lbl3: 'KAST',
                    signature: 'luchov_V',
                    photoUrl: '',
                    socials: { twitter: 'luchovcs', instagram: 'luchov', twitch: 'luchov' }
                },
                {
                    nick: 'meyern',
                    name: 'Ignacio Meyer',
                    role: 'Rifler / Entry',
                    number: '09',
                    stat1: '1.15', lbl1: 'RATING 2.0',
                    stat2: '81.5', lbl2: 'ADR',
                    stat3: '72.3%', lbl3: 'KAST',
                    signature: 'meyern_#',
                    photoUrl: '',
                    socials: { twitter: 'meyern', instagram: 'meyern', twitch: 'meyern' }
                }
            ]
        },
        {
            id: 'valorant',
            title: 'VALORANT',
            genre: 'Hero Shooter',
            coverBg: 'url(/covers/valorant.png) center/cover',
            icon: 'fa-bullseye',
            description: 'Escuadra táctica de VALORANT, compitiendo activamente en las ligas regionales del Challengers con una formación joven, agresiva y de alto rendimiento.',
            coach: 'Javier "Puleule" Valenzuela',
            players: [
                {
                    nick: 'MiradaNinja',
                    name: 'Waldo Barahona',
                    role: 'Duelista Principal',
                    number: '01',
                    stat1: '256', lbl1: 'ACS',
                    stat2: '1.28', lbl2: 'K/D RATIO',
                    stat3: '36.4%', lbl3: 'HEADSHOT',
                    signature: 'MiradaNinja_#',
                    photoUrl: '',
                    socials: { twitter: 'miradaninja', instagram: 'miradaninja', twitch: 'miradaninjacs' }
                },
                {
                    nick: 'Kimb0',
                    name: 'Dylan Pintos',
                    role: 'Iniciador / IGL',
                    number: '03',
                    stat1: '210', lbl1: 'ACS',
                    stat2: '1.15', lbl2: 'K/D RATIO',
                    stat3: '28.2%', lbl3: 'HEADSHOT',
                    signature: 'Kimb0_V',
                    photoUrl: '',
                    socials: { twitter: 'kimboval', instagram: 'kimb0_v', twitch: 'kimb0_v' }
                },
                {
                    nick: 'Mikey Tap',
                    name: 'Luciano Pensa',
                    role: 'Iniciador / Flex',
                    number: '02',
                    stat1: '215', lbl1: 'ACS',
                    stat2: '1.12', lbl2: 'K/D RATIO',
                    stat3: '29.8%', lbl3: 'HEADSHOT',
                    signature: 'Mikey_#',
                    photoUrl: '',
                    socials: { twitter: 'mikey_val', instagram: 'mikey_tap', twitch: 'mikey_tap' }
                },
                {
                    nick: 'skyppervz',
                    name: 'Lucas Pizarro',
                    role: 'Centinela / Anchor',
                    number: '05',
                    stat1: '204', lbl1: 'ACS',
                    stat2: '1.18', lbl2: 'K/D RATIO',
                    stat3: '32.1%', lbl3: 'HEADSHOT',
                    signature: 'skypp_#',
                    photoUrl: '',
                    socials: { twitter: 'skyppervz', instagram: 'skyppervz', twitch: 'skyppervz' }
                },
                {
                    nick: 'Tuli',
                    name: 'Giulliano Pozo Massone',
                    role: 'Controlador / Flex',
                    number: '08',
                    stat1: '201', lbl1: 'ACS',
                    stat2: '1.09', lbl2: 'K/D RATIO',
                    stat3: '25.4%', lbl3: 'HEADSHOT',
                    signature: 'Tuli_V',
                    photoUrl: '',
                    socials: { twitter: 'tulival', instagram: 'tuli_pozo', twitch: 'tuli_pozo' }
                }
            ]
        },
        {
            id: 'simracing',
            title: 'Sim Racing',
            genre: 'Racing Simulator',
            coverBg: 'url(/covers/simracing.png) center/cover',
            icon: 'fa-car-side',
            description: 'División de carreras virtuales de 9z Globant, compitiendo en simuladores de alta fidelidad y cosechando podios estelares en ligas de automovilismo.',
            coach: 'Autogestionado',
            players: [
                {
                    nick: 'Maxi Lezaeta',
                    name: 'Maximiliano Lezaeta',
                    role: 'Piloto de Simracing',
                    number: '12',
                    stat1: '1º', lbl1: 'LIGA FiRe',
                    stat2: '15+', lbl2: 'PODIOS',
                    stat3: 'rFactor 2', lbl3: 'SIMULADOR',
                    signature: 'Lezaeta_#',
                    photoUrl: '',
                    socials: { twitter: 'MaxiLezaeta', instagram: 'maxilezaeta', twitch: 'maxilezaeta' }
                },
                {
                    nick: 'FacuDudu',
                    name: 'Facundo Dudulec',
                    role: 'Piloto de Simracing',
                    number: '44',
                    stat1: 'Logitech', lbl1: 'G CHALLENGE',
                    stat2: 'FIA GT', lbl2: 'WORLD TOUR',
                    stat3: 'Gran Turismo', lbl3: 'SIMULADOR',
                    signature: 'FacuDudu_V',
                    photoUrl: '',
                    socials: { twitter: 'FacuDudu', instagram: 'facududu', twitch: 'facududu' }
                }
            ]
        },
        {
            id: 'pubg_mobile',
            title: 'PUBG Mobile',
            genre: 'Battle Royale',
            coverBg: 'url(/covers/pubg_mobile.png) center/cover',
            icon: 'fa-parachute-box',
            description: 'División móvil de Battle Royale de alto calibre, representando a 9z Globant en batallas multitudinarias con una excelente sincronía de escuadra.',
            coach: '"Zoka"',
            players: [
                {
                    nick: 'Becker',
                    name: 'Becker González',
                    role: 'Rusher',
                    number: '04',
                    stat1: '1.45', lbl1: 'K/D RATIO',
                    stat2: '320', lbl2: 'AVG DAMAGE',
                    stat3: '42%', lbl3: 'TOP 10%',
                    signature: 'Becker_#',
                    photoUrl: '',
                    socials: { twitter: 'becker_pubg', instagram: 'becker_pubg' }
                },
                {
                    nick: 'Erago',
                    name: 'Erago Santos',
                    role: 'IGL / Tactician',
                    number: '08',
                    stat1: '1.28', lbl1: 'K/D RATIO',
                    stat2: '290', lbl2: 'AVG DAMAGE',
                    stat3: '45%', lbl3: 'TOP 10%',
                    signature: 'Erago_V',
                    photoUrl: '',
                    socials: { twitter: 'erago_pubg', twitch: 'erago_pubg' }
                },
                {
                    nick: 'Cher',
                    name: 'Cher Rivera',
                    role: 'Support / Anchor',
                    number: '21',
                    stat1: '1.10', lbl1: 'K/D RATIO',
                    stat2: '260', lbl2: 'AVG DAMAGE',
                    stat3: '38%', lbl3: 'TOP 10%',
                    signature: 'Cher_#',
                    photoUrl: '',
                    socials: { twitter: 'cher_pubg', instagram: 'cher_pubg' }
                },
                {
                    nick: 'Remix',
                    name: 'Yadiel Orlando',
                    role: 'Rusher / Entry',
                    number: '17',
                    stat1: '1.52', lbl1: 'K/D RATIO',
                    stat2: '340', lbl2: 'AVG DAMAGE',
                    stat3: '40%', lbl3: 'TOP 10%',
                    signature: 'Remix_#',
                    photoUrl: '',
                    socials: { twitter: 'remix_pubg', instagram: 'remix_pubg', twitch: 'remix_pubg' }
                },
                {
                    nick: 'Colega',
                    name: 'Sergio Mendez Lizalde',
                    role: 'Sniper / Marksman',
                    number: '99',
                    stat1: '1.38', lbl1: 'K/D RATIO',
                    stat2: '310', lbl2: 'AVG DAMAGE',
                    stat3: '41%', lbl3: 'TOP 10%',
                    signature: 'Colega_V',
                    photoUrl: '',
                    socials: { twitter: 'colega_pubg', instagram: 'colega_pubg' }
                }
            ]
        },
        {
            id: 'honor_of_kings',
            title: 'Honor of Kings',
            genre: 'MOBA',
            coverBg: 'url(/covers/honor_of_kings.png) center/cover',
            icon: 'fa-shield-halved',
            description: 'División móvil de Honor of Kings compitiendo al máximo nivel en la escena latinoamericana y brasileña de Major League.',
            coach: 'Marcelo "Zurd10s" Perez',
            players: [
                {
                    nick: 'SrMusTer',
                    name: 'Alejandro Cabrera',
                    role: 'Top Lane',
                    number: '05',
                    stat1: '4.2', lbl1: 'KDA RATIO',
                    stat2: '62.5%', lbl2: 'WIN RATE',
                    stat3: 'Top Lane', lbl3: 'POSICIÓN',
                    signature: 'MusTer_#',
                    photoUrl: '',
                    socials: { twitter: 'srmuster_hok', instagram: 'srmuster_hok' }
                },
                {
                    nick: 'Azraelt',
                    name: 'Giovani César da Silva',
                    role: 'Jungler',
                    number: '09',
                    stat1: '4.8', lbl1: 'KDA RATIO',
                    stat2: '68.0%', lbl2: 'WIN RATE',
                    stat3: 'Jungle', lbl3: 'POSICIÓN',
                    signature: 'Azraelt_V',
                    photoUrl: '',
                    socials: { twitter: 'azraelt_hok', twitch: 'azraelt_hok' }
                },
                {
                    nick: 'Ocean',
                    name: 'Pedro Henrique da Costa Lima',
                    role: 'Middle Lane',
                    number: '07',
                    stat1: '4.5', lbl1: 'KDA RATIO',
                    stat2: '65.2%', lbl2: 'WIN RATE',
                    stat3: 'Mid Lane', lbl3: 'POSICIÓN',
                    signature: 'Ocean_#',
                    photoUrl: '',
                    socials: { twitter: 'ocean_hok', instagram: 'ocean_hok' }
                },
                {
                    nick: 'Alonso',
                    name: 'Alonso Romero Fuentes Neto',
                    role: 'Bottom Lane (ADC)',
                    number: '10',
                    stat1: '5.1', lbl1: 'KDA RATIO',
                    stat2: '70.1%', lbl2: 'WIN RATE',
                    stat3: 'Gold Lane', lbl3: 'POSICIÓN',
                    signature: 'Alonso_#',
                    photoUrl: '',
                    socials: { twitter: 'alonso_hok', instagram: 'alonso_hok' }
                },
                {
                    nick: 'TaZy',
                    name: 'TaZy Roamer',
                    role: 'Roamer / Support',
                    number: '03',
                    stat1: '3.9', lbl1: 'KDA RATIO',
                    stat2: '58.3%', lbl2: 'WIN RATE',
                    stat3: 'Roamer', lbl3: 'POSICIÓN',
                    signature: 'TaZy_V',
                    photoUrl: '',
                    socials: { twitter: 'tazy_hok', instagram: 'tazy_hok' }
                }
            ]
        },
        {
            id: 'mobile_legends',
            title: 'Mobile Legends: BB',
            genre: 'MOBA',
            coverBg: 'url(/covers/mobile_legends.png) center/cover',
            icon: 'fa-wand-magic-sparkles',
            description: 'Una de las escuadras móviles más potentes de Sudamérica, compitiendo ferozmente en las ligas de Mobile Legends Bang Bang (MLBB) con un roster estelar.',
            coach: 'Autogestionado',
            players: [
                {
                    nick: 'Chino',
                    name: 'Lucas Sebastián Fagúndez',
                    role: 'EXP Lane',
                    number: '02',
                    stat1: '4.1', lbl1: 'KDA RATIO',
                    stat2: '60%', lbl2: 'PART. KILLS',
                    stat3: 'EXP Lane', lbl3: 'POSICIÓN',
                    signature: 'Chino_#',
                    photoUrl: '',
                    socials: { twitter: 'chino_mlbb', instagram: 'chino_mlbb' }
                },
                {
                    nick: 'Luizinho',
                    name: 'Luizinho Jungler',
                    role: 'Jungler',
                    number: '09',
                    stat1: '4.9', lbl1: 'KDA RATIO',
                    stat2: '69%', lbl2: 'PART. KILLS',
                    stat3: 'Jungler', lbl3: 'POSICIÓN',
                    signature: 'Luiz_V',
                    photoUrl: '',
                    socials: { twitter: 'luizinho_mlbb', twitch: 'luiz_mlbb' }
                },
                {
                    nick: 'Feshin',
                    name: 'Juan Jose Rafael',
                    role: 'Middle Lane',
                    number: '04',
                    stat1: '4.3', lbl1: 'KDA RATIO',
                    stat2: '64%', lbl2: 'PART. KILLS',
                    stat3: 'Mid Lane', lbl3: 'POSICIÓN',
                    signature: 'Feshin_#',
                    photoUrl: '',
                    socials: { twitter: 'feshin_mlbb', instagram: 'feshin_mlbb' }
                },
                {
                    nick: 'Yur',
                    name: 'Matias Ezequiel Canaviri',
                    role: 'Gold Lane (ADC)',
                    number: '11',
                    stat1: '4.8', lbl1: 'KDA RATIO',
                    stat2: '71%', lbl2: 'PART. KILLS',
                    stat3: 'Gold Lane', lbl3: 'POSICIÓN',
                    signature: 'Yur_#',
                    photoUrl: '',
                    socials: { twitter: 'yur_mlbb', instagram: 'yuryur_v' }
                },
                {
                    nick: 'Alborocrazy',
                    name: 'Alborocrazy Roamer',
                    role: 'Roamer',
                    number: '03',
                    stat1: '3.8', lbl1: 'KDA RATIO',
                    stat2: '55%', lbl2: 'PART. KILLS',
                    stat3: 'Roamer', lbl3: 'POSICIÓN',
                    signature: 'Alboro_V',
                    photoUrl: '',
                    socials: { twitter: 'alborocrazy', instagram: 'alborocrazy' }
                }
            ]
        },
        {
            id: 'rainbow_six',
            title: 'Rainbow Six Siege',
            genre: 'Tactical Shooter',
            coverBg: 'url(/covers/rainbow_six.png) center/cover',
            icon: 'fa-masks-theater',
            description: 'Escuadra de asalto táctico en Tom Clancy\'s Rainbow Six Siege, con despliegue de estrategias milimétricas en las ligas de LATAM.',
            coach: 'Autogestionado',
            players: [
                {
                    nick: 'Nitro',
                    name: 'Emiliano Garay',
                    role: 'Jugador Entry',
                    number: '11',
                    stat1: '1.22', lbl1: 'K/D RATIO',
                    stat2: '78%', lbl2: 'KOST',
                    stat3: '1.15', lbl3: 'ENTRY RATING',
                    signature: 'Nitro_#',
                    photoUrl: '',
                    socials: { twitter: 'nitro_r6', instagram: 'nitro_r6', twitch: 'nitro_r6' }
                },
                {
                    nick: 'Tucu',
                    name: 'Jeronimo Vallejo',
                    role: 'Jugador Flex',
                    number: '05',
                    stat1: '1.10', lbl1: 'K/D RATIO',
                    stat2: '74%', lbl2: 'KOST',
                    stat3: '1.08', lbl3: 'RATING',
                    signature: 'Tucu_V',
                    photoUrl: '',
                    socials: { twitter: 'tucu_r6', instagram: 'tucu_r6' }
                },
                {
                    nick: 'Basthian',
                    name: 'Bastian Aguilera',
                    role: 'Jugador Support',
                    number: '04',
                    stat1: '0.98', lbl1: 'K/D RATIO',
                    stat2: '72%', lbl2: 'KOST',
                    stat3: '0.95', lbl3: 'RATING',
                    signature: 'Basth_#',
                    photoUrl: '',
                    socials: { twitter: 'basthian_r6', instagram: 'basthian_r6' }
                },
                {
                    nick: 'panno9',
                    name: 'Franco Panno',
                    role: 'Jugador IGL',
                    number: '07',
                    stat1: '1.05', lbl1: 'K/D RATIO',
                    stat2: '75%', lbl2: 'KOST',
                    stat3: '1.02', lbl3: 'RATING',
                    signature: 'panno_#',
                    photoUrl: '',
                    socials: { twitter: 'panno9_r6', twitch: 'panno9_r6' }
                },
                {
                    nick: 'Skarp',
                    name: 'Hernán Ramirez Burrelo',
                    role: 'Jugador Entry',
                    number: '08',
                    stat1: '1.25', lbl1: 'K/D RATIO',
                    stat2: '79%', lbl2: 'KOST',
                    stat3: '1.18', lbl3: 'ENTRY RATING',
                    signature: 'Skarp_#',
                    photoUrl: '',
                    socials: { twitter: 'skarp_r6', instagram: 'skarp_r6' }
                }
            ]
        },
        {
            id: 'creators',
            title: 'Creadores & IRL',
            genre: 'Streamers',
            coverBg: 'url(/covers/creadores.png) center/cover',
            icon: 'fa-comments',
            description: 'El corazón y alma de la comunidad violeta. Los mayores creadores de contenido de Argentina e Hispanoamérica que empujan el movimiento #TodoVioleta día a día.',
            coach: 'Frankkaster (CEO)',
            players: [
                {
                    nick: 'Frankkaster',
                    name: 'Francisco Postiglione',
                    role: 'Fundador & Creador',
                    number: '99',
                    stat1: '1.2M', lbl1: 'SEGUIDORES',
                    stat2: 'IRL / Chat', lbl2: 'CATEGORÍA',
                    stat3: '10K+', lbl3: 'PROMEDIO',
                    signature: 'Frankk_#',
                    photoUrl: '',
                    socials: { twitter: 'FrankkasterX', instagram: 'frankkaster', twitch: 'frankkaster' }
                },
                {
                    nick: 'Momo',
                    name: 'Gerónimo Benavides',
                    role: 'Embajador / IRL',
                    number: '11',
                    stat1: '1.1M', lbl1: 'SEGUIDORES',
                    stat2: 'Historia / IRL', lbl2: 'CATEGORÍA',
                    stat3: '8K+', lbl3: 'PROMEDIO',
                    signature: 'Momo_V',
                    photoUrl: '',
                    socials: { twitter: 'momo_geronimo', instagram: 'gero.momo', twitch: 'momogerardi' }
                },
                {
                    nick: 'Joaco',
                    name: 'Joaco López',
                    role: 'Creador / Variedad',
                    number: '12',
                    stat1: '450K', lbl1: 'SEGUIDORES',
                    stat2: 'FPS & IRL', lbl2: 'CATEGORÍA',
                    stat3: '3K+', lbl3: 'PROMEDIO',
                    signature: 'Joaco_#',
                    photoUrl: '',
                    socials: { twitter: 'joacolopez', instagram: 'joacolopez', twitch: 'joaco' }
                },
                {
                    nick: 'Pimpeano',
                    name: 'Galíndez',
                    role: 'Creador / Comedia',
                    number: '14',
                    stat1: '700K', lbl1: 'SEGUIDORES',
                    stat2: 'Humor & FPS', lbl2: 'CATEGORÍA',
                    stat3: '4K+', lbl3: 'PROMEDIO',
                    signature: 'Pimpe_#',
                    photoUrl: '',
                    socials: { twitter: 'pimpeano', instagram: 'pimpeano', twitch: 'pimpeano' }
                }
            ]
        }
    ];

    const openDashboard = (game: GameDivision) => {
        playClick();
        setSelectedGame(game);
        setActivePlayerIndex(0);
        document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
    };

    const closeDashboard = () => {
        playClick();
        setSelectedGame(null);
        document.body.style.overflow = ''; // Restaurar scroll
    };

    return (
        <section id="roster" className="section-container">
            <div className="section-header text-center">
                <div className="sub-headline">
                    <i className="fa-solid fa-users"></i> DIVISIONES DE 9Z GLOBANT
                </div>
                <h2 className="section-title">
                    CENTRO DE <span className="gradient-text">ESCUADRAS</span>
                </h2>
                <p className="section-subtitle">
                    Hacé clic sobre las portadas de juego oficiales para abrir el panel táctico interactivo y ver el roster, redes sociales y estadísticas de cada jugador real.
                </p>
            </div>

            {/* Game Covers Grid */}
            <div className="game-covers-grid" onMouseEnter={playHover}>
                {divisionsData.map((game) => (
                    <div 
                        key={game.id} 
                        className="game-cover-card" 
                        style={{ '--cover-gradient': game.coverBg } as React.CSSProperties}
                        onClick={() => openDashboard(game)}
                    >
                        {/* Futuristic scanline and border glow */}
                        <div className="cover-scanner"></div>
                        <div className="cover-glow-border"></div>

                        {/* Programmatic Grid Pattern in Cover Background */}
                        <div className="cover-grid-pattern"></div>

                        {/* Floating Game Icon */}
                        <div className="cover-icon-box">
                            <i className={`fa-solid ${game.icon}`}></i>
                        </div>

                        {/* Cover Content */}
                        <div className="cover-content">
                            <span className="cover-genre">{game.genre}</span>
                            <h3 className="cover-title">{game.title}</h3>
                            <div className="cover-meta">
                                <span className="cover-badge">{game.players.length} INTEGRANTES</span>
                                <span className="cover-action-btn">
                                    VER PANEL <i className="fa-solid fa-arrow-right"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ==========================================================================
               DASHBOARD OVERLAY (MODAL INMERSIVO CYBERPUNK)
               ========================================================================== */}
            {selectedGame && (
                <div className="dashboard-overlay show" onClick={closeDashboard}>
                    <div className="dashboard-container" onClick={(e) => e.stopPropagation()}>
                        
                        {/* Top bar control */}
                        <div className="dashboard-header-bar">
                            <div className="dashboard-game-info">
                                <i className={`fa-solid ${selectedGame.icon} game-glow-icon`}></i>
                                <div>
                                    <h2>{selectedGame.title.toUpperCase()} DIVISION</h2>
                                    <p>COACH: <strong style={{ color: 'var(--color-secondary)' }}>{selectedGame.coach.toUpperCase()}</strong></p>
                                </div>
                            </div>
                            <button className="dashboard-close-btn" onClick={closeDashboard}>
                                CERRAR <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        {/* Interactive Main Panels */}
                        <div className="dashboard-body">
                            
                            {/* LEFT SIDEBAR: Player selections list */}
                            <div className="dashboard-sidebar">
                                <div className="sidebar-title">SQUAD INTEGRANTES</div>
                                <div className="players-select-list">
                                    {selectedGame.players.map((player, idx) => (
                                        <button 
                                            key={player.nick}
                                            className={`player-select-btn ${activePlayerIndex === idx ? 'active' : ''}`}
                                            onClick={() => { playClick(); setActivePlayerIndex(idx); }}
                                        >
                                            <span className="player-number-tag">#{player.number}</span>
                                            <span className="player-nick-tag">{player.nick}</span>
                                            <i className="fa-solid fa-chevron-right select-arrow"></i>
                                        </button>
                                    ))}
                                </div>
                                <div className="sidebar-game-desc">
                                    <p>{selectedGame.description}</p>
                                </div>
                            </div>

                            {/* RIGHT CONTENT AREA: Active Player Profile Sheet */}
                            <div className="dashboard-profile-sheet">
                                {selectedGame.players[activePlayerIndex] && (() => {
                                    const player = selectedGame.players[activePlayerIndex];
                                    return (
                                        <div className="player-tactical-profile">
                                            {/* Tactical scanner background */}
                                            <div className="tactical-hud-lines"></div>

                                            {/* Avatar Box (Silhouette / Emoji support with real photo fallbacks) */}
                                            <div className="tactical-avatar-section">
                                                <div className="tactical-avatar-container">
                                                    {/* Glow Tech Circle */}
                                                    <div className="tech-glow-circle"></div>

                                                    {/* User Image or Silhouette Persona Emoji */}
                                                    <div className="player-avatar-box">
                                                        {player.photoUrl ? (
                                                            <img 
                                                                src={player.photoUrl} 
                                                                alt={player.nick} 
                                                                className="player-photo-image"
                                                                onError={(e) => {
                                                                    // Si no carga la imagen, se oculta y se activa el emoji
                                                                    e.currentTarget.style.display = 'none';
                                                                    const emojiEl = document.getElementById(`emoji-fallback-${player.nick}`);
                                                                    if (emojiEl) emojiEl.style.display = 'flex';
                                                                }}
                                                            />
                                                        ) : null}
                                                        
                                                        <div 
                                                            id={`emoji-fallback-${player.nick}`}
                                                            className="avatar-persona-emoji"
                                                            style={{ display: player.photoUrl ? 'none' : 'flex' }}
                                                        >
                                                            👤
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Player Main Info */}
                                                <div className="tactical-main-info">
                                                    <div className="player-nick-row">
                                                        <span className="tactical-number">#{player.number}</span>
                                                        <h3 className="tactical-nick">{player.nick}</h3>
                                                    </div>
                                                    <p className="tactical-realname">{player.name}</p>
                                                    <span className="tactical-role-badge">{player.role.toUpperCase()}</span>
                                                </div>
                                            </div>

                                            {/* Tactical Stats HUD Grid */}
                                            <div className="tactical-stats-hud">
                                                <h4 className="hud-label"><i className="fa-solid fa-chart-simple"></i> PERFORMANCE STATS</h4>
                                                <div className="hud-stats-grid">
                                                    <div className="hud-stat-card">
                                                        <span className="hud-stat-val">{player.stat1}</span>
                                                        <span className="hud-stat-lbl">{player.lbl1}</span>
                                                    </div>
                                                    <div className="hud-stat-card">
                                                        <span className="hud-stat-val">{player.stat2}</span>
                                                        <span className="hud-stat-lbl">{player.lbl2}</span>
                                                    </div>
                                                    <div className="hud-stat-card">
                                                        <span className="hud-stat-val">{player.stat3}</span>
                                                        <span className="hud-stat-lbl">{player.lbl3}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Interactive HUD Actions (Social Networks) */}
                                            <div className="tactical-social-channels">
                                                <h4 className="hud-label"><i className="fa-solid fa-link"></i> CANALES OFICIALES</h4>
                                                <div className="social-links-row">
                                                    {player.socials.twitter && (
                                                        <a 
                                                            href={`https://twitter.com/${player.socials.twitter}`}
                                                            target="_blank" 
                                                            rel="noreferrer"
                                                            className="social-tactical-btn twitter"
                                                            onClick={playClick}
                                                        >
                                                            <i className="fa-brands fa-x-twitter"></i> X / TWITTER
                                                        </a>
                                                    )}
                                                    {player.socials.instagram && (
                                                        <a 
                                                            href={`https://instagram.com/${player.socials.instagram}`}
                                                            target="_blank" 
                                                            rel="noreferrer"
                                                            className="social-tactical-btn instagram"
                                                            onClick={playClick}
                                                        >
                                                            <i className="fa-brands fa-instagram"></i> INSTAGRAM
                                                        </a>
                                                    )}
                                                    {player.socials.twitch && (
                                                        <a 
                                                            href={`https://twitch.tv/${player.socials.twitch}`}
                                                            target="_blank" 
                                                            rel="noreferrer"
                                                            className="social-tactical-btn twitch"
                                                            onClick={playClick}
                                                        >
                                                            <i className="fa-brands fa-twitch"></i> TWITCH LIVE
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Player digital signature */}
                                            <div className="tactical-hud-footer">
                                                <span className="hud-encrypted">SECURE INTEGRITY VERIFIED</span>
                                                <span className="tactical-sig">{player.signature}</span>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
