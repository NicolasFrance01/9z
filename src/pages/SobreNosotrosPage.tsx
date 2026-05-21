import React from 'react';
import { useLang } from '../context/LanguageContext';

export const SobreNosotrosPage: React.FC = () => {
    const { t } = useLang();
    const s = t.sobre;

    const stats = [
        { label: s.founded, value: s.foundedYear, desc: s.foundedDesc, icon: 'fa-flag' },
        { label: s.divisions, value: s.divisionsCount, desc: s.divisionsDesc, icon: 'fa-gamepad' },
        { label: s.community, value: s.communityCount, desc: s.communityDesc, icon: 'fa-users' },
        { label: s.titles, value: s.titlesCount, desc: s.titlesDesc, icon: 'fa-trophy' },
    ];

    const values = [
        { title: s.v1title, desc: s.v1desc, icon: 'fa-heart', color: '#8b2dfb' },
        { title: s.v2title, desc: s.v2desc, icon: 'fa-crosshairs', color: '#ff007a' },
        { title: s.v3title, desc: s.v3desc, icon: 'fa-people-group', color: '#00f0ff' },
        { title: s.v4title, desc: s.v4desc, icon: 'fa-microchip', color: '#ffb800' },
    ];

    return (
        <main className="page-main">
            <section className="section-container">
                {/* Header */}
                <div className="section-header text-center">
                    <div className="sub-headline">
                        <i className="fa-solid fa-star"></i> {s.sectionLabel}
                    </div>
                    <h2 className="section-title">
                        {s.title} <span className="gradient-text">{s.titleAccent}</span>
                    </h2>
                    <p className="section-subtitle">{s.subtitle}</p>
                </div>

                {/* Stats Grid */}
                <div className="sobre-stats-grid">
                    {stats.map((stat) => (
                        <div key={stat.label} className="sobre-stat-card">
                            <div className="sobre-stat-icon">
                                <i className={`fa-solid ${stat.icon}`}></i>
                            </div>
                            <div className="sobre-stat-value">{stat.value}</div>
                            <div className="sobre-stat-label">{stat.label}</div>
                            <p className="sobre-stat-desc">{stat.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Story Section */}
                <div className="sobre-story-section">
                    <div className="sobre-story-visual">
                        <div className="sobre-logo-display">
                            <img
                                src="/9z_logo.png"
                                alt="9Z Team"
                                style={{ width: '180px', height: 'auto', filter: 'drop-shadow(0 0 30px rgba(139,45,251,0.6))' }}
                            />
                            <div className="sobre-tagline">#TODOVIOLETA</div>
                        </div>
                    </div>

                    <div className="sobre-story-text">
                        <h3 className="sobre-story-title">{s.storyTitle}</h3>
                        <p>{s.story1}</p>
                        <p>{s.story2}</p>
                        <p>{s.story3}</p>
                    </div>
                </div>

                {/* Values */}
                <div className="sobre-values-section">
                    <h3 className="sobre-values-title">{s.valuesTitle}</h3>
                    <div className="sobre-values-grid">
                        {values.map((val) => (
                            <div key={val.title} className="sobre-value-card" style={{ '--value-color': val.color } as React.CSSProperties}>
                                <div className="value-icon-wrap">
                                    <i className={`fa-solid ${val.icon}`}></i>
                                </div>
                                <h4>{val.title}</h4>
                                <p>{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};
