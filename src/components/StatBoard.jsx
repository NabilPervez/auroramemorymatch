import React from 'react';

const StatBoard = ({ moves, timer, score }) => {
    return (
        <div className="flex justify-center gap-4 sm:gap-8 mb-8 w-full max-w-lg mx-auto">
            <StatItem label="Time" value={`${timer}s`} highlight={timer < 10} />
            <StatItem label="Score" value={score} />
            <StatItem label="Moves" value={moves} />
        </div>
    );
};

const StatItem = ({ label, value, highlight }) => (
    <div className={`
    flex flex-col items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 min-w-[80px]
    ${highlight ? 'border-red-500 bg-red-500/10 animate-pulse' : ''}
  `}>
        <span className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider font-semibold">{label}</span>
        <span className={`text-xl sm:text-2xl font-bold font-mono ${highlight ? 'text-red-300' : 'text-aurora-light'}`}>
            {value}
        </span>
    </div>
);

export default StatBoard;
