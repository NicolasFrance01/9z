import React from 'react';
import type { NewsItem } from '../types';
import { audioEngine } from '../utils/audioEngine';

// Generador programático de Banners de Noticias SVG para evitar dependencias rotas
const NewsBannerSVG: React.FC<{ type: string }> = ({ type }) => {
    let accentColor = '#8b2dfb';
    let label = '9Z NEWS';
    
    if (type === 'cs2') {
        accentColor = '#ff007a';
        label = 'CHAMPIONS';
    } else if (type === 'sponsor') {
        accentColor = '#00f0ff';
        label = 'PARTNERSHIP';
    } else if (type === 'center') {
        accentColor = '#ffb800';
        label = 'HQ EXPANSION';
    }

    return (
        <svg 
            className="news-img-svg" 
            viewBox="0 0 300 180" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="newsBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a0933" />
                    <stop offset="100%" stopColor="#05030b" />
                </linearGradient>
                <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b2dfb" />
                    <stop offset="100%" stopColor={accentColor} />
                </linearGradient>
            </defs>

            {/* Base dark canvas */}
            <rect width="300" height="180" fill="url(#newsBg)" />
            
            {/* Tech grid lines */}
            <path d="M 0,30 L 300,30 M 0,60 L 300,60 M 0,90 L 300,90 M 0,120 L 300,120 M 0,150 L 300,150" stroke="#8b2dfb" strokeWidth="0.5" opacity="0.15" />
            <path d="M 50,0 L 50,180 M 100,0 L 100,180 M 150,0 L 150,180 M 200,0 L 200,180 M 250,0 L 250,180" stroke="#8b2dfb" strokeWidth="0.5" opacity="0.15" />

            {/* Visual tech designs depending on story */}
            {type === 'cs2' && (
                <g transform="translate(110, 30)">
                    {/* Glowing Trophy Cup */}
                    <circle cx="40" cy="50" r="35" fill={accentColor} opacity="0.1" filter="blur(10px)" />
                    <path d="M 25,25 L 55,25 L 55,45 C 55,60 25,60 25,45 Z" fill="url(#glowGrad)" stroke="#ffffff" strokeWidth="1.5" />
                    <path d="M 40,55 L 40,75 M 30,75 L 50,75" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 20,30 C 12,30 12,45 25,45 M 60,30 C 68,30 68,45 55,45" stroke="#ffffff" strokeWidth="1.5" />
                    {/* Tiny neon stars */}
                    <polygon points="15,15 18,22 25,22 20,27 22,34 15,30 8,34 10,27 5,22 12,22" fill="#ffb800" />
                    <polygon points="65,15 68,22 75,22 70,27 72,34 65,30 58,34 60,27 55,22 62,22" fill="#ffb800" />
                </g>
            )}

            {type === 'sponsor' && (
                <g transform="translate(70, 50)">
                    {/* Partnership interlocking circles */}
                    <circle cx="50" cy="40" r="30" stroke="#8b2dfb" strokeWidth="3" fill="none" opacity="0.6" />
                    <circle cx="110" cy="40" r="30" stroke="#00f0ff" strokeWidth="3" fill="none" opacity="0.6" />
                    <path d="M 80,40 L 80,50 L 70,45 Z" fill="#ffffff" />
                    {/* Glow cores */}
                    <circle cx="80" cy="40" r="8" fill="#ff007a" filter="blur(3px)" />
                </g>
            )}

            {type === 'center' && (
                <g transform="translate(100, 30)">
                    {/* HQ Grid / Isometric Server building symbol */}
                    <polygon points="50,15 90,35 50,55 10,35" fill="url(#glowGrad)" stroke="#ffffff" strokeWidth="1" />
                    <polygon points="50,55 90,35 90,75 50,95" fill="#8b2dfb" stroke="#ffffff" strokeWidth="0.5" opacity="0.8" />
                    <polygon points="50,55 10,35 10,75 50,95" fill="#090514" stroke="#ffffff" strokeWidth="0.5" opacity="0.8" />
                    <circle cx="50" cy="35" r="5" fill="#00f0ff" filter="blur(2px)" />
                </g>
            )}

            {/* Glowing neon bottom bar */}
            <rect y="176" width="300" height="4" fill="url(#glowGrad)" />

            {/* Futuristic typography label overlay */}
            <rect x="15" y="15" width="105" height="20" rx="3" fill="#090514" stroke={accentColor} strokeWidth="1" />
            <text 
                x="67.5" 
                y="29" 
                fill="#ffffff" 
                fontFamily="Orbitron" 
                fontSize="8" 
                fontWeight="900" 
                letterSpacing="1"
                textAnchor="middle"
            >
                {label}
            </text>
        </svg>
    );
};

interface NewsProps {
    onNewsClick: (newsItem: NewsItem) => void;
}

