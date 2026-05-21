import React, { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { audioEngine } from '../utils/audioEngine';

export const ContactoPage: React.FC = () => {
    const { t } = useLang();
    const c = t.contacto;

    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);

    const playClick = () => audioEngine.playClick();
    const playHover = () => audioEngine.playHover();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        playClick();
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setSent(true);
            setForm({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSent(false), 6000);
        }, 1200);
    };

    const socials = [
        { icon: 'fa-x-twitter', label: 'X / Twitter', handle: '@9zteam', href: 'https://x.com/9zteam', color: '#ffffff' },
        { icon: 'fa-instagram', label: 'Instagram', handle: '@9zteam', href: 'https://instagram.com/9zteam', color: '#e1306c' },
        { icon: 'fa-youtube', label: 'YouTube', handle: '9z Team', href: 'https://youtube.com/9zteam', color: '#ff0000' },
        { icon: 'fa-twitch', label: 'Twitch', handle: '9zteam', href: 'https://twitch.tv/9zteam', color: '#9146ff' },
        { icon: 'fa-discord', label: 'Discord', handle: 'discord.gg/9z', href: 'https://discord.gg/9z', color: '#5865f2' },
        { icon: 'fa-tiktok', label: 'TikTok', handle: '@9zteam', href: 'https://tiktok.com/@9zteam', color: '#ff0050' },
    ];

    const subjects = [
        c.subjects.sponsor,
        c.subjects.press,
        c.subjects.community,
        c.subjects.careers,
        c.subjects.other,
    ];

    return (
        <main className="page-main">
            <section className="section-container">
                {/* Header */}
                <div className="section-header text-center">
                    <div className="sub-headline">
                        <i className="fa-solid fa-satellite-dish"></i> {c.sectionLabel}
                    </div>
                    <h2 className="section-title">
                        {c.title} <span className="gradient-text">{c.titleAccent}</span>
                    </h2>
                    <p className="section-subtitle">{c.subtitle}</p>
                </div>

                <div className="contacto-layout">
                    {/* Left: Form */}
                    <div className="contacto-form-wrap">
                        {sent ? (
                            <div className="contacto-success">
                                <i className="fa-solid fa-circle-check"></i>
                                <p>{c.formSuccess}</p>
                            </div>
                        ) : (
                            <form className="contacto-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>{c.formName}</label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            onFocus={playHover}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>{c.formEmail}</label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            onFocus={playHover}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>{c.formSubject}</label>
                                    <select
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                        onFocus={playHover}
                                        required
                                    >
                                        <option value="">—</option>
                                        {subjects.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>{c.formMessage}</label>
                                    <textarea
                                        rows={6}
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        onFocus={playHover}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-glow"
                                    disabled={sending}
                                    onMouseEnter={playHover}
                                >
                                    <i className={`fa-solid ${sending ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
                                    {sending ? c.formSending : c.formSend}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Right: Info */}
                    <div className="contacto-info-wrap">
                        <div className="contacto-info-card">
                            <h4><i className="fa-solid fa-envelope"></i> {c.emailTitle}</h4>
                            <p>contacto@9z.gg</p>
                        </div>

                        <div className="contacto-info-card">
                            <h4><i className="fa-solid fa-location-dot"></i> {c.locationTitle}</h4>
                            <p>{c.locationValue}</p>
                        </div>

                        <div className="contacto-socials-card">
                            <h4>{c.socialTitle}</h4>
                            <div className="contacto-socials-grid">
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="contacto-social-btn"
                                        style={{ '--social-color': s.color } as React.CSSProperties}
                                        onMouseEnter={playHover}
                                        onClick={playClick}
                                    >
                                        <i className={`fa-brands ${s.icon}`}></i>
                                        <span>{s.handle}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
