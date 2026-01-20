import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Trophy, Skull } from 'lucide-react';

const Modal = ({ show, title, stats, onRestart, isWin }) => {
    if (!show) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-[#1a1b4b] border-2 border-aurora-light/50 p-8 rounded-2xl shadow-[0_0_50px_rgba(45,212,191,0.3)] max-w-sm w-full text-center relative overflow-hidden"
                    initial={{ scale: 0.8, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", duration: 0.5 }}
                >
                    {/* Background decorative glow */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-aurora-light/5 to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center">
                        {isWin ? (
                            <Trophy className="w-16 h-16 text-yellow-400 mb-4 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                        ) : (
                            <Skull className="w-16 h-16 text-gray-400 mb-4" />
                        )}

                        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-aurora-light to-white mb-2">
                            {title}
                        </h2>

                        <div className="grid grid-cols-2 gap-4 my-6 w-full bg-white/5 p-4 rounded-xl border border-white/5">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 uppercase">Final Score</span>
                                <span className="text-2xl font-bold text-aurora-light">{stats.score}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 uppercase">Moves</span>
                                <span className="text-2xl font-bold text-white">{stats.moves}</span>
                            </div>
                            <div className="flex flex-col col-span-2">
                                <span className="text-xs text-gray-400 uppercase">Time Remaining</span>
                                <span className="text-xl font-bold text-white">{stats.time}s</span>
                            </div>
                        </div>

                        <button
                            onClick={onRestart}
                            className="group relative px-6 py-3 bg-aurora-light/20 hover:bg-aurora-light/30 border border-aurora-light rounded-full text-aurora-light font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:scale-105 active:scale-95"
                        >
                            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                            Play Again
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Modal;