export const News: React.FC<NewsProps> = ({ onNewsClick }) => {
    const playHover = () => audioEngine.playHover();
    const playClick = () => audioEngine.playClick();

    // Crónicas de noticias premium
    const newsData: NewsItem[] = [
        {
            id: 1,
            tag: 'CS2 COMPETITIVO',
            date: 'Mayo 19, 2026',
            title: '¡9Z CLASIFICA AL PGL MAJOR CON RENDIMIENTO INVICTO!',
            excerpt: 'La escuadra capitaneada por max venció a Team Vitality por 2 a 1 en una serie épica, asegurando el pase directo y marcando historia para los esports latinos.',
            body: `9z Team lo logró una vez más. Ante todos los pronósticos y en un RMR Europeo implacable en Copenhague, el equipo violeta ha consolidado una de las hazañas más memorables del Counter-Strike latinoamericano.

            En un partido de infarto al mejor de tres mapas, la escuadra violeta superó al gigante francés Team Vitality por un contundente marcador global de 2-1 (13-11 Anubis, 9-13 Mirage, 13-8 Nuke). Bajo el liderato táctico de Maximiliano "max" González y una actuación descomunal de Franco "dgt" García con la AWP, el club se consagró con un histórico pase directo.

            "Esto no es solo un logro de cinco jugadores, es el triunfo de toda la #9zFamily que cree en el sueño cuando nadie más lo hace," declaró conmovido Francisco "Frankkaster" Postiglione tras la consagración.

            El equipo ahora comenzará una intensa concentración cerrada de cara a la etapa de leyendas del Major que iniciará a mediados del próximo mes, donde representará al continente como el único estandarte de la región.`
        },
        {
            id: 2,
            tag: 'SPONSOR PARTNERSHIP',
            date: 'Mayo 14, 2026',
            title: 'NUEVO COPATROCINIO GLOBAL CON GLOBANT PARA IMPULSAR DIVISIONES',
            excerpt: 'Anunciamos una alianza estratégica integral de dos años con el unicornio tecnológico Globant para potenciar la infraestructura competitiva del club.',
            body: `Nos complace anunciar la firma de una alianza de patrocinio global de dos años de duración con Globant, una de las mayores multinacionales de desarrollo tecnológico del mundo.

            Esta alianza estratégica redefine el ecosistema de 9z Team, permitiéndonos integrar laboratorios de análisis biométrico y herramientas de machine learning aplicadas a los entrenamientos tácticos. A través de este copatrocinio, la escuadra implementará programas de optimización competitiva nunca antes vistos en Argentina.

            Globant ocupará un espacio central en el pecho de la camiseta oficial del club y proporcionará soporte técnico de software a nuestra academia formativa 9z Academy, potenciando la captación de jóvenes promesas nacionales.

            "La unión con Globant nos posiciona a la vanguardia de la tecnología aplicada al deporte digital. Es una validación inmensa a nuestra trayectoria empresarial," remarcó Frankkaster en la conferencia de prensa de lanzamiento.`
        },
        {
            id: 3,
            tag: 'HQ EXPANSION',
            date: 'Mayo 09, 2026',
            title: 'FRANKKASTER ANUNCIA CONSTRUCCIÓN DEL NUEVO GAMING CENTER HQ',
            excerpt: 'Ubicado en la Ciudad de Buenos Aires, el nuevo centro de alto rendimiento contará con cabinas de streaming, arenas LAN y laboratorios de entrenamiento.',
            body: `El crecimiento de la organización no se detiene. El fundador de 9z, Frankkaster, ha anunciado formalmente la colocación de la piedra fundacional del "9z Gaming Center HQ" en la Ciudad Autónoma de Buenos Aires.

            Este ambicioso complejo de alto rendimiento abarcará más de 800 metros cuadrados cubiertos dedicados íntegramente al desarrollo de los deportes electrónicos y la creación de contenidos. El espacio contará con:

            • Dos cabinas insonorizadas profesionales LAN de calibre Major.
            • Un auditorio de análisis táctico equipado con pantallas holográficas.
            • Cuatro estudios independientes de streaming 4K para creadores de contenido.
            • Un área abierta de esparcimiento para fanáticos con tienda interactiva oficial.

            La inauguración del complejo está proyectada para finales de este año y se convertirá en el punto de encuentro definitivo para toda la #9zFamily. Estén atentos a nuestras redes para novedades del desarrollo de la obra.`
        }
    ];

    const handleNewsClick = (item: NewsItem) => {
        playClick();
        onNewsClick(item);
    };

    const types = ['cs2', 'sponsor', 'center'];

    return (
        <section id="noticias" className="section-container" style={{ marginBottom: '120px' }}>
            <div className="section-header">
                <div>
                    <div className="sub-headline">
                        <i className="fa-solid fa-newspaper"></i> CRÓNICAS Y COMUNICADOS
                    </div>
                    <h2 className="section-title">
                        NEWS <span className="gradient-text">HUB</span>
                    </h2>
                    <p className="section-subtitle">
                        Mantenete actualizado con los últimos comunicados oficiales del club, triunfos competitivos e innovaciones de la organización.
                    </p>
                </div>
            </div>

            {/* News Grid */}
            <div className="news-grid">
                {newsData.map((news, idx) => (
                    <div 
                        key={news.id} 
                        className="news-card"
                        onMouseEnter={playHover}
                    >
                        {/* Interactive SVG News Image Banner */}
                        <div className="news-img-wrapper">
                            <NewsBannerSVG type={types[idx]} />
                            <span className="news-tag">{news.tag}</span>
                        </div>

                        {/* Card Content */}
                        <div className="news-content">
                            <div>
                                <span className="news-date">{news.date}</span>
                                <h3 className="news-card-title">{news.title}</h3>
                                <p className="news-card-excerpt">{news.excerpt}</p>
                            </div>

                            <button 
                                className="news-read-more-btn"
                                onClick={() => handleNewsClick(news)}
                                onMouseEnter={playHover}
                                style={{ background: 'transparent', border: 'none', textAlign: 'left', outline: 'none' }}
                            >
                                LEER CRÓNICA <i className="fa-solid fa-arrow-right-long"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
