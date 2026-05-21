import React, { useState } from 'react';
import { News } from '../components/News';
import type { NewsItem } from '../types';

export const NoticiasPage: React.FC = () => {
    const [newsOpen, setNewsOpen] = useState(false);
    const [activeNews, setActiveNews] = useState<NewsItem | null>(null);

    const openNews = (news: NewsItem) => {
        setActiveNews(news);
        setNewsOpen(true);
    };

    const closeNewsModal = () => {
        setNewsOpen(false);
    };

    return (
        <main className="page-main">
            <News onNewsClick={openNews} />

            <div className={`modal-overlay ${newsOpen ? 'show' : ''}`} onClick={closeNewsModal}>
                <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={closeNewsModal}>
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
                                <button className="btn btn-secondary" onClick={closeNewsModal}>
                                    CERRAR CRÓNICA
                                </button>
                            </div>
                        </article>
                    )}
                </div>
            </div>
        </main>
    );
};
