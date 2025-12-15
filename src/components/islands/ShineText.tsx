/**
 * ShineText Component
 *
 * Adds a sweeping glow illumination effect to text.
 * The glow travels across individual letters for a premium feel.
 * Can be used on headers and key text throughout the site.
 */

import { motion } from 'motion/react';

interface ShineTextProps {
  /** The text to animate (must be a string) */
  text: string;
  className?: string;
  /** Enable the animated glow sweep */
  animate?: boolean;
  /** Delay before first animation (seconds) */
  delay?: number;
  /** Time between glow sweeps (seconds) */
  interval?: number;
  /** Duration of each letter's glow (seconds) */
  glowDuration?: number;
  /** Delay between each letter's glow start (seconds) */
  stagger?: number;
  /** Use gradient text styling */
  gradient?: boolean;
  /** Glow intensity: 'subtle', 'medium', or 'strong' */
  intensity?: 'subtle' | 'medium' | 'strong';
}

const glowLevels = {
  subtle: {
    off: 'drop-shadow(0 0 0px rgba(59, 130, 246, 0))',
    on: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 30px rgba(139, 92, 246, 0.35))',
  },
  medium: {
    off: 'drop-shadow(0 0 0px rgba(59, 130, 246, 0))',
    on: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.5))',
  },
  strong: {
    off: 'drop-shadow(0 0 0px rgba(59, 130, 246, 0))',
    on: 'drop-shadow(0 0 25px rgba(59, 130, 246, 1)) drop-shadow(0 0 50px rgba(139, 92, 246, 0.7))',
  },
};

export default function ShineText({
  text,
  className = '',
  animate = true,
  delay = 2,
  interval = 6,
  glowDuration = 0.6,
  stagger = 0.03,
  gradient = true,
  intensity = 'medium',
}: ShineTextProps) {
  const glow = glowLevels[intensity];

  if (!animate) {
    return (
      <span className={`${gradient ? 'text-gradient' : ''} ${className}`}>
        {text}
      </span>
    );
  }

  return (
    <span className={`${gradient ? 'text-gradient' : ''} ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          style={{
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
          animate={{
            filter: [glow.off, glow.on, glow.off],
          }}
          transition={{
            duration: glowDuration,
            ease: 'easeOut',
            repeat: Infinity,
            repeatDelay: interval,
            delay: delay + index * stagger,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
