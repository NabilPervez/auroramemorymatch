import React from 'react';
import Card from './Card';

const Grid = ({ cards, handleChoice, choiceOne, choiceTwo, disabled, matched, showAll }) => {
    return (
        <div className="grid grid-cols-4 gap-4 sm:gap-6 p-4 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl max-w-lg mx-auto aspect-square">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    handleChoice={handleChoice}
                    flipped={showAll || card === choiceOne || card === choiceTwo || matched.includes(card)}
                    disabled={disabled}
                />
            ))}
        </div>
    );
};

export default Grid;
