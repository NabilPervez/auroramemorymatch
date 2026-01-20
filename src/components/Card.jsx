import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Card = ({ card, handleChoice, flipped, disabled }) => {
    const ref = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    // Mouse position state for CSS variables
    const [styles, setStyles] = useState({
        '--mx': '50%',
        '--my': '50%',
        '--s': 1,
        '--o': 0,
        '--posx': '50%',
        '--posy': '50%',
        '--hyp': 0
    });

    // Motion values for physical tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for tilt
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 20 });

    // Combine flip and tilt rotations
    // When not flipped: rotateY is 0. Tilt should be 0 (or subtle).
    // When flipped: rotateY is 180. Tilt should be added to that.
    // Note: We need to invert logic slightly because face-up is 180deg.
    // We can just animate the container 180deg, and tilt the inner content? 
    // CodePen rotates the whole card.

    // Let's use a computed transform for Framer Motion that adds the flip offset.
    const flipRotation = useSpring(flipped ? 180 : 0, { stiffness: 260, damping: 20 });

    // Combined Rotation Y: Flip + Tilt
    const combinedRotateY = useTransform([flipRotation, rotateY], ([f, r]) => f + r);

    const handleMouseMove = (e) => {
        if (!ref.current || !flipped) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalized coordinates -0.5 to 0.5 for tilt
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);

        // CSS Variables for Halo/Shine
        // CodePen logic roughly:
        const px = (mouseX / width) * 100;
        const py = (mouseY / height) * 100;

        // Hypotenuse for intensity (distance from center)
        const hyp = Math.sqrt(Math.pow(xPct, 2) + Math.pow(yPct, 2)) * 2; // 0 to ~1.414

        setStyles({
            '--mx': `${px}%`,
            '--my': `${py}%`,
            '--s': 1,
            '--o': 1, // Opacity ON
            '--posx': `${50 + (xPct * 50)}%`,
            '--posy': `${50 + (yPct * 50)}%`,
            '--hyp': hyp
        });

        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovering(false);
        setStyles(prev => ({ ...prev, '--o': 0, '--hyp': 0 }));
    };

    const handleClick = () => {
        if (!disabled && !flipped) {
            handleChoice(card);
        }
    };

    return (
        <div
            className="holo-card relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 perspective-1000 cursor-pointer"
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={ref}
            style={styles} // Apply CSS vars here
            data-rarity={card.id % 2 === 0 ? "galaxy" : "radiant"} // Alternate effects
        >
            <motion.div
                className="holo-card__rotator w-full h-full relative preserve-3d"
                style={{
                    rotateY: combinedRotateY,
                    rotateX: rotateX,
                    transformStyle: "preserve-3d"
                }}
            >
                {/* Front (Face Down) - No holographic effect usually */}
                <div
                    className="absolute w-full h-full backface-hidden bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl flex items-center justify-center shadow-lg hover:border-aurora-light/50 transition-colors"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="opacity-50 text-2xl">✨</div>
                </div>

                {/* Back (Face Up) - HOLOGRAPHIC */}
                <div
                    className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        backgroundColor: "#1a1b4b" // Base color
                    }}
                >
                    {/* Base Content */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-aurora-mid to-aurora-dark z-[2]">
                        <div className="text-white text-3xl sm:text-4xl drop-shadow-md pb-1 relative z-[4]">
                            {card.icon}
                        </div>
                    </div>

                    {/* Holographic Layers */}
                    <div className="holo-card__shine absolute inset-0 z-[3] pointer-events-none" />
                    <div className="holo-card__glare absolute inset-0 z-[4] pointer-events-none mix-blend-overlay" />

                    {/* Border/Frame */}
                    <div className="absolute inset-0 border-2 border-aurora-light/50 rounded-xl z-[5]" />
                </div>
            </motion.div>
        </div>
    );
};

export default Card;
