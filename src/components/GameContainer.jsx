import React, { useState, useEffect, useCallback } from 'react';
import Grid from './Grid';
import StatBoard from './StatBoard';
import Modal from './Modal';
import { shuffleCards } from '../utils/gameLogic';

const GameContainer = ({ onPlaySound }) => {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [matched, setMatched] = useState([]);
    const [timer, setTimer] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameResult, setGameResult] = useState(null); // 'win' or 'lose'

    // Reset choices & increase turn
    const resetTurn = useCallback(() => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    }, []);

    // Start new game
    const newGame = useCallback(() => {
        const shuffledCards = shuffleCards();
        setCards(shuffledCards);
        setTurns(0);
        setChoiceOne(null);
        setChoiceTwo(null);
        setMatched([]);
        setDisabled(false);
        setTimer(60);
        setIsPlaying(true);
        setGameResult(null);
    }, []);

    // Handle a choice
    const handleChoice = (card) => {
        if (!isPlaying) return;
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
        if (onPlaySound) onPlaySound('flip');
    };

    // Compare 2 selected cards
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.type === choiceTwo.type) {
                setMatched(prev => [...prev, choiceOne, choiceTwo]);
                if (onPlaySound) onPlaySound('match');
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 800);
            }
        }
    }, [choiceOne, choiceTwo, onPlaySound, resetTurn]);

    // Timer
    useEffect(() => {
        if (!isPlaying) return;

        // Check Loss
        if (timer === 0) {
            setIsPlaying(false);
            setGameResult('lose');
            if (onPlaySound) onPlaySound('lose');
            return;
        }

        const timerId = setInterval(() => {
            setTimer(t => t - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timer, isPlaying, onPlaySound]);

    // Check Win
    useEffect(() => {
        if (cards.length > 0 && matched.length === cards.length) {
            setIsPlaying(false);
            setGameResult('win');
            if (onPlaySound) onPlaySound('win');
        }
    }, [matched, cards, onPlaySound]);

    // Auto start on mount
    useEffect(() => {
        newGame();
    }, [newGame]);

    const calculateScore = () => {
        if (gameResult === 'lose') return 0;
        const baseScore = (timer * 10) - (turns * 5);
        return Math.max(0, baseScore + 1000); // Bonues
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4">

            <div className="text-center mb-6">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-aurora-light via-white to-aurora-accent drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] font-sans tracking-tight">
                    Aurora
                </h1>
                <p className="text-aurora-light/60 text-sm tracking-[0.3em] uppercase mt-2">Memory Match</p>
            </div>

            <StatBoard moves={turns} timer={timer} score={calculateScore()} />

            <Grid
                cards={cards}
                handleChoice={handleChoice}
                choiceOne={choiceOne}
                choiceTwo={choiceTwo}
                disabled={disabled}
                matched={matched}
            />

            <Modal
                show={!!gameResult}
                title={gameResult === 'win' ? "Victory!" : "Time's Up"}
                isWin={gameResult === 'win'}
                stats={{
                    moves: turns,
                    time: timer,
                    score: calculateScore()
                }}
                onRestart={newGame}
            />
        </div>
    );
};

export default GameContainer;
