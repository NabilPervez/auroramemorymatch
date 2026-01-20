import React, { useState, useEffect, useCallback } from 'react';
import Grid from './Grid';
import StatBoard from './StatBoard';
import Modal from './Modal';
import { shuffleCards } from '../utils/gameLogic';
import { Play } from 'lucide-react';

const GameContainer = ({ onPlaySound }) => {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [matched, setMatched] = useState([]);
    const [timer, setTimer] = useState(60);
    const [status, setStatus] = useState('idle'); // idle, preview, playing, finished
    const [gameResult, setGameResult] = useState(null); // 'win' or 'lose'

    // Reset choices & increase turn
    const resetTurn = useCallback(() => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    }, []);

    // Initialize game State
    const newGame = useCallback(() => {
        const shuffledCards = shuffleCards();
        setCards(shuffledCards);
        setTurns(0);
        setChoiceOne(null);
        setChoiceTwo(null);
        setMatched([]);
        setDisabled(false);
        setTimer(60);
        setStatus('idle');
        setGameResult(null);
    }, []);

    // Start Sequence: Preview -> Playing
    const startPlaying = () => {
        setStatus('preview');
        // Reveal cards for 3 seconds
        setTimeout(() => {
            setStatus('playing');
        }, 3000);
    };

    // Handle a choice
    const handleChoice = (card) => {
        if (status !== 'playing') return;
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
        if (status !== 'playing') return;

        // Check Loss
        if (timer === 0) {
            setStatus('finished');
            setGameResult('lose');
            if (onPlaySound) onPlaySound('lose');
            return;
        }

        const timerId = setInterval(() => {
            setTimer(t => t - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timer, status, onPlaySound]);

    // Check Win
    useEffect(() => {
        if (cards.length > 0 && matched.length === cards.length) {
            setStatus('finished');
            setGameResult('win');
            if (onPlaySound) onPlaySound('win');
        }
    }, [matched, cards, onPlaySound]);

    // Auto initialize on mount
    useEffect(() => {
        newGame();
    }, [newGame]);

    const calculateScore = () => {
        if (gameResult === 'lose') return 0;
        const baseScore = (timer * 10) - (turns * 5);
        return Math.max(0, baseScore + 1000); // Bonus
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 relative">

            <div className="text-center mb-6">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-aurora-light via-white to-aurora-accent drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] font-sans tracking-tight">
                    Aurora
                </h1>
                <p className="text-aurora-light/60 text-sm tracking-[0.3em] uppercase mt-2">Memory Match</p>
            </div>

            <StatBoard moves={turns} timer={timer} score={calculateScore()} />

            <div className="relative">
                <Grid
                    cards={cards}
                    handleChoice={handleChoice}
                    choiceOne={choiceOne}
                    choiceTwo={choiceTwo}
                    disabled={disabled || status !== 'playing'}
                    matched={matched}
                    showAll={status === 'preview'}
                />

                {/* Ready Overlay */}
                {status === 'idle' && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-3xl border border-white/10">
                        <button
                            onClick={startPlaying}
                            className="
                        group relative px-8 py-4 bg-aurora-mid text-white font-bold text-xl rounded-full 
                        shadow-[0_0_30px_rgba(76,29,149,0.6)] hover:shadow-[0_0_50px_rgba(45,212,191,0.6)]
                        hover:scale-110 active:scale-95 transition-all duration-300 border border-aurora-light/30
                        flex items-center gap-3 overflow-hidden
                    "
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 w-full h-full" />
                            <Play className="fill-white" />
                            READY?
                        </button>
                    </div>
                )}
            </div>

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
