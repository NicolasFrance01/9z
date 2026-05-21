// Interfaces de datos fuertemente tipadas para el Portal de 9z Team

export interface Match {
    id: number;
    game: 'cs2' | 'valorant' | 'lol';
    league: string;
    status: 'upcoming' | 'past';
    teamHome: string;
    teamHomeShield: string;
    teamAway: string;
    teamAwayShield: string;
    scoreHome: string;
    scoreAway: string;
    date: string;
    isLive?: boolean;
    streamUrl?: string;
    result?: 'win' | 'lose';
}

export interface Player {
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
}

export interface Streamer {
    id: string;
    name: string;
    tagline: string;
    avatar: string;
    title: string;
    game: string;
    viewers: string;
    gameplaySeed: 'fps' | 'dm' | 'irl';
}

export interface NewsItem {
    id: number;
    tag: string;
    date: string;
    title: string;
    excerpt: string;
    body: string;
}

export interface JerseyEdition {
    title: string;
    price: string;
    gradient: string;
    neck: string;
    sleeve: string;
    stripes: string;
    name: string;
}
