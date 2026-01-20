import React, { useState } from 'react';
import GameContainer from './components/GameContainer';
import { Volume2, VolumeX } from 'lucide-react';

// Simple sound synthesis for placeholder
const playSynthSound = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'flip') {
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(500, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'match') {
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);

      // Second note for harmony
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.frequency.setValueAtTime(600, now + 0.1);
      osc2.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
      gain2.gain.setValueAtTime(0.1, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.4);

    } else if (type === 'win') {
      // Arpeggio
      [400, 500, 600, 800].forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.1, now + i * 0.1);
        g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.5);
        o.start(now + i * 0.1);
        o.stop(now + i * 0.1 + 0.5);
      });
    }
    else if (type === 'lose') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.5);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    }

  } catch (e) {
    console.error("Audio error", e);
  }
}

function App() {
  const [muted, setMuted] = useState(false);

  const handlePlaySound = (type) => {
    if (!muted) {
      playSynthSound(type);
    }
  };

  return (
    <div className="App relative">
      <button
        onClick={() => setMuted(!muted)}
        className="fixed top-4 right-4 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-colors text-white"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
      <GameContainer onPlaySound={handlePlaySound} />
    </div>
  );
}

export default App;
