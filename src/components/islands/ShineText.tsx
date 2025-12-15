/**
 * ShineText Component
 *
 * Adds a glow and animated illumination effect to text.
 * The text itself glows brighter periodically for a subtle, premium feel.
 * Can be used on headers and key text throughout the site.
 */

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface ShineTextProps {
  children: ReactNode;
  className?: string;
  /** Enable the animated glow pulse */
  animate?: boolean;
  /** Delay before first animation (seconds) */
  delay?: number;
  /** Time between glow pulses (seconds) */
  interval?: number;
  /** Duration of glow pulse animation (seconds) */
  duration?: number;
  /** Use gradient text styling */
  gradient?: boolean;
  /** Glow intensity: 'subtle', 'medium', or 'strong' */
  intensity?: 'subtle' | 'medium' | 'strong';
}

const glowLevels = {
  subtle: {
    base: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.2)) drop-shadow(0 0 15px rgba(139, 92, 246, 0.1))',
    peak: 'drop-shadow(0 0 18px rgba(59, 130, 246, 0.45)) drop-shadow(0 0 35px rgba(139, 92, 246, 0.25))',
  },
  medium: {
    base: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3)) drop-shadow(0 0 20px rgba(139, 92, 246, 0.15))',
    peak: 'drop-shadow(0 0 25px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 50px rgba(139, 92, 246, 0.4))',
  },
  strong: {
    base: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 25px rgba(139, 92, 246, 0.2))',
    peak: 'drop-shadow(0 0 35px rgba(59, 130, 246, 0.7)) drop-shadow(0 0 60px rgba(139, 92, 246, 0.5))',
  },
};

export default function ShineText({
  children,
  className = '',
  animate = true,
  delay = 2,
  interval = 4,
  duration = 3,
  gradient = true,
  intensity = 'medium',
}: ShineTextProps) {
  const glow = glowLevels[intensity];

  return (
    <motion.span
      className={`inline-block ${gradient ? 'text-gradient' : ''} ${className}`}
      animate={
        animate
          ? {
              filter: [glow.base, glow.peak, glow.base],
            }
          : undefined
      }
      transition={{
        duration,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: interval,
        delay,
      }}
      style={{
        filter: glow.base,
      }}
    >
      {children}
    </motion.span>
  );
}
