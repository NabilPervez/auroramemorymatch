import {
    Sparkles, Moon, Sun, CloudRain, Zap, Snowflake, Flame, Music,
    Ghost, Heart, Star, Cloud
} from 'lucide-react';

const icons = [
    { type: 'Moon', icon: <Moon size={40} /> },
    { type: 'Sun', icon: <Sun size={40} /> },
    { type: 'Sparkles', icon: <Sparkles size={40} /> },
    { type: 'Zap', icon: <Zap size={40} /> },
    { type: 'Star', icon: <Star size={40} /> },
    { type: 'Heart', icon: <Heart size={40} /> },
    { type: 'Music', icon: <Music size={40} /> },
    { type: 'Flame', icon: <Flame size={40} /> },
];

export const shuffleCards = () => {
    const shuffledx = [...icons, ...icons]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() })); // Add unique ID for React keys
    return shuffledx;
};
